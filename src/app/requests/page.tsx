import { fetchOpenRequests } from "@/lib/MotorcycleApi";
import { UserRequestModel } from "@/models/UserRequestModel";

export default async function RequestsPage() {

    const openRequests: UserRequestModel[] = await fetchOpenRequests();

    if (!openRequests) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-semibold text-red-500">Failed to load requests</h1>
                <p className="text-gray-500">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col text-center">
            <h1>Here will be listed all the requests! </h1>
            {openRequests.map((request) => <li key={request.id}>{request.requestContent}</li>)}

        </div>
    );
}