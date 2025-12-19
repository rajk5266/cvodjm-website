import React from "react";

interface AboutSectionProps {
  content: {
    title: string;
    tagline: string;
    description: string;
    cta: {
      label: string;
      href: string;
    };
    banner: {
      image: string;
      alt: string;
    };
  };
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat bg-gray-800"
      style={{ backgroundImage: `url(${content.banner.image})` }}
      aria-label={content.banner.alt}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-5xl mx-auto px-6 py-24 text-white">
        
        {/* Title */}
        <h2 className="text-4xl font-bold mb-4">
          {content.title}
        </h2>

        {/* Tagline */}
        <p className="text-lg italic mb-6 opacity-90">
          “{content.tagline}”
        </p>

        {/* Description */}
        <p className="text-base leading-relaxed mb-8">
          {content.description}
        </p>

        {/* CTA Button */}
        <a
          href={content.cta.href}
          className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold 
                     hover:bg-gray-300 transition border border-white/30 shadow-lg"
        >
          {content.cta.label}
        </a>

      </div>
    </section>
  );
}
