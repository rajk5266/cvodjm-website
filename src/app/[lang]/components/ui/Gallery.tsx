'use client';

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from 'next/image'


interface GalleryImage {
  id: number;
  url: string;
  title: string;
  description: string;
}

interface GalleryContent {
  section: {
    title: string;
    subtitle: string;
    explore: {
      label: string;
      href: string;
    };
  };
  images: GalleryImage[];
}

type CommunityGalleryProps = {
  content: GalleryContent;
};

const CommunityGallery: React.FC<CommunityGalleryProps> = ({ content }) => {

  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = content?.images || [];

  // Auto-slide
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null; // no images, render nothing

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 text-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.section.title}</h2>
        <p className="text-gray-700 mb-12">{content.section.subtitle}</p>

        {/* Image Carousel */}
        <div className="relative">
          <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Info */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-center">
            <h3 className="font-semibold">{images[currentIndex].title}</h3>
            <p className="text-sm">{images[currentIndex].description}</p>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-orange-500" : "bg-gray-400/50"
                }`}
            />
          ))}
        </div>




      </div>

{/* CTA BUTTON */}
<div className="text-center mt-20">
  <Link href={`/${language}/${content.section.explore.href}`}>
    <button
      className={`
        px-10 py-4 rounded-xl font-semibold text-white text-lg
        bg-gradient-to-r from-orange-500 to-purple-600
        hover:from-orange-600 hover:to-purple-700
        transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105
      `}
    >
      {content.section.explore.label}
    </button>
  </Link>
</div>
    </section>
  );
};

export default CommunityGallery;
