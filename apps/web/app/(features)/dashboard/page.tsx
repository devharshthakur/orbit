'use server';
import { DashboardHeader } from '@/components/custom/dashboard/header';
import { DashboardShell } from '@/components/custom/dashboard/shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompressionHistory } from '@/components/custom/dashboard/compression-history';
import { FileText, HardDrive } from 'lucide-react';
import prisma from '@/lib/prisma';

interface CompressionHistoryItem {
  id: number;
  fileName: string;
  date: Date;
  sizeBefore: number;
  sizeAfter: number;
}

interface CompressionStats {
  totalPdfsCompressed: number;
  totalMbCompressed: number;
}

export default async function DashboardPage() {
  const totalPdfsCompressed = await prisma.compressionHistory.count();
  const totalMbCompressedData = await prisma.compressionHistory.aggregate({
    _sum: {
      sizeAfter: true,
    },
  });
  const totalMbCompressed = totalMbCompressedData._sum.sizeAfter || 0;

  const compressionHistory: CompressionHistoryItem[] = await prisma.compressionHistory.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 100,
  });

  const formattedHistory = compressionHistory.map((record) => ({
    id: record.id,
    fileName: record.fileName,
    date: record.date.toISOString().split('T')[0],
    sizeBefore: parseFloat(record.sizeBefore.toFixed(2)),
    sizeAfter: parseFloat(record.sizeAfter.toFixed(2)),
  }));

  return (
    <DashboardShell>
      <div className="space-y-6">
        <DashboardHeader heading="Dashboard" text="View your PDF compression statistics and history." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total PDFs Compressed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPdfsCompressed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total MB Compressed</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parseFloat(totalMbCompressed.toFixed(2))} MB</div>
            </CardContent>
          </Card>
        </div>
        <CompressionHistory data={formattedHistory} />
      </div>
    </DashboardShell>
  );
}
