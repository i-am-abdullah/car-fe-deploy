'use client';
import React, { useEffect, useState } from 'react';
import CarCard from '../../components/ui/CarCard';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface RawCarItem {
  id: string;
  images: { image_url: string }[];
  price: string;
  location?: string;
  make?: { name?: string };
  model?: { name?: string };
  year?: { year?: number };
  meter_reading?: number;
  additionalDetail?: {
    fuel_type?: string;
    transmission?: string;
  };
}

interface CarCardProps {
  id: string;
  image: string;
  price: number;
  location: string;
  model: string;
  year: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  isElectric: boolean;
  isFavorite: boolean;
}

const transformCarData = (items: RawCarItem[]): CarCardProps[] => {
  return items.map((item): CarCardProps => ({
    id: item.id,
    image: item.images?.[0]?.image_url || '/car.png',
    price: parseFloat(item.price) || 0,
    location: item.location || 'N/A',
    model: `${item.make?.name || ''} ${item.model?.name || ''}`.trim(),
    year: item.year?.year?.toString() || 'N/A',
    mileage: item.meter_reading || 0,
    fuelType: item.additionalDetail?.fuel_type || 'N/A',
    transmission: item.additionalDetail?.transmission || 'N/A',
    isElectric: item.additionalDetail?.fuel_type?.toLowerCase() === 'electric',
    isFavorite: false,
  }));
};

const FeaturedCars: React.FC = () => {
  const [cars, setCars] = useState<CarCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/public/car-listings/?page=1&limit=8`);
        const data = await response.json();
        const transformed = transformCarData(data.items || []);
        setCars(transformed);
      } catch (err) {
        console.error('Error fetching featured cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Latest Cars</h2>
            <p className="text-gray-600 mt-2">Explore our top-rated vehicles with the best deals</p>
          </div>
          <a href="/cars" className="inline-flex items-center text-[#3D1703] hover:underline font-medium">
            View All
            <ArrowRight size={18} className="ml-1" />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3D1703]"></div>
          </div>
        ) : (
          <div className="relative px-12">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
              pagination={{ clickable: true, el: '.swiper-pagination', type: 'bullets' }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="car-swiper"
            >
              {cars.map(car => (
                <SwiperSlide key={car.id}>
                  <div className="px-2 mb-6">
                    <CarCard {...car} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation buttons */}
            <button className="swiper-button-prev absolute top-1/2 left-2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-md z-10 hover:bg-gray-100">
              <ChevronLeft size={20} className="text-gray-800" />
            </button>
            <button className="swiper-button-next absolute top-1/2 right-2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-md z-10 hover:bg-gray-100">
              <ChevronRight size={20} className="text-gray-800" />
            </button>

            <div className="swiper-pagination flex justify-center mt-8 space-x-2"></div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          width: 24px;
          background: #3D1703;
          border-radius: 4px;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          display: none;
        }

        .swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCars;
