import { AddMotorcycleRequestModel } from "@/models/AddMotorcycleRequestModel";
import { IncorrectSpecReportModel } from "@/models/IncorrectSpecRequestModel";
import { UserRequestModel } from "@/models/UserRequestModel";
import { fetchWithAuth } from "./fetchWithAuth";
import { API_BASE_URL } from "../utils";

export async function fetchOpenRequests() {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/motorcycles/requests`);

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
        throw error;
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