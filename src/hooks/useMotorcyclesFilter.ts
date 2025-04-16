"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MotorcycleFilters } from "@/models/MotorcyclesFilters";

export function useMotorcycleFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters: MotorcycleFilters = {
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    manufacturer: searchParams.get("manufacturer") || undefined,
    horsePowerMin: Number(searchParams.get("horsePowerMin")) || undefined,
    horsePowerMax: Number(searchParams.get("horsePowerMax")) || undefined,
    displacementMin: Number(searchParams.get("displacementMin")) || undefined,
    displacementMax: Number(searchParams.get("displacementMax")) || undefined,
    yearMin: Number(searchParams.get("yearMin")) || undefined,
    yearMax: Number(searchParams.get("yearMax")) || undefined,
    sort: searchParams.get("sort") || undefined,
  };

  // TODO: CONSIDER ADDING SORTING OF FILTERS AND SHORTEN NAMES HERE !!!
  // http://localhost:3000/motorcycles?horsePowerMin=150&horsePowerMax=200&displacementMin=150&displacementMax=200&manufacturer=HONDA&category=ADVENTURE
  // http://localhost:3000/motorcycles?hpMin=150&hpMax=200&ccMin=150&ccMax=200&m=HONDA&cat=ADVENTURE

  const setFilters = useCallback((newFilters: Partial<MotorcycleFilters> | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!newFilters) {
      router.push(`?`); 
    } else {
      let isPageChanged = false;
      Object.entries(newFilters).forEach(([key, value]) => {
        if (key === "page") {
          isPageChanged = true;
        }
        if (params.get(key) === value) {
          params.delete(key);
        } else 
        if (value) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      if (!isPageChanged) {
        params.delete("page");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);
  
  return {...filters, setFilters}
}
