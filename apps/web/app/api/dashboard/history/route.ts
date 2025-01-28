import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { fileName, sizeBefore, sizeAfter } = await req.json();

    const compressionRecord = await prisma.compressionHistory.create({
      data: {
        fileName,
        sizeBefore,
        sizeAfter,
        date: new Date(),
      },
    });

    return NextResponse.json(compressionRecord, { status: 201 });
  } catch (error) {
    console.error('Error saving compression history:', error);
    return NextResponse.json({ error: 'Error saving compression history' }, { status: 500 });
  }
}
