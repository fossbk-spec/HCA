import { NextRequest, NextResponse } from "next/server";
import { generateAtlasAnswer } from "@/services/ai-chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, language = "vi" } = body;

    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json(
        { error: "A valid question is required." },
        { status: 400 }
      );
    }

    const answer = await generateAtlasAnswer(question.trim(), language === "vi" ? "vi" : "en");

    return NextResponse.json(answer);
  } catch (error) {
    console.error("AI chat route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
