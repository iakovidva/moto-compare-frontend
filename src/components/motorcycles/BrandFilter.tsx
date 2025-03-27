import Image from "next/image";

const brands = [
    { name: "KTM", logo: "/images/brands/KTM-logo.png" },
    { name: "Honda", logo: "/images/brands/honda-logo.png" },
    { name: "Yamaha", logo: "/images/brands/yamaha-logo.jpg" },
    { name: "Ducati", logo: "/images/brands/ducati-logo.png" },
];

const BrandFilter = ({ selectedBrand, onSelect }: { selectedBrand: string | null; onSelect: (brand: string | null) => void }) => {
    return (
        <div className="flex space-x-2 overflow-x-auto">
            {brands.map(({ name, logo }) => (
                <button
                    key={name}
                    className={`flex items-center px-3 py-2 border rounded-lg shadow-md transition ${selectedBrand === name ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => onSelect(selectedBrand === name ? null : name)}
                >
                    <Image src={logo} alt={name} width={24} height={24} />
                    {name}
                </button>
            ))}
        </div>
    );
};
export default BrandFilter;
