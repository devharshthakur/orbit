import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE() {
  try {
    await prisma.compressionHistory.deleteMany({});
    return NextResponse.json({ message: 'History cleared successfully' });
  } catch (error) {
    console.error('Error clearing compression history:', error);
    return NextResponse.json({ error: 'Failed to clear history' }, { status: 500 });
  }
}
