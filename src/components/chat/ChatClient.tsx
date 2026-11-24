"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Compass,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  relatedEntities?: Array<{
    type: string;
    slug: string;
    title: string;
    titleVi: string;
    href: string;
  }>;
}

const SAMPLE_QUESTIONS = [
  {
    en: "Compare the heroic ideals in Beowulf and The Song of Roland?",
    vi: "So sánh lý tưởng anh hùng trong Sử thi Beowulf và Bài ca Roland?",
  },
  {
    en: "What is the philosophical significance of Dharma in the Mahabharata?",
    vi: "Ý nghĩa triết học của tư tưởng Dharma trong Sử thi Mahabharata?",
  },
  {
    en: "How does the Epic of Dam San reflect Vietnamese indigenous heritage?",
    vi: "Sử thi Đăm Săn phản ánh bản sắc văn hóa Tây Nguyên và Việt Nam như thế nào?",
  },
  {
    en: "Compare the philosophies of Confucius and Socrates on ethics and statecraft.",
    vi: "So sánh tư tưởng đạo đức và thuật trị quốc giữa Khổng Tử và Socrates.",
  },
  {
    en: "What are the earliest written law codes in human civilization?",
    vi: "Những bộ luật thành văn đầu tiên trong lịch sử nhân loại là gì?",
  },
];

export function ChatClient() {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: isVi
        ? `Xin chào! Tôi là **Trợ lý AI Khám phá Lịch sử** của Bản đồ Văn minh Nhân loại (**Human Civilization Atlas**).\n\nTôi được nạp dữ liệu từ **292 thực thể tri thức** (10 nền văn minh, 100 danh nhân, 66 sự kiện, 52 tư tưởng và 64 tác phẩm/sử thi) cùng **276 mối liên kết đồ thị** đã được kiểm chứng học thuật. Bạn có thể hỏi tôi bất kỳ điều gì về lịch sử thế giới, so sánh nhân vật, tác phẩm hoặc khám phá mối liên hệ tri thức xuyên thời đại!`
        : `Hello! I am your **AI Historical Companion** for the **Human Civilization Atlas**.\n\nI am grounded in our verified corpus of **292 entities** and **276 cross-civilization relationships**. Feel free to ask about world epics, compare historical thinkers, examine pivotal events, or trace civilizational legacies across millennia!`,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endOfChatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (questionToSend?: string) => {
    const q = (questionToSend ?? input).trim();
    if (!q || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: q,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!questionToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, language }),
      });

      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.text,
        relatedEntities: data.relatedEntities,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: isVi
            ? "Đã có lỗi xảy ra khi xử lý câu hỏi. Vui lòng thử lại sau giây lát."
            : "An error occurred while generating the answer. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Render markdown text with links
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, index) => {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, linkText, href] = linkMatch;
        return (
          <Link
            key={index}
            href={href}
            className="font-bold text-amber-800 underline hover:text-amber-900 transition-colors"
          >
            {linkText}
          </Link>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Question Suggestions Ribbon */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500">
          <HelpCircle size={14} className="text-amber-800" />
          <span>{t("Suggested Historical Inquiries", "Câu hỏi Lịch sử Gợi ý")}:</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(isVi ? q.vi : q.en)}
              disabled={loading}
              className="shrink-0 rounded-xl border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-800 shadow-xs hover:border-amber-400 hover:bg-amber-50/50 transition-all text-left"
            >
              💡 {isVi ? q.vi : q.en}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="flex flex-col h-[600px] rounded-3xl border border-stone-200 bg-white shadow-xl overflow-hidden">
        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 shadow-sm mt-0.5">
                  <Bot size={20} />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-xs leading-relaxed text-sm sm:text-base ${
                  msg.sender === "user"
                    ? "bg-amber-800 text-white font-medium"
                    : "bg-stone-50 border border-stone-200/80 text-slate-800"
                }`}
              >
                <div className="whitespace-pre-line">
                  {renderMessageContent(msg.text)}
                </div>

                {/* Related Entities Quick Pills */}
                {msg.relatedEntities && msg.relatedEntities.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-stone-200 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      {t("Atlas Dossiers Referenced", "Hồ sơ liên quan trong Atlas")}:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.relatedEntities.map((e) => (
                        <Link
                          key={e.slug}
                          href={e.href}
                          className="inline-flex items-center gap-1 rounded-lg border border-amber-800/30 bg-amber-50/80 px-2.5 py-1 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
                        >
                          <BookOpen size={12} />
                          <span>{isVi ? e.titleVi : e.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-white shadow-sm mt-0.5">
                  <User size={20} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3.5 justify-start">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 shadow-sm">
                <Bot size={20} />
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-4 text-stone-600 flex items-center gap-2 text-sm">
                <Loader2 size={18} className="animate-spin text-amber-800" />
                <span>
                  {t(
                    "Analyzing 292 historical entities and cross-referencing knowledge graph...",
                    "Đang tra cứu 292 thực thể và liên kết đồ thị tri thức lịch sử..."
                  )}
                </span>
              </div>
            </div>
          )}
          <div ref={endOfChatRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-stone-200 bg-stone-50/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t(
                "Ask a historical question (e.g., 'What are the main themes of Mahabharata?')...",
                "Hỏi câu hỏi lịch sử (ví dụ: 'Chủ đề chính của Sử thi Đăm Săn là gì?')..."
              )}
              disabled={loading}
              className="flex-1 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm sm:text-base text-slate-800 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 shadow-xs"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-5 py-3 text-slate-950 font-bold shadow-md hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              <span className="sr-only">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
