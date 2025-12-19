"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface CentresContent {
  title: string;
  subtitle: string;
  banner: {
    image: string;
    alt: string;
  };
  cta: {
    label: string;
    href: string;
  };
}

interface CentresBannerProps {
  content: CentresContent;
}

const CentresBanner: React.FC<CentresBannerProps> = ({ content }) => {
  const { language } = useLanguage();

  if (!content) return null;

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">{content.title}</h2>
        <p className="text-lg text-gray-600 mb-10">{content.subtitle}</p>
        <div
          className="w-full h-72 rounded-xl bg-cover bg-center mb-10"
          style={{ backgroundImage: `url(${content.banner.image})` }}
          aria-label={content.banner.alt}
        ></div>
        <Link
          href={`/${language}/${content.cta.href}`}
          className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold text-lg shadow-md hover:opacity-90 transition"
        >
          {content.cta.label}
        </Link>
      </div>
    </section>
  );
};

export default CentresBanner;


