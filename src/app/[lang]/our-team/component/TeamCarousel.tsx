// components/TeamCarousel.tsx
import React, { useState, useEffect } from 'react';
import { TeamSection } from '@/types/teams';
import TeamCard from '../component/ui/TeamCard';
import CarouselNavigation from '../../components/helper/CarouselNavigation';
import CarouselDots from '../../components/helper/CarouselDots';
import SectionHeader from '../component/ui/SectionHeader';

interface TeamCarouselProps {
  section: TeamSection;
}

const TeamCarousel: React.FC<TeamCarouselProps> = ({ section }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalSlides = Math.ceil(section.members.length / cardsPerView);
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

  // Get visible members for current slide
  const startIndex = currentIndex * cardsPerView;
  // const visibleMembers = section.members.slice(startIndex, startIndex + cardsPerView);

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title={section.title}
          subtitle={`Meet our dedicated ${section.title.toLowerCase()} who work tirelessly for our mission`}
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
              {/* Group members into slides */}
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex-shrink-0 w-full grid gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`,
                  }}
                >
                  {section.members
                    .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                    .map((member) => (
                      <TeamCard key={member.id} member={member} />
                    ))}
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

        {/* Member Count */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Showing {startIndex + 1}-{Math.min(startIndex + cardsPerView, section.members.length)} of {section.members.length} members
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamCarousel;