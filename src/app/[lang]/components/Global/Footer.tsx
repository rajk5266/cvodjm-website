import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Heart,
  Shield,
  FileText,
  Users,
  Calendar,
  Home,
  Gift,
  BookOpen,
  HelpCircle,
  MessageCircle,
  ChevronRight,
  Clock
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about', icon: <Users className="w-4 h-4" /> },
    { name: 'Our Services', href: '/services', icon: <Gift className="w-4 h-4" /> },
    { name: 'Membership', href: '/membership', icon: <Users className="w-4 h-4" /> },
    { name: 'Events', href: '/events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Gallery', href: '/gallery', icon: <Home className="w-4 h-4" /> },
    { name: 'Contact Us', href: '/contact', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  const services = [
    { name: 'Accommodation Facilities', href: '/services/accommodation' },
    { name: 'Educational Programs', href: '/services/education' },
    { name: 'Health & Wellness', href: '/services/health' },
    { name: 'Cultural Events', href: '/services/cultural' },
    { name: 'Community Support', href: '/services/support' },
    { name: 'Documentation Help', href: '/services/documentation' }
  ];

  const resources = [
    { name: 'FAQ', href: '/faq', icon: <HelpCircle className="w-4 h-4" /> },
    { name: 'Downloads', href: '/downloads', icon: <FileText className="w-4 h-4" /> },
    { name: 'Forms & Applications', href: '/forms', icon: <FileText className="w-4 h-4" /> },
    { name: 'Community Guidelines', href: '/guidelines', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'News & Updates', href: '/news', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Help Center', href: '/help', icon: <HelpCircle className="w-4 h-4" /> }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Accessibility', href: '/accessibility' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/community', icon: <Facebook className="w-5 h-5" />, color: 'hover:text-blue-400' },
    { name: 'Twitter', href: 'https://twitter.com/community', icon: <Twitter className="w-5 h-5" />, color: 'hover:text-sky-400' },
    { name: 'Instagram', href: 'https://instagram.com/community', icon: <Instagram className="w-5 h-5" />, color: 'hover:text-pink-400' },
    { name: 'YouTube', href: 'https://youtube.com/community', icon: <Youtube className="w-5 h-5" />, color: 'hover:text-red-400' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/community', icon: <Linkedin className="w-5 h-5" />, color: 'hover:text-blue-300' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info & Contact */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                Community Center
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Serving our community with dedication and compassion. Building stronger bonds and creating lasting memories together.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-sm text-gray-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:underline">+91-98765-43210</a>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href="mailto:info@community.org" className="hover:underline">info@community.org</a>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>123 Community Center Road,<br />Kachh, Gujarat 411001</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-all duration-300 ${social.color} hover:scale-110`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 group"
                  >
                    <span className="text-orange-400 group-hover:text-orange-300">{link.icon}</span>
                    <span className="text-sm">{link.name}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 mr-2 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 group"
                  >
                    <span className="text-orange-400 group-hover:text-orange-300">{resource.icon}</span>
                    <span className="text-sm">{resource.name}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            {/* <div className="mt-8 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
              <h5 className="font-semibold mb-2 text-orange-400">Stay Updated</h5>
              <p className="text-xs text-gray-300 mb-3">Get latest updates and announcements</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:border-orange-400"
                />
                <button className="bg-gradient-to-r from-orange-500 to-red-500 px-2 py-2 rounded-r-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {legalLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.name}
                </a>
                {index < legalLinks.length - 1 && (
                  <span className="ml-6 text-gray-600">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Copyright & Additional Info */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} Community Center. All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Secure & Trusted</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Made with care for our community</span>
              </div>
            </div>
          </div>

          {/* Additional Footer Info */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs text-gray-500">
              <span>Reg. No: COM/2024/001234</span>
              <span>Tax ID: 12ABCDE3456F7GH</span>
              <span>Established: 1985</span>
              <span>Members: 2800+</span>
            </div>
            <p className="mt-3 text-xs text-gray-500 max-w-2xl mx-auto">
              This website is developed & maintained by Itegoss 
              For technical issues or suggestions, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;