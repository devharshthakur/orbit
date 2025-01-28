import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const totalPdfsCompressed = await prisma.compressionHistory.count();
    const totalMbCompressedData = await prisma.compressionHistory.aggregate({
      _sum: {
        sizeAfter: true,
      },
    });
    const totalMbCompressed = totalMbCompressedData._sum.sizeAfter || 0;

    return NextResponse.json({
      totalPdfsCompressed,
      totalMbCompressed: parseFloat(totalMbCompressed.toFixed(2)),
    });
  } catch (error) {
    console.error('Error fetching compression stats:', error);
    return NextResponse.json({ error: 'Failed to fetch compression statistics' }, { status: 500 });
  }
}
