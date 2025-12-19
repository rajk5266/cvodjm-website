'use client';
import FormattedDate from '../helper/FormattedDate';
import Image from 'next/image';

import React, { useState, useEffect } from 'react';
import {
    Calendar,
    MapPin,
    User,
    Phone,
    Clock,
    ChevronLeft,
    ChevronRight,
    X,
    CreditCard,
    Users,
    Star,
    ExternalLink
} from 'lucide-react';

interface Event {
    id: number;
    name: string;
    type: string;
    location: string;
    date: string;
    time: string;
    coordinatorName: string;
    coordinatorPhone: string;
    conductedBy: string;
    description: string;
    image: string;
    registrationFee: number;
    isPaymentRequired: boolean;
    availableSeats: number;
    totalSeats: number;
    featured: boolean;
}

interface RegistrationForm {
    fullName: string;
    email: string;
    phone: string;
    whatsapp: string;
    specialRequirements: string;
}

const defaultEvents: Event[] = [
    {
        id: 1,
        name: "Paryushan Mahotsav 2025",
        type: "Religious Festival",
        location: "Main Community Hall, Pune",
        date: "2025-08-15",
        time: "06:00 AM",
        coordinatorName: "Rajesh Kumar",
        coordinatorPhone: "+91-9876543210",
        conductedBy: "Acharya Shri Vijay Kumar",
        description: "Eight-day festival of forgiveness, self-purification, and spiritual elevation. Join us for daily prayers, discourses, and community meals.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
        registrationFee: 0,
        isPaymentRequired: false,
        availableSeats: 45,
        totalSeats: 200,
        featured: true
    },
    {
        id: 2,
        name: "Youth Leadership Workshop",
        type: "Educational Workshop",
        location: "Conference Room A, Mumbai",
        date: "2025-08-25",
        time: "10:00 AM",
        coordinatorName: "Priya Jain",
        coordinatorPhone: "+91-9123456789",
        conductedBy: "Leadership Institute Mumbai",
        description: "Develop leadership skills, communication abilities, and project management expertise. Includes hands-on activities and networking opportunities.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
        registrationFee: 1500,
        isPaymentRequired: true,
        availableSeats: 12,
        totalSeats: 30,
        featured: false
    },
    {
        id: 3,
        name: "Traditional Cooking Class",
        type: "Cultural Workshop",
        location: "Community Kitchen, Nagpur",
        date: "2025-09-05",
        time: "02:00 PM",
        coordinatorName: "Sunita Devi",
        coordinatorPhone: "+91-9234567890",
        conductedBy: "Master Chef Kamala Ben",
        description: "Learn traditional Jain recipes, cooking techniques, and the significance of sattvic food preparation. All ingredients provided.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
        registrationFee: 800,
        isPaymentRequired: true,
        availableSeats: 8,
        totalSeats: 15,
        featured: true
    },
    {
        id: 4,
        name: "Community Health Camp",
        type: "Health & Wellness",
        location: "Medical Center, Delhi",
        date: "2025-09-12",
        time: "09:00 AM",
        coordinatorName: "Dr. Amit Shah",
        coordinatorPhone: "+91-9345678901",
        conductedBy: "Apollo Health Foundation",
        description: "Free health checkups, blood pressure monitoring, diabetes screening, and health awareness sessions. Open to all community members.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
        registrationFee: 0,
        isPaymentRequired: false,
        availableSeats: 75,
        totalSeats: 100,
        featured: false
    },
    {
        id: 5,
        name: "Spiritual Discourse Series",
        type: "Spiritual Event",
        location: "Temple Auditorium, Ahmedabad",
        date: "2025-09-20",
        time: "07:00 PM",
        coordinatorName: "Mahesh Jain",
        coordinatorPhone: "+91-9456789012",
        conductedBy: "Pandit Narayan Das",
        description: "Weekly series on Jain philosophy, meditation techniques, and practical spirituality for modern life. Includes Q&A sessions.",
        image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=500&h=300&fit=crop",
        registrationFee: 200,
        isPaymentRequired: true,
        availableSeats: 25,
        totalSeats: 80,
        featured: true
    }
];

const Events: React.FC = () => {
    const [events] = useState<Event[]>(defaultEvents);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false)
    const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
        fullName: '',
        email: '',
        phone: '',
        whatsapp: '',
        specialRequirements: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // const [formatted, setFormatted] = useState('');

    // Auto-slide carousel
    useEffect(() => {
        if (isHovered) return; // pause if hovered
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, 5000);


        return () => clearInterval(interval);
    }, [events.length, isHovered]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
    };

    const handleRegister = (event: Event) => {
        setSelectedEvent(event);
        setShowRegistrationModal(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (selectedEvent?.isPaymentRequired) {
            setShowRegistrationModal(false);
            setShowPaymentModal(true);
        } else {
            // Handle free registration
            alert(`Registration successful! Confirmation sent to ${registrationForm.email}`);
            setShowRegistrationModal(false);
            resetForm();
        }
        setIsSubmitting(false);
    };

    const handlePayment = async () => {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert(`Payment successful! Registration confirmed. Details sent to ${registrationForm.email} and WhatsApp ${registrationForm.whatsapp}`);
        setShowPaymentModal(false);
        resetForm();
    };

    const resetForm = () => {
        setRegistrationForm({
            fullName: '',
            email: '',
            phone: '',
            whatsapp: '',
            specialRequirements: ''
        });
        setSelectedEvent(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getVisibleEvents = () => {
        const visibleEvents = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % events.length;
            visibleEvents.push(events[index]);
        }
        return visibleEvents;
    };

    return (
        <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Upcoming Events
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join our vibrant community events, workshops, and celebrations. Register now to secure your spot!
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="overflow-hidden rounded-3xl">
                        <div className="flex transition-transform duration-500 ease-in-out">
                            {getVisibleEvents().map((event, index) => (
                                <div key={event.id} className={`w-full md:w-1/3 flex-shrink-0 px-4 ${index === 1 ? 'scale-105 z-10' : 'scale-95'}`}>
                                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                                        {/* Event Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={event.image}
                                                alt={event.name}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            />
                                            {event.featured && (
                                                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                                                    <Star className="w-4 h-4" />
                                                    <span>Featured</span>
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                                {event.type}
                                            </div>
                                        </div>

                                        {/* Event Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                                {event.name}
                                            </h3>

                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                {event.description}
                                            </p>

                                            {/* Event Details */}
                                            <div className="space-y-2 mb-6">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                                                    <FormattedDate date={event.date} />
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Clock className="w-4 h-4 mr-2 text-orange-500" />
                                                    <span>{event.time}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                                                    <span className="line-clamp-1">{event.location}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <User className="w-4 h-4 mr-2 text-orange-500" />
                                                    <span>By {event.conductedBy}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Users className="w-4 h-4 mr-2 text-orange-500" />
                                                    <span>{event.availableSeats} seats available of {event.totalSeats}</span>
                                                </div>
                                            </div>

                                            {/* Coordinator Info */}
                                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                                <p className="text-sm text-gray-600">Event Coordinator</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-900">{event.coordinatorName}</span>
                                                    <a href={`tel:${event.coordinatorPhone}`} className="text-orange-500 hover:text-orange-600">
                                                        <Phone className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Price and Register Button */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    {event.isPaymentRequired ? (
                                                        <div className="text-2xl font-bold text-gray-900">
                                                            ₹{event.registrationFee}
                                                            <span className="text-sm font-normal text-gray-600 ml-1">per person</span>
                                                        </div>
                                                    ) : (
                                                        <div className="text-2xl font-bold text-green-600">
                                                            Free
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleRegister(event)}
                                                    disabled={event.availableSeats === 0}
                                                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${event.availableSeats === 0
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-lg'
                                                        }`}
                                                >
                                                    {event.availableSeats === 0 ? 'Sold Out' : 'Register Now'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                    {events.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Registration Modal */}
            {showRegistrationModal && selectedEvent && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Register for Event</h3>
                                <button
                                    onClick={() => setShowRegistrationModal(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Event Summary */}
                            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-6">
                                <h4 className="font-semibold text-gray-900 mb-2">{selectedEvent.name}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {formatDate(selectedEvent.date)}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2" />
                                        {selectedEvent.time}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {selectedEvent.location}
                                    </div>
                                    <div className="flex items-center">
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        {selectedEvent.isPaymentRequired ? `₹${selectedEvent.registrationFee}` : 'Free'}
                                    </div>
                                </div>
                            </div>

                            {/* Registration Form */}
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={registrationForm.fullName}
                                            onChange={(e) => setRegistrationForm(prev => ({ ...prev, fullName: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={registrationForm.email}
                                            onChange={(e) => setRegistrationForm(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={registrationForm.phone}
                                            onChange={(e) => setRegistrationForm(prev => ({ ...prev, phone: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="+91-XXXXXXXXXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            WhatsApp Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={registrationForm.whatsapp}
                                            onChange={(e) => setRegistrationForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="+91-XXXXXXXXXX (optional)"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Special Requirements
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={registrationForm.specialRequirements}
                                        onChange={(e) => setRegistrationForm(prev => ({ ...prev, specialRequirements: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{selectedEvent.isPaymentRequired ? 'Proceed to Payment' : 'Register Now'}</span>
                                                <ExternalLink className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {showPaymentModal && selectedEvent && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CreditCard className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Required</h3>
                                <p className="text-gray-600 mb-4">Complete your registration payment</p>

                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600">Event:</span>
                                        <span className="font-medium">{selectedEvent.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600">Amount:</span>
                                        <span className="font-bold text-xl">₹{selectedEvent.registrationFee}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Participant:</span>
                                        <span className="font-medium">{registrationForm.fullName}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handlePayment}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                                    >
                                        Pay Now
                                    </button>
                                    <button
                                        onClick={() => setShowPaymentModal(false)}
                                        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Events;