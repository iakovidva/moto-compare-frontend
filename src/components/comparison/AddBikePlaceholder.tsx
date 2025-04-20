
type AddBikePlaceholderProps = {
    placeholders: unknown[],
    handleAddClick: () => void,
    classes: string,
}

export default function AddBikePlaceholder({ placeholders, handleAddClick, classes }: AddBikePlaceholderProps) {
    return (
        <>
            {placeholders.map((_, index) => (
                <button
                    key={`placeholder-${index}`}
                    onClick={handleAddClick}
                    className={`${classes} flex flex-col items-center h-[140px] bg-gray-50 border-2 border-dashed border-blue-300 rounded-lg justify-center text-blue-500 hover:bg-blue-50 transition`}
                >
                    <span className="text-3xl font-bold">+</span>
                    <p className="text-xs mt-1 text-gray-500">Add a bike</p>
                </button>
            ))}
        </>
    );
}