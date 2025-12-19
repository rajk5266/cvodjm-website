// pages/events.tsx (or app/events/page.tsx for App Router)


'use client';

import React from 'react';
import Head from 'next/head';
import PageHeader from './components/PageHeader';
import EventCarousel from './components/EventCarousel';
import EventStats from './components/ui/EventStats';
import { eventData } from './data/eventData';

const EventsPage: React.FC = () => {
  const upcomingEvents = eventData.find(section => section.title === "Upcoming Events");
  const pastEvents = eventData.find(section => section.title === "Past Events");

  if (!upcomingEvents || !pastEvents) {
    return <div>Error loading events data</div>;
  }

  return (
    <>
      <Head>
        <title>Events | Organization Name</title>
        <meta 
          name="description" 
          content="Discover our upcoming community events and explore the impact of our past initiatives. Join us in making a positive difference." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="community events, social initiatives, volunteering, workshops, health camps" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Page Header */}
        <PageHeader
          title="Our Events"
          description="Discover meaningful opportunities to connect, learn, and contribute to our community. From health camps to educational workshops, join us in creating positive change together."
          backgroundImage="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=400&fit=crop"
        />

        {/* Event Statistics */}
        <EventStats 
          upcomingEvents={upcomingEvents}
          pastEvents={pastEvents}
        />

        {/* Upcoming Events Section */}
        <EventCarousel 
          section={upcomingEvents} 
          isUpcoming={true}
        />

        {/* Past Events Section */}
        <EventCarousel 
          section={pastEvents} 
          isUpcoming={false}
        />


        {/* Quick Actions */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Event Calendar */}
              <div className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                <div className="inline-flex p-3 bg-blue-600 text-white rounded-full mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Event Calendar</h3>
                <p className="text-gray-600 text-sm">View all events in calendar format</p>
              </div>

              {/* Volunteer Sign-up */}
              <div className="text-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200 cursor-pointer">
                <div className="inline-flex p-3 bg-green-600 text-white rounded-full mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Become a Volunteer</h3>
                <p className="text-gray-600 text-sm">Join our volunteer network</p>
              </div>

              {/* Event Proposal */}
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200 cursor-pointer">
                <div className="inline-flex p-3 bg-purple-600 text-white rounded-full mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Suggest an Event</h3>
                <p className="text-gray-600 text-sm">Propose a community initiative</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EventsPage;