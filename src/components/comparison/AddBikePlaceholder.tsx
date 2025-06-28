import Link from "next/link";

type AddBikePlaceholderProps = {
    placeholders: unknown[],
    handleAddClick: () => void,
    classes: string,
}

export default function AddBikePlaceholder({ placeholders, handleAddClick, classes }: AddBikePlaceholderProps) {
    return (
        <>
            {placeholders.map((_, index) => (
                <Link href="/motorcycles" key={`placeholder-${index}`} onClick={handleAddClick}>
                    <div className={`${classes} bg-muted rounded-lg hover:bg-accent transition-colors flex items-center justify-center`}>
                        <div className="text-center">
                            <span className="text-xl">+</span>
                            <p className="text-muted-foreground text-xs mt-0.5">Add bike</p>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
}