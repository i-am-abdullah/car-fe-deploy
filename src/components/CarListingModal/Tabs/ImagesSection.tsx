import { CarImage } from "@/types/car";
import { ImageUpload } from '@/components/FileUpload/FileUpload';

interface ImagesSectionProps {
  images: CarImage[];
  onChange: (images: CarImage[]) => void;
}

export function ImagesSection({ images, onChange }: ImagesSectionProps) {
  return (
    <ImageUpload 
      images={images} 
      onChange={onChange} 
    />
  );
}