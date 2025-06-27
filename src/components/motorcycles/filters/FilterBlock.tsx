type FilterBlockProps = {
    label: string;
    children: React.ReactNode;
    onClear?: () => void;
};

const FilterBlock = ({ label, children, onClear }: FilterBlockProps) => (
    <div className="mb-4 p-2 border border-gray-400 rounded-xl shadow-sm bg-background">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-foreground">{label}</h3>
            {onClear && (
                <button
                    onClick={onClear}
                    className="text-xs text-red-500 hover:underline transition"
                >
                    Clear
                </button>
            )}
        </div>

        <div className="space-y-2">
            {children}
        </div>
    </div>
);

export default FilterBlock;
