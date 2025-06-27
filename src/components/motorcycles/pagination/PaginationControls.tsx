interface PaginationControlsProps {
    page: number;
    setPage: (newPage: number) => void;
    totalPages: number;
    showPagination: boolean
}

const PaginationControls = (
    { page, setPage, totalPages, showPagination }: PaginationControlsProps
) => {
    if (!showPagination) {
        return;
    }

    return (
        <div className="flex justify-end items-center mt-8 gap-2">
            <button
                className="px-4 py-2 bg-muted rounded disabled:opacity-50 hover:bg-accent"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    className={`hover:bg-accent px-3 py-1 rounded ${page === i + 1 ? "bg-orange-500" : "bg-muted"}`}
                    onClick={() => setPage(i + 1)}
                >
                    {i + 1}
                </button>
            ))}

            <button
                className="px-4 py-2 bg-muted rounded disabled:opacity-50 hover:bg-accent"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>

        </div>
    );
}

export default PaginationControls;