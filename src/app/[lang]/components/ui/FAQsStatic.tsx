// 'use client'

// import React, { useState } from 'react';
// import { ChevronDown, Search, MessageCircle, Phone, Mail } from 'lucide-react';

// export interface FAQ {
//   id: number;
//   question: string;
//   answer: string;
//   tags?: string[];
// }

// export interface FAQSectionProps {
//   faqs: FAQ[]; 
//   title?: string;
//   subtitle?: string;
//   showSearch?: boolean;
//   contactInfo?: {
//     phone?: string;
//     email?: string;
//   };
//   onContactUs?: () => void;
//   className?: string;
// }

// const FAQStatic: React.FC<FAQSectionProps> = ({
//   faqs,
//   title = "Frequently Asked Questions",
//   // subtitle = "Find answers to common questions.",
//   // showSearch = true,
//   contactInfo,
//   onContactUs,
//   className = ""
// }) => {
//   const [openFAQ, setOpenFAQ] = useState<number | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const toggleFAQ = (id: number) => {
//     setOpenFAQ(openFAQ === id ? null : id);
//   };

//   // fallback to empty array to avoid runtime errors
//   const filteredFAQs = (faqs || []).filter(faq =>
//     faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     faq.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   return (
//     <section className={`py-20 bg-gradient-to-br from-gray-50 to-white ${className}`}>
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
//           {/* <p className="text-lg text-gray-600">{subtitle}</p> */}
//         </div>

//         <div className="space-y-4">
//           {filteredFAQs.length === 0 ? (
//             <div className="text-center text-gray-500 py-12">
//               <Search className="w-10 h-10 mx-auto mb-4" />
//               No FAQs found.
//             </div>
//           ) : (
//             filteredFAQs.map(faq => (
//               <div key={faq.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
//                 <button
//                   onClick={() => toggleFAQ(faq.id)}
//                   className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
//                 >
//                   <span className="text-lg font-medium text-gray-900">{faq.question}</span>
//                   <ChevronDown
//                     className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''}`}
//                   />
//                 </button>
//                 {openFAQ === faq.id && (
//                   <div className="px-6 pb-6 text-gray-700">
//                     <p>{faq.answer}</p>
//                     {faq.tags && faq.tags.length > 0 && (
//                       <div className="mt-4 flex flex-wrap gap-2">
//                         {faq.tags.map((tag, i) => (
//                           <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">#{tag}</span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         {contactInfo && (contactInfo.phone || contactInfo.email) && (
//           <div className="mt-16 text-center bg-orange-500 text-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
//             <h3 className="text-xl font-bold mb-4">Still need help?</h3>
//             <p className="mb-6 text-orange-100">Our team is here to support you. Reach out anytime.</p>
//             <div className="space-y-2 text-sm">
//               {contactInfo.phone && (
//                 <div className="flex items-center justify-center gap-2">
//                   <Phone className="w-4 h-4" /> {contactInfo.phone}
//                 </div>
//               )}
//               {contactInfo.email && (
//                 <div className="flex items-center justify-center gap-2">
//                   <Mail className="w-4 h-4" /> {contactInfo.email}
//                 </div>
//               )}
//             </div>
//             {onContactUs && (
//               <button
//                 onClick={onContactUs}
//                 className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition"
//               >
//                 <MessageCircle className="w-4 h-4" />
//                 Contact Us
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FAQStatic;


'use client'

import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, Phone, Mail } from 'lucide-react';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  tags?: string[];
}

export interface FAQSectionProps {
  faqs?: FAQ[]; 
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  onContactUs?: () => void;
  className?: string;
}

const FAQStatic: React.FC<FAQSectionProps> = ({
  faqs = [],
  title = "Frequently Asked Questions",
  subtitle,
  showSearch = true,
  contactInfo,
  onContactUs,
  className = ""
}) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // Safe filtering with null checks
  const filteredFAQs = faqs.filter(faq =>
    (faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
    (faq.answer?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
    (faq.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ?? false)
  );

  return (
    <section className={`py-20 bg-gradient-to-br from-gray-50 to-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>

        {showSearch && (
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <Search className="w-10 h-10 mx-auto mb-4" />
              No FAQs found.
            </div>
          ) : (
            filteredFAQs.map(faq => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-6 text-gray-700">
                    <p>{faq.answer}</p>
                    {faq.tags && faq.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {faq.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {contactInfo && (contactInfo.phone || contactInfo.email) && (
          <div className="mt-16 text-center bg-orange-500 text-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Still need help?</h3>
            <p className="mb-6 text-orange-100">Our team is here to support you. Reach out anytime.</p>
            <div className="space-y-2 text-sm">
              {contactInfo.phone && (
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> {contactInfo.phone}
                </div>
              )}
              {contactInfo.email && (
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" /> {contactInfo.email}
                </div>
              )}
            </div>
            {onContactUs && (
              <button
                onClick={onContactUs}
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Us
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQStatic;
