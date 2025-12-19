
'use client';

import React from 'react';
import Head from 'next/head';
import PageHeader from './component/PageHeader';
import TeamCarousel from './component/TeamCarousel';
import { teamData } from './data/teamData';


const OurTeamPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Our Team | Organization Name</title>
        <meta 
          name="description" 
          content="Meet our dedicated team of trustees, executive committee members, and advisors working towards our mission." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Page Header */}
        <PageHeader
          title="Our Team"
          description="Meet the passionate individuals who drive our mission forward. Our diverse team brings together expertise, dedication, and a shared commitment to making a positive impact in our communities."
        />

        {/* Team Sections */}
        <div className="space-y-0">
          {teamData.map((section, index) => (
            <div key={section.title}>
              <TeamCarousel section={section} />
              
              {/* Separator between sections (except last) */}
              {index < teamData.length - 1 && (
                <div className="py-8 bg-white">
                  <div className="container mx-auto px-4">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              We&apos;re always looking for passionate individuals to join our team and help us make a difference in our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Get Involved
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OurTeamPage;