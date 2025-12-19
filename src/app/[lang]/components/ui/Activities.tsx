'use client'

import React, { useState, useRef } from 'react'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ActivitiesContent } from '@/types/activities'
import Image from 'next/image'


interface ActivitiesCarouselProps {
  content: ActivitiesContent
  onJoinActivity?: (activityId: number) => void
  className?: string
}

const ActivitiesCarousel: React.FC<ActivitiesCarouselProps> = ({
  content,
  onJoinActivity,
  className = ''
}) => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  const handleCardClick = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index)
  }

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const amount = direction === 'left' ? -350 : 350
    carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const getTypeColor = (type: string) => {
    const colors = {
      Educational: 'bg-blue-100 text-blue-800',
      Spiritual: 'bg-purple-100 text-purple-800',
      Cultural: 'bg-orange-100 text-orange-800',
      Service: 'bg-green-100 text-green-800',
      Health: 'bg-pink-100 text-pink-800',

      // Gujarati fallback types
      'શૈક્ષણિક': 'bg-blue-100 text-blue-800',
      'આધ્યાત્મિક': 'bg-purple-100 text-purple-800',
      'સાંસ્કૃતિક': 'bg-orange-100 text-orange-800',
      'સેવા': 'bg-green-100 text-green-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Arrows */}
        <div className="flex justify-between mb-4 px-2">
          <button
            onClick={() => scrollCarousel('left')}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scrollCarousel('right')}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        >
          {content.activities.map((activity, index) => (
            <div
              key={activity.id}
              className="min-w-[320px] snap-start group relative h-96 cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`relative w-full h-full transition-all duration-700 transform-style-preserve-3d ${flippedCard === index ? 'rotate-y-180' : ''
                  }`}
              >
                {/* FRONT */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full hover:shadow-2xl transition-all border border-gray-200">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                      <span
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                          activity.type
                        )}`}
                      >
                        {activity.type}
                      </span>

                      <div className="absolute bottom-4 left-4 bg-white/90 rounded-full p-2">
                        <BookOpen className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600">
                        {activity.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{activity.summary}</p>
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                  <div
                    className={`bg-gradient-to-br ${activity.color || 'from-orange-500 to-red-600'
                      } rounded-2xl shadow-xl h-full p-6 flex flex-col justify-center text-white`}
                  >
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-80" />

                    <h3 className="text-2xl font-bold mb-4 text-center">
                      {activity.name}
                    </h3>

                    <p className="leading-relaxed mb-6 text-sm text-center">
                      {activity.description}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onJoinActivity?.(activity.id)
                      }}
                      className="bg-white/20 hover:bg-white/40 text-white px-6 py-3 rounded-lg font-semibold transition-all border border-white/40"
                    >
                      Join Activity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="text-center mt-20">
          <Link href={`/${language}/${content.exploreCTA.href}`}>
            <button
              className={`
        px-10 py-4 rounded-xl font-semibold text-white text-lg
        bg-gradient-to-r from-orange-500 to-purple-600
        hover:from-orange-600 hover:to-purple-700
        transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105
      `}
            >
              {content.exploreCTA.label}
            </button>
          </Link>
        </div>

      </div>

      <style jsx>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default ActivitiesCarousel
