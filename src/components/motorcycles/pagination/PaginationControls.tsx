const PAGE_SIZES = [6, 12, 24, 48];

interface PaginationControlsProps {
    page: number;
    pageSize: number;
    setPage: (newPage: number) => void;
    setPageSize: (newSize: number) => void;
    totalPages: number;
}

const PaginationControls = ({ page, pageSize, setPage, setPageSize, totalPages }: PaginationControlsProps) => {
    return (
        <div className="flex justify-between items-center mt-6">
            {/* Page Size Selector */}
            <select
                className="p-2 border rounded"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
            >
                {PAGE_SIZES.map(size => (
                    <option key={size} value={size}>
                        {size} per page
                    </option>
                ))}
            </select>

            {/* Page Selector */}
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
        </div>
    );
}

export default PaginationControls;