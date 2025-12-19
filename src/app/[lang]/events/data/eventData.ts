// data/eventData.ts
import { EventSection } from '@/types/events';

export const eventData: EventSection[] = [
  {
    title: "Upcoming Events",
    events: [
      {
        id: "upcoming-1",
        name: "Community Health Camp",
        eventType: "Health & Wellness",
        location: "Central Community Hall, Mumbai",
        date: "2025-08-15",
        time: "09:00 AM - 05:00 PM",
        coordinator: {
          name: "Dr. Priya Sharma",
          phone: "+91 9876543210"
        },
        conductedBy: "Mumbai Health Foundation",
        description: "Free health checkups and awareness program for community members including blood pressure, diabetes screening, and health consultations.",
        featured: true,
        registrationUrl: "#register",
        maxAttendees: 200,
        currentAttendees: 145
      },
      {
        id: "upcoming-2",
        name: "Digital Literacy Workshop",
        eventType: "Education & Training",
        location: "Government School, Andheri",
        date: "2025-08-20",
        time: "10:00 AM - 04:00 PM",
        coordinator: {
          name: "Mr. Rajesh Kumar",
          phone: "+91 9876543211"
        },
        conductedBy: "Tech for Good Initiative",
        description: "Basic computer skills and internet literacy training for elderly community members and students.",
        registrationUrl: "#register",
        maxAttendees: 50,
        currentAttendees: 32
      },
      {
        id: "upcoming-3",
        name: "Environmental Awareness Drive",
        eventType: "Environment",
        location: "Juhu Beach, Mumbai",
        date: "2025-08-25",
        time: "06:00 AM - 10:00 AM",
        coordinator: {
          name: "Ms. Kavya Nair",
          phone: "+91 9876543212"
        },
        conductedBy: "Green Mumbai Collective",
        description: "Beach cleanup drive followed by environmental awareness session and tree plantation activity.",
        featured: true,
        registrationUrl: "#register",
        maxAttendees: 100,
        currentAttendees: 78
      },
      {
        id: "upcoming-4",
        name: "Women Empowerment Seminar",
        eventType: "Social Development",
        location: "Bandra Community Center",
        date: "2025-09-05",
        time: "02:00 PM - 06:00 PM",
        coordinator: {
          name: "Mrs. Meera Joshi",
          phone: "+91 9876543213"
        },
        conductedBy: "Women's Development Council",
        description: "Skill development workshop focusing on entrepreneurship, financial literacy, and leadership for women.",
        registrationUrl: "#register",
        maxAttendees: 75,
        currentAttendees: 41
      }
    ]
  },
  {
    title: "Past Events",
    events: [
      {
        id: "past-1",
        name: "Annual Education Fair 2024",
        eventType: "Education",
        location: "MMRDA Grounds, BKC",
        date: "2024-12-15",
        time: "09:00 AM - 06:00 PM",
        coordinator: {
          name: "Prof. Indira Krishnan",
          phone: "+91 9876543220"
        },
        conductedBy: "Education Alliance Mumbai",
        description: "A comprehensive education fair featuring scholarship opportunities, career guidance, and educational institution showcases.",
        gallery: [
          {
            id: "gallery-1-1",
            url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&h=300&fit=crop",
            caption: "Students exploring career opportunities"
          },
          {
            id: "gallery-1-2",
            url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&h=300&fit=crop",
            caption: "Educational workshops in session"
          },
          {
            id: "gallery-1-3",
            url: "https://images.unsplash.com/photo-1523580846011-d3982bcd500e?w=500&h=300&fit=crop",
            caption: "Career counseling sessions"
          }
        ]
      },
      {
        id: "past-2",
        name: "Blood Donation Camp",
        eventType: "Health & Social Service",
        location: "Sion Hospital, Mumbai",
        date: "2024-11-28",
        time: "08:00 AM - 02:00 PM",
        coordinator: {
          name: "Dr. Ashok Mehta",
          phone: "+91 9876543221"
        },
        conductedBy: "Mumbai Blood Bank Association",
        description: "Voluntary blood donation drive that collected 180 units of blood for emergency medical needs.",
        gallery: [
          {
            id: "gallery-2-1",
            url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
            caption: "Volunteers registering for blood donation"
          },
          {
            id: "gallery-2-2",
            url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
            caption: "Medical team conducting health checkups"
          }
        ]
      },
      {
        id: "past-3",
        name: "Skill Development Workshop",
        eventType: "Vocational Training",
        location: "Powai Community Center",
        date: "2024-10-20",
        time: "10:00 AM - 05:00 PM",
        coordinator: {
          name: "Mr. Arjun Reddy",
          phone: "+91 9876543218"
        },
        conductedBy: "Skill India Initiative",
        description: "Comprehensive training program covering tailoring, computer basics, and small business management for unemployed youth.",
        gallery: [
          {
            id: "gallery-3-1",
            url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
            caption: "Participants learning tailoring skills"
          },
          {
            id: "gallery-3-2",
            url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
            caption: "Computer training session"
          },
          {
            id: "gallery-3-3",
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
            caption: "Business management workshop"
          }
        ]
      },
      {
        id: "past-4",
        name: "Children's Day Celebration",
        eventType: "Cultural & Social",
        location: "Shivaji Park, Mumbai",
        date: "2024-11-14",
        time: "09:00 AM - 01:00 PM",
        coordinator: {
          name: "Ms. Deepika Iyer",
          phone: "+91 9876543222"
        },
        conductedBy: "Child Welfare Society",
        description: "A joyful celebration featuring cultural performances, games, prizes, and free lunch for underprivileged children.",
        gallery: [
          {
            id: "gallery-4-1",
            url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587693?w=500&h=300&fit=crop",
            caption: "Children performing cultural dance"
          },
          {
            id: "gallery-4-2",
            url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop",
            caption: "Prize distribution ceremony"
          },
          {
            id: "gallery-4-3",
            url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&h=300&fit=crop",
            caption: "Community lunch for children"
          }
        ]
      },
      {
        id: "past-5",
        name: "Senior Citizens Health Camp",
        eventType: "Health & Wellness",
        location: "Borivali Community Hall",
        date: "2024-09-15",
        time: "08:00 AM - 02:00 PM",
        coordinator: {
          name: "Dr. Sunita Desai",
          phone: "+91 9876543213"
        },
        conductedBy: "Senior Care Foundation",
        description: "Specialized health checkup program for senior citizens including eye tests, blood pressure monitoring, and medicine distribution.",
        gallery: [
          {
            id: "gallery-5-1",
            url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop",
            caption: "Medical consultation for seniors"
          },
          {
            id: "gallery-5-2",
            url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop",
            caption: "Eye checkup camp"
          }
        ]
      }
    ]
  }
];