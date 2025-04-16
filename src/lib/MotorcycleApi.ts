import { CategoryEnum, ManufacturerEnum } from "@/constants/enums";
import { groupedSpecsSchema, motorcycleSchema } from "@/constants/motorcycleSchema";
import { AddMotorcycleRequestModel } from "@/models/AddMotorcycleRequestModel";
import { IncorrectSpecReportModel } from "@/models/IncorrectSpecRequestModel";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { PopularManufacturer } from "@/models/PopularManufacturer";
import { UserRequestModel } from "@/models/UserRequestModel";
import { z } from "zod";

const API_BASE_URL = "http://localhost:8080/api";

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
      console.log("🚀 Fetching data from:", url);
  
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

export async function addMotorcycleRequest(data: AddMotorcycleRequestModel) {
    try {
        const response = await fetch (`${API_BASE_URL}/motorcycles/requests`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} and ${response.statusText}`);
        }
        return ;

    } catch (error) {
        console.error('Error submitting motorcycle request:', error);
        throw error; // Re-throw the error to handle it in the component
    }
}

export async function fetchOpenRequests() {
    try {
        const response = await fetch (`${API_BASE_URL}/motorcycles/requests`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
            },
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status} and ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        return data.map((d : UserRequestModel) => ({
            id: d.id,
            requestContent: d.requestContent
        }));

    } catch (error) {
        console.error('Error fetching open requests:', error);
        return null;
    }
}

export async function reportIncorrectSpec(data: IncorrectSpecReportModel) {
    try {
        const response = await fetch(`${API_BASE_URL}/motorcycles/${data.motorcycleId}/incorrectValue`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status} and ${response.statusText}`);
            return null;
        }
        console.log("Request sented :) ");
        return {"message": "submitted"};

    } catch (error) {
        console.error('Error fetching open requests:', error);
        return null;
    }
}

// First, let's define proper types for your specs
type SpecValue = string | number | boolean;
type FlattenedSpecs = Record<string, SpecValue>;

export async function createMotorcycleRequest(formData: z.infer<typeof motorcycleSchema>) {
    console.log(formData);
    try {
        // const motorcycle: Record<string,any> = {
        //     manufacturer: formData.manufacturer, // Already the correct type (Enum)
        //     model: formData.model,
        //     yearRange: formData.yearRange,
        //     image: formData.image,
        //     category: formData.category, // Already an Enum
        //     ...flattenSpecs(formData.groupedSpecs), // Convert groupedSpecs to flat structure
            
        // }; 
            
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

        const response = await fetch(`${API_BASE_URL}/motorcycles`, {
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

// function flattenSpecs(groupedSpecs: z.infer<typeof groupedSpecsSchema>): Record<string, any> {
//     const flattened: Record<string, any> = {};
    
//     for (const specs of Object.values(groupedSpecs)) {
//         for (const [key, value] of Object.entries(specs)) {
//             flattened[key] = value;
//         }
//     }
    
//     return flattened;
// }
function flattenSpecs(groupedSpecs: z.infer<typeof groupedSpecsSchema>): FlattenedSpecs {
    const flattened: FlattenedSpecs = {};
    
    for (const specs of Object.values(groupedSpecs)) {
        for (const [key, value] of Object.entries(specs)) {
            // Ensure the value matches our SpecValue type
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                flattened[key] = value;
            } else {
                console.warn(`Unexpected spec value type for key ${key}:`, value);
            }
        }
    }
    
    return flattened;
}