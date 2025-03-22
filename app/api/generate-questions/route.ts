import { NextRequest, NextResponse } from "next/server";

// import OpenAI from 'openai';

import Groq from "groq-sdk";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // const completion = await openai.chat.completions.create

    const completion = await groq.chat.completions.create({
      //   model: 'gpt-3.5-turbo',
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Generate five engaging, open-ended questions for a survey based on the topic: ${title}.`,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    console.log("Raw content:", content);

    // Split into lines and filter non-empty ones
    const lines = content?.split("\n").filter((line) => line.trim()) || [];

    // Parse questions: match lines starting with "1. " (with or without bolding)
    const questions = lines
      .filter((line) => /^\d+\.\s/.test(line)) // Match "1. " or "1. **"
      .map((line) => {
        // Extract question text, removing numbering and optional bolding
        return line
          .replace(/^\d+\.\s*\**/, "") // Remove "1. " or "1. **"
          .replace(/\**$/, "") // Remove trailing "**" if present
          .trim();
      })
      .slice(0, 5);

    console.log("Parsed questions:", questions);

    if (questions.length < 5) {
      console.warn("Fewer than 5 questions generated:", questions.length);
    }

    const survey = await prisma.survey.create({
      data: {
        title,
        questions,
        userId: session?.user?.id || null,
      },
    });

    return NextResponse.json({ title, questions, surveyId: survey.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
