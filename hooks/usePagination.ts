"use client";

import { useState } from "react";

interface UsePaginationOptions {
  totalItems: number;
  initialPage?: number;
  pageSize?: number;
}

export function usePagination({ totalItems, initialPage = 1, pageSize = 5 }: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    currentPage,
    totalPages,
    pageSize,
    nextPage,
    prevPage,
    goToPage,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}
