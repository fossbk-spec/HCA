import { readFile } from "node:fs/promises";
import path from "node:path";
import type { EntityType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";
import { matchSeedRelations, type SeedRelationship, type TitleInfo } from "@/repositories/relationship-matching";
import type { Relation } from "@/types/relationships";
import { entityHref, routes } from "@/lib/routes";

export { entityHref, routes };
export type { Relation } from "@/types/relationships";

const entityTypes = ["CIVILIZATION", "PERSON", "EVENT", "IDEA", "BOOK"] as const;

const labels: Record<string, [string, string]> = {
  WROTE: ["wrote", "written by"],
  TAUGHT: ["taught", "taught by"],
  INFLUENCED: ["influenced", "influenced by"],
  FOUNDED: ["founded", "founded by"],
  RULED: ["ruled", "ruled by"],
  CREATED: ["created", "created by"],
  DEVELOPED: ["developed", "developed by"],
  ADOPTED: ["adopted", "adopted by"],
  PARTICIPATED_IN: ["participated in", "included"],
  BELONGS_TO: ["belongs to", "includes"],
  ORIGINATED: ["originated", "originated by"],
  ORIGINATED_IN: ["originated in", "origin of"],
  COMMANDED: ["commanded", "commanded by"],
  PRACTICED: ["practiced", "practiced by"],
  ENACTED: ["enacted", "enacted by"],
  PIONEERED: ["pioneered", "pioneered by"],
  HOSTED: ["hosted", "hosted by"],
  LED: ["led", "led by"],
  EXPERIENCED: ["experienced", "experienced by"],
  INITIATED: ["initiated", "initiated by"],
  CHAMPIONED: ["championed", "championed by"],
  ISSUED: ["issued", "issued by"],
  CODIFIED: ["codified", "codified by"],
  DEFENDED: ["defended", "defended by"],
  INSPIRED: ["inspired", "inspired by"],
  INVENTED: ["invented", "invented by"],
  FORMULATED: ["formulated", "formulated by"],
  EXEMPLIFIED: ["exemplified", "exemplified by"],
  AFFIRMED: ["affirmed", "affirmed by"],
  ARTICULATED: ["articulated", "articulated by"],
  ADVISED: ["advised", "advised by"],
  ADVOCATED: ["advocated", "advocated by"],
  ANNOTATED: ["annotated", "annotated by"],
  STRATEGIC_ADVISOR: ["strategic advisor to", "advised by"],
  SUBJECT_OF: ["subject of", "featured in"],
  SYNTHESIZED: ["synthesized", "synthesized by"],
  WORKED_AT: ["worked at", "had member"],
  PROCLAIMED: ["proclaimed", "proclaimed by"],
  PROMOTED: ["promoted", "promoted by"],
  PROMULGATED: ["promulgated", "promulgated by"],
  RECORDED: ["recorded", "recorded in"],
  REFORMULATED: ["reformulated", "reformulated by"],
  SPONSORED: ["sponsored", "sponsored by"],
  FLOURISHED_DURING: ["flourished during", "golden age of"],
  ESTABLISHED: ["established", "established by"],
  ESTABLISHED_AS_ORTHODOXY: ["established as orthodoxy", "canonized by"],
  CORONATED: ["coronated at", "coronation of"],
};

const labelsVi: Record<string, [string, string]> = {
  WROTE: ["sáng tác", "tác giả là"],
  TAUGHT: ["truyền dạy cho", "học trò của"],
  INFLUENCED: ["ảnh hưởng đến", "chịu ảnh hưởng từ"],
  FOUNDED: ["sáng lập", "được sáng lập bởi"],
  RULED: ["trị vì", "được cai trị bởi"],
  CREATED: ["khởi lập", "được khởi lập bởi"],
  DEVELOPED: ["phát triển", "được phát triển bởi"],
  ADOPTED: ["tiếp nhận", "được tiếp nhận bởi"],
  PARTICIPATED_IN: ["tham gia vào", "có sự tham gia của"],
  BELONGS_TO: ["thuộc về", "bao gồm"],
  ORIGINATED: ["khởi nguồn", "bắt nguồn từ"],
  ORIGINATED_IN: ["bắt nguồn tại", "nơi khởi nguồn của"],
  COMMANDED: ["chỉ huy", "được chỉ huy bởi"],
  PRACTICED: ["thực hành", "được thực hành bởi"],
  ENACTED: ["ban hành", "được ban hành bởi"],
  PIONEERED: ["tiên phong khởi xướng", "được khởi xướng bởi"],
  HOSTED: ["địa bàn của", "diễn ra tại"],
  LED: ["lãnh đạo", "được lãnh đạo bởi"],
  EXPERIENCED: ["trải qua", "tác động đến"],
  INITIATED: ["khởi xướng", "được khởi xướng bởi"],
  CHAMPIONED: ["cổ xúy", "được cổ xúy bởi"],
  ISSUED: ["ban bố", "được ban bố bởi"],
  CODIFIED: ["pháp điển hóa", "được pháp điển hóa bởi"],
  DEFENDED: ["bảo vệ", "được bảo vệ bởi"],
  INSPIRED: ["truyền cảm hứng cho", "lấy cảm hứng từ"],
  INVENTED: ["phát minh", "được phát minh bởi"],
  FORMULATED: ["đúc kết", "được đúc kết bởi"],
  EXEMPLIFIED: ["hiện thân của", "được thể hiện qua"],
  AFFIRMED: ["khẳng định", "được khẳng định trong"],
  ARTICULATED: ["luận giải", "được luận giải trong"],
  ADVISED: ["phò tá / cố vấn cho", "được cố vấn bởi"],
  ADVOCATED: ["chủ xướng", "được chủ xướng bởi"],
  ANNOTATED: ["chú giải", "được chú giải bởi"],
  STRATEGIC_ADVISOR: ["quân sư chiến lược cho", "có quân sư là"],
  SUBJECT_OF: ["nhân vật chính của", "kể về"],
  SYNTHESIZED: ["tổng đại thành", "được tổng hợp bởi"],
  WORKED_AT: ["làm việc tại", "có sự tham gia của"],
  PROCLAIMED: ["truyền đạt", "được truyền đạt bởi"],
  PROMOTED: ["xiển dương", "được xiển dương bởi"],
  PROMULGATED: ["ban hành", "được ban hành bởi"],
  RECORDED: ["ghi chép", "được ghi chép trong"],
  REFORMULATED: ["cải cách", "được cải cách bởi"],
  SPONSORED: ["bảo trợ", "được bảo trợ bởi"],
  FLOURISHED_DURING: ["thịnh vượng trong", "thời hoàng kim của"],
  ESTABLISHED: ["thiết lập", "được thiết lập bởi"],
  ESTABLISHED_AS_ORTHODOXY: ["độc tôn hóa", "được độc tôn bởi"],
  CORONATED: ["lên ngôi tại", "chứng kiến lễ lên ngôi của"],
};

export function relationLabel(relationshipType: string, direction: Relation["direction"]): string {
  const known = labels[relationshipType.toUpperCase()];
  if (known) return known[direction === "out" ? 0 : 1];
  const phrase = relationshipType.toLowerCase().replaceAll("_", " ");
  return direction === "out" ? phrase : `is target of ${phrase}`;
}

export function relationLabelVi(relationshipType: string, direction: Relation["direction"]): string {
  const known = labelsVi[relationshipType.toUpperCase()];
  if (known) return known[direction === "out" ? 0 : 1];
  return relationLabel(relationshipType, direction);
}

type SeedEntity = { slug: string; name?: string; nameVi?: string; title?: string; titleVi?: string };

async function seedRelationsFor(entityType: EntityType, slug: string): Promise<Relation[]> {
  const files: Record<EntityType, string> = {
    CIVILIZATION: "civilizations", PERSON: "people", EVENT: "events", IDEA: "ideas", BOOK: "books",
  };
  const [relationshipText, ...entityTexts] = await Promise.all([
    readFile(path.join(process.cwd(), "data", "seed", "relationships.json"), "utf8"),
    ...entityTypes.map((type) => readFile(path.join(process.cwd(), "data", "seed", `${files[type]}.json`), "utf8")),
  ]);
  const titles = new Map<string, TitleInfo>();
  entityTypes.forEach((type, index) => {
    for (const entity of JSON.parse(entityTexts[index]) as SeedEntity[]) {
      const title = entity.name ?? entity.title ?? entity.slug;
      const titleVi = entity.nameVi ?? entity.titleVi ?? null;
      titles.set(`${type}:${entity.slug}`, { title, titleVi });
    }
  });
  return matchSeedRelations(entityType, slug, JSON.parse(relationshipText) as SeedRelationship[], titles);
}

async function dbRelationsFor(entityType: EntityType, slug: string): Promise<Relation[]> {
  let entity: { id: string } | null;
  switch (entityType) {
    case "CIVILIZATION": entity = await prisma.civilization.findUnique({ where: { slug }, select: { id: true } }); break;
    case "PERSON": entity = await prisma.person.findUnique({ where: { slug }, select: { id: true } }); break;
    case "EVENT": entity = await prisma.event.findUnique({ where: { slug }, select: { id: true } }); break;
    case "IDEA": entity = await prisma.idea.findUnique({ where: { slug }, select: { id: true } }); break;
    case "BOOK": entity = await prisma.book.findUnique({ where: { slug }, select: { id: true } }); break;
  }
  if (!entity) return [];
  const entityId = entity.id;
  const rows = await prisma.relationship.findMany({
    where: { OR: [{ sourceId: entityId, sourceType: entityType }, { targetId: entityId, targetType: entityType }] },
    select: { sourceId: true, sourceType: true, targetId: true, targetType: true, relationshipType: true },
  });
  const others = new Map<EntityType, Set<string>>(entityTypes.map((type) => [type, new Set<string>()]));
  const directed = rows.map((row) => {
    const direction: Relation["direction"] = row.sourceId === entityId && row.sourceType === entityType ? "out" : "in";
    const type = direction === "out" ? row.targetType : row.sourceType;
    const id = direction === "out" ? row.targetId : row.sourceId;
    others.get(type)!.add(id);
    return { direction, relationshipType: row.relationshipType, type, id };
  });
  const [civilizations, people, events, ideas, books] = await Promise.all([
    prisma.civilization.findMany({ where: { id: { in: [...others.get("CIVILIZATION")!] } }, select: { id: true, slug: true, name: true, nameVi: true } }),
    prisma.person.findMany({ where: { id: { in: [...others.get("PERSON")!] } }, select: { id: true, slug: true, name: true, nameVi: true } }),
    prisma.event.findMany({ where: { id: { in: [...others.get("EVENT")!] } }, select: { id: true, slug: true, title: true, titleVi: true } }),
    prisma.idea.findMany({ where: { id: { in: [...others.get("IDEA")!] } }, select: { id: true, slug: true, title: true, titleVi: true } }),
    prisma.book.findMany({ where: { id: { in: [...others.get("BOOK")!] } }, select: { id: true, slug: true, title: true, titleVi: true } }),
  ]);
  const byId = new Map<string, { slug: string; title: string; titleVi?: string | null }>();
  for (const entity of civilizations) byId.set(`CIVILIZATION:${entity.id}`, { slug: entity.slug, title: entity.name, titleVi: entity.nameVi });
  for (const entity of people) byId.set(`PERSON:${entity.id}`, { slug: entity.slug, title: entity.name, titleVi: entity.nameVi });
  for (const entity of events) byId.set(`EVENT:${entity.id}`, { slug: entity.slug, title: entity.title, titleVi: entity.titleVi });
  for (const entity of ideas) byId.set(`IDEA:${entity.id}`, { slug: entity.slug, title: entity.title, titleVi: entity.titleVi });
  for (const entity of books) byId.set(`BOOK:${entity.id}`, { slug: entity.slug, title: entity.title, titleVi: entity.titleVi });
  return directed.flatMap(({ direction, relationshipType, type, id }) => {
    const other = byId.get(`${type}:${id}`);
    return other ? [{ direction, relationshipType, other: { ...other, type } }] : [];
  });
}

export async function listRelationsFor(entityType: EntityType, slug: string): Promise<Relation[]> {
  return withDatabase("relationships.list", () => dbRelationsFor(entityType, slug), () => seedRelationsFor(entityType, slug));
}
