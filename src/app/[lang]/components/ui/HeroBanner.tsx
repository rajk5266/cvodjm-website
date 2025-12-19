"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface BannerType {
  title: string;
  subtitle?: string;
  cta?: string;
  banner_image?: string;
}

interface HeroBannerProps {
  banners: BannerType[];
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = 5000;

  useEffect(() => {
    if (!banners || banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
          <Image
  src={banner.banner_image ?? "/images/default-banner.jpg"}
  alt={`Banner ${index + 1}`}
  fill
  className="object-cover"
/>



            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              {banner.title && (
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {banner.title}
                </h1>
              )}
              {banner.subtitle && (
                <p className="text-xl md:text-2xl mb-6">
                  {banner.subtitle}
                </p>
              )}
              {banner.cta && (
                <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white px-8 py-3 rounded-full font-semibold">
                  {banner.cta}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
