type PageSelectorProps = {
    page: number,
    setPage: (page: number) => void,
    totalPages: number
}

export default function PageSelector({ page, setPage, totalPages }: PageSelectorProps) {
    return (
        <>
            <div className="flex items-center space-x-2">
                <button
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>

            </div>
        </>
    );
}