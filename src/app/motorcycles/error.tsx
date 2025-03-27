"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h1>
            <p className="text-gray-700 mt-2">{error.message}</p>
            <button
                onClick={() => reset()}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Try Again
            </button>
        </div>
    );
}
