"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface CardContent {
  label: string;
  href: string;
}

interface GetInvolvedContent {
  headline: string;
  subtext: string;
  cards: CardContent[];
}

const getContentByLanguage = (language: string): GetInvolvedContent => {
  if (language === "gu") {
    return {
      headline: "મોટા હેતુનો ભાગ બનો.",
      subtext: "દરેક યોગદાન – મોટું કે નાનું – આપણા ધર્મ અને સેવાના માર્ગને મજબૂત બનાવે છે.",
      cards: [
        { label: "હવે દાન કરો", href: "/donate" },
        { label: "સ્વયંસેવક બનો", href: "/volunteer" },
        { label: "સહયોગ આપો", href: "/partner" },
      ],
    };
  }

  // Default to English
  return {
    headline: "Be Part of a Greater Purpose.",
    subtext: "Every contribution — big or small — strengthens our collective journey of faith and service.",
    cards: [
      { label: "Donate Now", href: "/donate" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Partner With Us", href: "/partner" },
    ],
  };
};

const GetInvolved: React.FC = () => {
  const { language } = useLanguage();
  const content = getContentByLanguage(language);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">{content.headline}</h2>
        <p className="text-gray-700 mb-12">{content.subtext}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.cards.map((card, idx) => (
            <Link key={idx} href={card.href}>
              <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">{card.label}</h3>
                <p className="text-gray-500">
                  {card.label === "Donate Now" || card.label === "હવે દાન કરો"
                    ? "Support our mission through financial contributions."
                    : card.label === "Volunteer" || card.label === "સ્વયંસેવક બનો"
                    ? "Join our events and help our community."
                    : "Partner with us to make a bigger impact."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
