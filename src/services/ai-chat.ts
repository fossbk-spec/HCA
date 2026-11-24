import { readFile } from "node:fs/promises";
import path from "node:path";

interface EntityBrief {
  type: "CIVILIZATION" | "PERSON" | "EVENT" | "IDEA" | "BOOK";
  slug: string;
  title: string;
  titleVi: string;
  summary: string;
  summaryVi: string;
  href: string;
}

let cachedIndex: EntityBrief[] | null = null;

export async function getEntityIndex(): Promise<EntityBrief[]> {
  if (cachedIndex) return cachedIndex;

  const dataDir = path.join(process.cwd(), "data", "seed");
  const [civsRaw, peopleRaw, eventsRaw, ideasRaw, booksRaw] = await Promise.all([
    readFile(path.join(dataDir, "civilizations.json"), "utf8"),
    readFile(path.join(dataDir, "people.json"), "utf8"),
    readFile(path.join(dataDir, "events.json"), "utf8"),
    readFile(path.join(dataDir, "ideas.json"), "utf8"),
    readFile(path.join(dataDir, "books.json"), "utf8"),
  ]);

  const civs = JSON.parse(civsRaw);
  const people = JSON.parse(peopleRaw);
  const events = JSON.parse(eventsRaw);
  const ideas = JSON.parse(ideasRaw);
  const books = JSON.parse(booksRaw);

  const index: EntityBrief[] = [
    ...civs.map((c: any) => ({
      type: "CIVILIZATION" as const,
      slug: c.slug,
      title: c.name,
      titleVi: c.nameVi ?? c.name,
      summary: c.summary ?? "",
      summaryVi: c.summaryVi ?? c.summary ?? "",
      href: `/civilizations/${c.slug}`,
    })),
    ...people.map((p: any) => ({
      type: "PERSON" as const,
      slug: p.slug,
      title: p.name,
      titleVi: p.nameVi ?? p.name,
      summary: p.summary ?? "",
      summaryVi: p.summaryVi ?? p.summary ?? "",
      href: `/people/${p.slug}`,
    })),
    ...events.map((e: any) => ({
      type: "EVENT" as const,
      slug: e.slug,
      title: e.title,
      titleVi: e.titleVi ?? e.title,
      summary: e.summary ?? "",
      summaryVi: e.summaryVi ?? e.summary ?? "",
      href: `/events/${e.slug}`,
    })),
    ...ideas.map((i: any) => ({
      type: "IDEA" as const,
      slug: i.slug,
      title: i.title,
      titleVi: i.titleVi ?? i.title,
      summary: i.summary ?? "",
      summaryVi: i.summaryVi ?? i.summary ?? "",
      href: `/ideas/${i.slug}`,
    })),
    ...books.map((b: any) => ({
      type: "BOOK" as const,
      slug: b.slug,
      title: b.title,
      titleVi: b.titleVi ?? b.title,
      summary: b.summary ?? "",
      summaryVi: b.summaryVi ?? b.summary ?? "",
      href: `/books/${b.slug}`,
    })),
  ];

  cachedIndex = index;
  return index;
}

/**
 * Searches the 292 entities for the most relevant context entries to ground the AI response.
 */
export async function findRelevantEntities(query: string, limit = 8): Promise<EntityBrief[]> {
  const index = await getEntityIndex();
  const tokens = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);

  if (tokens.length === 0) {
    return index.slice(0, limit);
  }

  const scored = index.map((entity) => {
    let score = 0;
    const titleEn = entity.title.toLowerCase();
    const titleVi = entity.titleVi.toLowerCase();
    const summaryEn = entity.summary.toLowerCase();
    const summaryVi = entity.summaryVi.toLowerCase();

    for (const token of tokens) {
      if (titleEn === token || titleVi === token) score += 30;
      else if (titleEn.includes(token) || titleVi.includes(token)) score += 15;
      else if (summaryEn.includes(token) || summaryVi.includes(token)) score += 5;
    }

    return { entity, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored
    .filter((s) => s.score > 0)
    .slice(0, limit)
    .map((s) => s.entity);
}

/**
 * Answers questions grounded in the Human Civilization Atlas.
 * Uses Gemini API if GEMINI_API_KEY is configured; otherwise provides intelligent fallback.
 */
export async function generateAtlasAnswer(
  question: string,
  language: "vi" | "en" = "vi"
): Promise<{ text: string; relatedEntities: EntityBrief[] }> {
  const relevantEntities = await findRelevantEntities(question, 6);
  const isVi = language === "vi";

  const contextStr = relevantEntities
    .map(
      (e) =>
        `- [${e.type}] ${isVi ? e.titleVi : e.title} (${isVi ? e.title : e.titleVi}) [Link: ${e.href}]: ${
          isVi ? e.summaryVi : e.summary
        }`
    )
    .join("\n");

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const systemInstruction = `You are the AI Historical Companion for the Human Civilization Atlas (Bản đồ Văn minh Nhân loại).
You have access to a verified corpus of 292 entities (civilizations, people, events, ideas, books) and 276 relationships spanning human history.
Guidelines:
1. Answer thoughtfully, accurately, and eloquently in ${isVi ? "Vietnamese (Tiếng Việt)" : "English"}.
2. Whenever you mention a historical civilization, person, event, idea, or book that appears in the Grounding Context, format it as a markdown link using its exact relative link (e.g., [Sử thi Đăm Săn](/books/dam-san), [Trần Hưng Đạo](/people/tran-hung-dao), [Nho giáo](/ideas/confucianism)).
3. Synthesize cross-civilization comparisons whenever appropriate (e.g. comparing Western and Eastern thoughts, or world epics).
4. Keep the answer structured, insightful, and accessible to students, researchers, and history enthusiasts.`;

      const prompt = `Grounding Context from Human Civilization Atlas:
${contextStr}

User Question: ${question}

Provide an insightful, well-structured response with relevant markdown links:`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemInstruction}\n\n${prompt}` },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidateText =
          data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          return {
            text: candidateText,
            relatedEntities: relevantEntities,
          };
        }
      }
    } catch (err) {
      console.error("Gemini API call error in HCA Chat:", err);
    }
  }

  // Fallback grounded knowledge response if API is unreachable or key is not provided
  if (relevantEntities.length > 0) {
    const primary = relevantEntities[0];
    const fallbackText = isVi
      ? `Dựa trên Kho Tri thức Văn minh Nhân loại (**Human Civilization Atlas**):\n\nĐối với câu hỏi của bạn về **"${question}"**, thực thể gắn kết trực tiếp nhất là **[${primary.titleVi}](${primary.href})** (${primary.title}), thuộc phân loại *${primary.type}*.\n\n> ${primary.summaryVi}\n\n**Các thực thể và bối cảnh lịch sử liên quan mật thiết trong Atlas:**\n${relevantEntities
          .slice(1, 5)
          .map((e) => `- **[${e.titleVi}](${e.href})** (${e.title}): ${e.summaryVi}`)
          .join("\n")}\n\nBạn có thể nhấp trực tiếp vào các liên kết trên để khám phá đồ thị tri thức và mối quan hệ ảnh hưởng đa chiều giữa các nhân vật và sự kiện này.`
      : `Based on the **Human Civilization Atlas** verified knowledge graph:\n\nRegarding your inquiry on **"${question}"**, the most central entity in our corpus is **[${primary.title}](${primary.href})** (${primary.type}).\n\n> ${primary.summary}\n\n**Closely connected historical milestones & entities:**\n${relevantEntities
          .slice(1, 5)
          .map((e) => `- **[${e.title}](${e.href})**: ${e.summary}`)
          .join("\n")}\n\nYou can click on any of the links above to explore its one-hop ego-graph and historical connections.`;

    return {
      text: fallbackText,
      relatedEntities: relevantEntities,
    };
  }

  return {
    text: isVi
      ? `Kho Tri thức Văn minh Nhân loại chứa đựng 292 thực thể (10 nền văn minh, 100 danh nhân, 66 sự kiện, 52 tư tưởng và 64 tác phẩm/sử thi). Vui lòng thử tìm kiếm với các từ khóa lịch sử cụ thể hơn như *Sử thi Đăm Săn*, *Mahabharata*, *Khổng Tử*, *Dân chủ*, hoặc *Bản đồ Văn minh*.`
      : `The Human Civilization Atlas contains 292 verified entities across history. Please try asking with more specific historical terms such as *The Epic of Gilgamesh*, *Mahabharata*, *Socrates*, *Democracy*, or *Roman Empire*.`,
    relatedEntities: [],
  };
}
