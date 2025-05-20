import { CategoryEnum, ManufacturerEnum } from "@/constants/enums";
import { groupedSpecsSchema, motorcycleSchema } from "@/constants/motorcycleSchema";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { PopularManufacturer } from "@/models/PopularManufacturer";
import { z } from "zod";
import { fetchWithAuth } from "./fetchWithAuth";
import { API_BASE_URL } from "../utils";


type FetchProps = {
    page?: number;
    size?: number;
    manufacturer?: string;
    category?: string;
    search?: string;
    horsePowerMin?: number;
    horsePowerMax?: number;
    displacementMin?: number;
    displacementMax?: number;
    yearMin?: number;
    yearMax?: number;
    sort?: string;
  }

export async function fetchAllMotorcyclesSummary({
    page = 0,
    size = 12,
    search,
    manufacturer,
    category,
    horsePowerMin,
    horsePowerMax,
    displacementMin,
    displacementMax,
    yearMin,
    yearMax,
    sort
  }: FetchProps): Promise<{motorcycles : MotorcycleSummary[], totalPages: number}> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
  
      if (manufacturer) params.append("manufacturer", manufacturer);
      if (category) params.append("category", category);
      if (search) params.append("search", search);
      if (horsePowerMin) params.append("horsePowerMin", String(horsePowerMin));
      if (horsePowerMax) params.append("horsePowerMax", String(horsePowerMax));
      if (displacementMin) params.append("displacementMin", String(displacementMin));
      if (displacementMax) params.append("displacementMax", String(displacementMax));
      if (yearMin) params.append("yearMin", String(yearMin));
      if (yearMax) params.append("yearMax", String(yearMax));
      if (sort) params.append("sort", sort);
  
      const url = `${API_BASE_URL}/motorcycles?${params.toString()}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch motorcycles!");
      }
  
      const data = await response.json();
      
    return {
        motorcycles: data.content,
        totalPages: Number(response.headers.get("X-Total-Pages"))
    };
    } catch (error) {
      console.error("❌ Error fetching motorcycles:", error);
    return {
        motorcycles: [],
        totalPages: 0
    }
    }
}

export async function fetchPopularManufacturers() {
    try {
        const response = await fetch(`${API_BASE_URL}/motorcycles/popular-manufacturers`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
            next: {revalidate: 60}
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        const mapped: PopularManufacturer[] = data.map( (item:any) => ({
            name: item.manufacturer,
            count: item.count,
            logo: `/images/manufacturers/${item.manufacturer.toLowerCase()}-logo.png`
        }))
        return mapped;

    } catch (error) {
        console.error("Error fetching popular manufacturers", error);
        return null;
    }
}

export async function fetchMotorcycleDetails(motorcycleId: string) : Promise<MotorcycleDetailsModel | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/motorcycles/${motorcycleId}`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
            next: {revalidate: 60}
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching motorcycle", error);
        return null;
    }
}

export async function fetchMotorcycleSummary(motorcycleId: string) : Promise<MotorcycleSummary | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/motorcycles/${motorcycleId}/summary`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
            next: {revalidate: 60}
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data : MotorcycleSummary = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching motorcycle", error);
        return null;
    }
}

type SpecValue = string | number | boolean;
type FlattenedSpecs = Record<string, SpecValue>;

export async function createMotorcycleRequest(formData: z.infer<typeof motorcycleSchema>) {
    try {   
        const motorcycle: {
            manufacturer: z.infer<typeof ManufacturerEnum>,
            model: string,
            yearRange: string,
            image: string,
            category: z.infer<typeof CategoryEnum>,
        } & FlattenedSpecs = {
            manufacturer: formData.manufacturer,
            model: formData.model,
            yearRange: formData.yearRange,
            image: formData.image,
            category: formData.category,
            ...flattenSpecs(formData.groupedSpecs),
        };

        const response = await fetchWithAuth(`${API_BASE_URL}/motorcycles`, {
            method: "POST",
            headers: { "Content-Type" : "application/json",},
            body: JSON.stringify(motorcycle),

        });

        if (!response.ok) {
            console.error("error 1 ");
        }
    } catch (error) {
        console.error("error 2 ", error);
    }
}

function flattenSpecs(groupedSpecs: z.infer<typeof groupedSpecsSchema>): FlattenedSpecs {
    const flattened: FlattenedSpecs = {};
    
    for (const specs of Object.values(groupedSpecs)) {
        for (const [key, value] of Object.entries(specs)) {
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                flattened[key] = value;
            } else {
                console.warn(`Unexpected spec value type for key ${key}:`, value);
            }
        }
    }
    
    return flattened;
}