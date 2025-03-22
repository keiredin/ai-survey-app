
import { NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: Please sign in" },
        { status: 401 }
      );
    }

    const surveys = await prisma.survey.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        title: true,
        responses: {
          select: { id: true }, // Check for existence of responses
        },
      },
    });

    return NextResponse.json({
      surveys: surveys.map((survey) => ({
        id: survey.id,
        title: survey.title,
        hasResponses: survey.responses.length > 0,
      })),
    });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
