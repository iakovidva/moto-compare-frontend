import { PopularManufacturer } from "@/models/PopularManufacturer";
import { API_BASE_URL } from "../utils";

export interface CategoryStatsModel {
    category: string;
    counter: number;
}

export interface ManufacturerStatsModel {
    manufacturer: string;
    counter: number;
}

export async function getCategoryStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/statistics/category`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} and ${response.statusText}`);
        }
        const data: CategoryStatsModel[] = await response.json();
        return data;

    } catch (error) {
        console.error('Error submitting motorcycle request:', error);
        throw error;
    }
}

export async function fetchPopularManufacturers() {
    try {
        const response = await fetch(`${API_BASE_URL}/statistics/manufacturers`, {
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
            count: item.counter,
            logo: `/images/manufacturers/${item.manufacturer.toLowerCase()}-logo.png`
        }))
        return mapped;

    } catch (error) {
        console.error("Error fetching popular manufacturers", error);
        return null;
    }
}