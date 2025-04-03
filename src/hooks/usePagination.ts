"use client";

import { useSearchParams, useRouter } from "next/navigation";

export function usePagination() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 12;

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const setPageSize = (newSize: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSize === 12) {
      params.delete("pageSize");
    } else {
      params.set("pageSize", newSize.toString());
    }

    params.delete("page"); // ✅ Reset to first page when changing pageSize
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { page, pageSize, setPage, setPageSize };
}
