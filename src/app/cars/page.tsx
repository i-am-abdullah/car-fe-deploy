'use client';
import React, { useState, useEffect } from 'react';
import CarCard from '../../components/ui/CarCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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

interface CarApiResponse {
  items: RawCarItem[];
  total?: number;
}

const transformCarData = (apiData: CarApiResponse): CarCardProps[] => {
  if (!apiData || !apiData.items || !apiData.items.length) return [];

  return apiData.items.map((item: RawCarItem): CarCardProps => {
    return {
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
    };
  });
};

const CarListingsPage = () => {
  const [cars, setCars] = useState<CarCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 8;

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/public/car-listings/?page=${currentPage}&limit=${limit}`);

        if (!response.ok) {
          throw new Error('Failed to fetch car listings');
        }

        const data: CarApiResponse = await response.json();
        const transformedCars = transformCarData(data);
        setCars(transformedCars);
        setTotalItems(data.total || 0);
        setTotalPages(Math.ceil((data.total || 0) / limit));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error('Error fetching car listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePaginationNumbers = () => {
    const pages: (number | string)[] = [];
    pages.push(1);
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) pages.push('...');
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (endPage < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Car Listings</h1>
        <p className="text-gray-600 mb-8">Find your perfect car from our extensive collection</p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3D1703]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <p>{error}</p>
          </div>
        ) : totalItems === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-medium text-gray-800 mb-2">No cars found</h2>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">Showing {cars.length} of {totalItems} cars</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cars.map(car => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-10 h-10 rounded-md mr-2 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    } border`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {generatePaginationNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === '...' ? (
                        <span className="flex items-center justify-center w-10 h-10 text-gray-500">...</span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page as number)}
                          className={`flex items-center justify-center w-10 h-10 rounded-md mx-1 ${
                            currentPage === page
                              ? 'bg-[#3D1703] text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          } border`}
                          aria-label={`Page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-10 h-10 rounded-md ml-2 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    } border`}
                    aria-label="Next page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CarListingsPage;
