import { useDebounce } from "@/hooks/useDebounce";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useSearchMotorcycle() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (!debouncedSearch) {
      params.delete("search");
    } else {
      params.set("search", debouncedSearch);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, searchParams, router]);

  return { search, setSearch };
}
