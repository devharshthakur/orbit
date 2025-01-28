'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useState } from 'react';
import { ClearHistory } from './clear-history';

interface CompressionHistoryItem {
  id: number;
  fileName: string;
  date: string;
  sizeBefore: number;
  sizeAfter: number;
}

interface CompressionHistoryProps {
  data: CompressionHistoryItem[];
  itemsPerPage?: number;
}

export function CompressionHistory({ data, itemsPerPage = 10 }: CompressionHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Compression History</h2>
        <ClearHistory />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Size Before</TableHead>
              <TableHead>Size After</TableHead>
              <TableHead>Reduction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fileName}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.sizeBefore.toFixed(2)} MB</TableCell>
                <TableCell>{item.sizeAfter.toFixed(2)} MB</TableCell>
                <TableCell>{((1 - item.sizeAfter / item.sizeBefore) * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, idx) => (
              <PaginationItem key={idx + 1}>
                <PaginationLink isActive={currentPage === idx + 1} onClick={() => setCurrentPage(idx + 1)}>
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
          <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
        </Pagination>
      )}
    </div>
  );
}
