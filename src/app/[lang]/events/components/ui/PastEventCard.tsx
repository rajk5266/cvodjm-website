// components/ui/PastEventCard.tsx
import React, { useState } from 'react';
import { Event } from '@/types/events';
import Image from 'next/image'

interface PastEventCardProps {
  event: Event;
}

const PastEventCard: React.FC<PastEventCardProps> = ({ event }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const openGallery = (index: number) => {
    setSelectedImage(index);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  const nextImage = () => {
    if (event.gallery) {
      const gallery = event.gallery;
      setSelectedImage((prev) => (prev + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (event.gallery) {
      const gallery = event.gallery;
      setSelectedImage((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/3">
            {event.gallery && event.gallery.length > 0 ? (
              <div className="relative h-64 md:h-full">
                <Image

                  src={event.gallery[0].url}
                  alt={event.name}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => openGallery(0)}
                />
                {event.gallery.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                    +{event.gallery.length - 1} more
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Completed
                </div>
              </div>
            ) : (
              <div className="h-64 md:h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="md:w-2/3 p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                  {event.eventType}
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {event.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {formatDate(event.date)} • {event.time}
                </p>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <p className="text-gray-600 mb-6 leading-relaxed">
                {event.description}
              </p>
            )}

            {/* Event Details Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Location */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Location</div>
                  <div className="text-gray-600 text-sm">{event.location}</div>
                </div>
              </div>

              {/* Coordinator */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Coordinator</div>
                  <div className="text-gray-600 text-sm">{event.coordinator.name}</div>
                  <div className="text-gray-500 text-xs">{event.coordinator.phone}</div>
                </div>
              </div>

              {/* Conducted By */}
              <div className="flex items-start space-x-3 md:col-span-2">
                <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M7 21h2m-2 0H3m2-2h6m4-2h2m-6-2h2M7 3h10M7 7h4m0 4h4" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Conducted By</div>
                  <div className="text-gray-600 text-sm">{event.conductedBy}</div>
                </div>
              </div>
            </div>

            {/* Gallery Button */}
            {event.gallery && event.gallery.length > 0 && (
              <button
                onClick={() => openGallery(0)}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Gallery ({event.gallery.length} photos)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && event.gallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows */}
            {event.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image */}
            <Image
              src={event.gallery[selectedImage].url}
              alt={event.gallery[selectedImage].caption || event.name}
              className="max-w-full max-h-full object-contain"
            />

            {/* Caption */}
            {event.gallery[selectedImage].caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                <p className="text-sm">{event.gallery[selectedImage].caption}</p>
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
              {selectedImage + 1} / {event.gallery.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PastEventCard;