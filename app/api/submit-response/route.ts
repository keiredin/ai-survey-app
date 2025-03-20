import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { surveyId, answers } = await req.json();

    if (!surveyId || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const response = await prisma.response.create({
      data: {
        surveyId,
        answers,
      },
    });

    return NextResponse.json({ message: 'Response saved', response });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}