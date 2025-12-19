// components/EventCarousel.tsx
import React, { useState, useEffect } from 'react';
import { EventSection } from '@/types/events';
import UpcomingEventCard from './ui/UpcomingEventCard';
import PastEventCard from './ui/PastEventCard';
import CarouselNavigation from '../../components/helper/CarouselNavigation';
import CarouselDots from '../../components/helper/CarouselDots';
import SectionHeader from './ui/SectionHeader';

interface EventCarouselProps {
  section: EventSection;
  isUpcoming?: boolean;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ section, isUpcoming = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(isUpcoming ? 3 : 1);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (isUpcoming) {
        if (window.innerWidth < 640) {
          setCardsPerView(1);
        } else if (window.innerWidth < 1024) {
          setCardsPerView(2);
        } else {
          setCardsPerView(3);
        }
      } else {
        // Past events always show 1 card per view due to larger card size
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, [isUpcoming]);

  const totalSlides = Math.ceil(section.events.length / cardsPerView);
  const maxIndex = totalSlides - 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(maxIndex, Math.max(0, index)));
  };

  // Get visible events for current slide
  const startIndex = currentIndex * cardsPerView;
  // const visibleEvents = section.events.slice(startIndex, startIndex + cardsPerView);

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <section className={`py-16 ${isUpcoming ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <SectionHeader 
          title={section.title}
          subtitle={
            isUpcoming 
              ? "Join us in making a difference. Register for our upcoming community events and be part of positive change."
              : "Relive the moments from our successful community initiatives and see the impact we've made together."
          }
        />

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {/* Group events into slides */}
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex-shrink-0 w-full"
                >
                  {isUpcoming ? (
                    <div 
                      className="grid gap-6"
                      style={{
                        gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`,
                      }}
                    >
                      {section.events
                        .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                        .map((event) => (
                          <UpcomingEventCard key={event.id} event={event} />
                        ))}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {section.events
                        .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                        .map((event) => (
                          <PastEventCard key={event.id} event={event} />
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <CarouselNavigation
              onPrevious={goToPrevious}
              onNext={goToNext}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
            />
          )}
        </div>

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <CarouselDots
            total={totalSlides}
            current={currentIndex}
            onDotClick={goToSlide}
          />
        )}

        {/* Event Count */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Showing {startIndex + 1}-{Math.min(startIndex + cardsPerView, section.events.length)} of {section.events.length} events
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;