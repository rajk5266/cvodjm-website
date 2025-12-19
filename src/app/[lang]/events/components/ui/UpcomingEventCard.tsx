// components/ui/UpcomingEventCard.tsx
import React from 'react';
import { Event } from '@/types/events';
import Image from 'next/image'


interface UpcomingEventCardProps {
  event: Event;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear()
    };
  };

  const dateInfo = formatDate(event.date);
  // const attendancePercentage = event.maxAttendees && event.currentAttendees 
  //   ? (event.currentAttendees / event.maxAttendees) * 100 
  //   : 0;

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${event.featured ? 'ring-2 ring-blue-500' : ''} max-w-sm mx-auto h-full flex flex-col`}>
      {/* Event Image */}
      <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
        {event.image ? (
          <Image 
            src={event.image} 
            alt={event.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Featured Badge */}
        {event.featured && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 absolute top-4 right-4 rounded-full z-10 shadow-lg">
            Featured
          </div>
        )}

        {/* Date Badge Overlay */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">{dateInfo.day}</div>
          <div className="text-xs uppercase tracking-wide text-gray-600">{dateInfo.month}</div>
          <div className="text-xs text-gray-500">{dateInfo.year}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Event Type */}
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3 w-fit">
          {event.eventType}
        </span>

        {/* Event Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {event.name}
        </h3>

        {/* Description */}
        {event.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
            {event.description}
          </p>
        )}

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          {/* Location */}
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{event.location}</span>
          </div>

          {/* Time */}
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{event.time}</span>
          </div>

          {/* Coordinator */}
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div className="text-sm">
              <div className="font-medium">{event.coordinator.name}</div>
              <div className="text-gray-500">{event.coordinator.phone}</div>
            </div>
          </div>

          {/* Conducted By */}
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M7 21h2m-2 0H3m2-2h6m4-2h2m-6-2h2M7 3h10M7 7h4m0 4h4" />
            </svg>
            <span className="text-sm">{event.conductedBy}</span>
          </div>
        </div>

        {/* Register Button */}
        <button 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg"
          onClick={() => {
            if (event.registrationUrl) {
              window.open(event.registrationUrl, '_blank');
            }
          }}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default UpcomingEventCard;