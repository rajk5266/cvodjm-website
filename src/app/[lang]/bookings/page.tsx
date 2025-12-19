
import BookingFormClient from './BookingFormClient';

export default async function BookingPage() {
  // You can fetch members or location data from your DB here if needed
  // const members = await prisma.member.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Booking Application
          </h1>
          <p className="text-gray-600">
            Fill out the form below to submit your booking request
          </p>
        </div>

        {/* Client Form Component */}
        <BookingFormClient />
      </div>
    </div>
  );
}
