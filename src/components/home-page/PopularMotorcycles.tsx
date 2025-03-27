
import { fetchAllMotorcyclesSummary } from "@/lib/MotorcycleApi";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import Image from "next/image";
import Link from "next/link";

export default async function PopularMotorcycles() {
    const motorcycles: MotorcycleSummary[] = await fetchAllMotorcyclesSummary();
    return (
        <div className="text-center">
            <p className="text-2xl font-semibold">
                The most popular motorcycles
            </p>
            <div className="flex flex-wrap justify-center mt-4">
                {motorcycles
                    .filter((m) => m.model !== 'Tenere 700')
                    .map((moto) => (
                        <Link
                            href={`/motorcycles/${moto.id}`}
                            key={moto.id}
                            className="w-60 p-8 m-4 border rounded-lg shadow-sm flex flex-col items-center bg-gray-100 "
                        >
                            <p className="text-xl font-medium">{moto.model}</p>
                            <p className="text-gray-600">{moto.manufacturer}</p>
                            <div className="mt-4">
                                <Image src={moto.image} alt={moto.model} width={300} height={300} />
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};


// "use client";

// import { fetchAllMotorcyclesSummary } from "@/lib/MotorcycleApi";
// import { MotorcycleSummary } from "@/models/MotorcycleSummary";
// import Image from "next/image";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { useEffect, useState } from "react";

// export default function PopularMotorcycles() {
//     const [motorcycles, setMotorcycles] = useState<MotorcycleSummary[]>([]);

//     useEffect(() => {
//         async function getData() {
//             const data = await fetchAllMotorcyclesSummary();
//             setMotorcycles(data);
//         }
//         getData();
//     }, []);

//     return (
//         <div className="text-center mt-8">
//             <h2 className="text-3xl font-bold mb-6">🔥 The Most Popular Motorcycles</h2>

//             {/* Swiper Carousel */}
//             <Swiper
//                 modules={[Navigation, Pagination, Autoplay]}
//                 spaceBetween={20}
//                 slidesPerView={1} // Default (mobile)
//                 breakpoints={{
//                     640: { slidesPerView: 2 },  // Show 2 items on small screens
//                     1024: { slidesPerView: 3 }, // Show 3 items on medium screens
//                     1280: { slidesPerView: 4 }, // Show 4 items on large screens
//                 }}
//                 navigation={true} // Prev/Next buttons
//                 pagination={{ clickable: true }} // Dots navigation
//                 autoplay={{ delay: 2500, disableOnInteraction: false }} // Auto-slide every 2.5s
//                 loop={true} // Infinite scrolling
//             >
//                 <div className="flex flex-wrap justify-center mt-4">

//                     {motorcycles.map((moto) => (
//                         <SwiperSlide key={moto.id}>
//                             <Link
//                                 href={`/motorcycles/${moto.id}`}
//                                 className="w-60 p-8 m-4 border rounded-lg shadow-sm flex flex-col items-center bg-gray-100 "
//                             >
//                                 <p className="text-lg font-medium">{moto.model}</p>
//                                 <p className="text-gray-300">{moto.manufacturer}</p>
//                                 <div className="mt-4">
//                                     <Image src={moto.image} alt={moto.model} width={250} height={250} className="rounded-lg" />
//                                 </div>
//                             </Link>
//                         </SwiperSlide>
//                     ))}
//                 </div>
//             </Swiper>
//         </div>
//     );
// }
