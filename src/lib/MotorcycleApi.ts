import { CategoryEnum, ManufacturerEnum } from "@/constants/enums";
import { groupedSpecsSchema, motorcycleSchema } from "@/constants/motorcycleSchema";
import { AddMotorcycleRequestModel } from "@/models/AddMotorcycleRequestModel";
import { IncorrectSpecReportModel } from "@/models/IncorrectSpecRequestModel";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { UserRequestModel } from "@/models/UserRequestModel";
import { z } from "zod";

const API_BASE_URL = "http://localhost:8080/api";

export async function fetchAllMotorcyclesSummary() : Promise<MotorcycleSummary[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/motorcycles`, 
            {method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                },
                next: {revalidate: 1},
            });

        if (!response.ok) {
            throw new Error('Failed to fetch!');
        }
        const data =  await response.json();
        return data.map((moto: MotorcycleSummary) => ({
            id: String(moto.id), // Convert Long to string for consistency
            manufacturer: moto.manufacturer,
            model: moto.model,
            yearRange: moto.yearRange, 
            image: moto.image,
            category: moto.category,
            displacement: moto.displacement,
            horsePower: moto.horsePower
        }));
    } catch (error) {
        console.error("Error fetching motorcycles", error);
        return [];
    }
}

export async function fetchMotorcycleDetails(motorcycleId: string) : Promise<MotorcycleDetailsModel | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/motorcycles/${motorcycleId}`, {
            method: "GET",
            headers: {
                "Contenty-Type" : "application/json"
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