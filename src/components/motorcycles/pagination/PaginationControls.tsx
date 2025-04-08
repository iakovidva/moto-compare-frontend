import PageSelector from "./PageSelector";
import PageSizeSelector from "./PageSizeSelector";

interface PaginationControlsProps {
    page: number;
    pageSize: number;
    setPage: (newPage: number) => void;
    setPageSize: (newSize: number) => void;
    totalPages: number;
    showPagination: boolean
}

const PaginationControls = (
    { page, pageSize, setPage, setPageSize, totalPages, showPagination }: PaginationControlsProps
) => {
    if (!showPagination) {
        return;
    }

    return (
        <div className="flex justify-between items-center mt-6">
            <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
            <PageSelector page={page} totalPages={totalPages} setPage={setPage} />
        </div>
    );
}

export default PaginationControls;