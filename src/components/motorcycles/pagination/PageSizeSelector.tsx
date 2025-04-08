const PAGE_SIZES = [6, 12, 24, 48];

type PageSizeSelectorProps = {
    pageSize: number,
    setPageSize: (pageSize: number) => void
}

export default function PageSizeSelector({ pageSize, setPageSize }: PageSizeSelectorProps) {
    return (
        <>
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
        </>);
}