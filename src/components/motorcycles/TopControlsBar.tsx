import PageSizeSelector from "./pagination/PageSizeSelector";
import SortDropdown from "./SortDropdown";

interface TopControlsProps {
    sort: string;
    onSortChange: (val: string) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
}

const TopControlsBar = ({ sort, onSortChange, pageSize, setPageSize }: TopControlsProps) => {
    return (
        <div className="flex flex-wrap justify-between items-center bg-white p-2 rounded-2xl shadow-sm mb-6">
            <SortDropdown selectedSort={sort} onSortChange={onSortChange} />
            <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
        </div>
    );
};

export default TopControlsBar;
