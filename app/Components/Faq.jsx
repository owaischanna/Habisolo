// "use client";
// import React, { useState } from 'react';
// import { Plus, Minus, ThumbsUp, ThumbsDown } from 'lucide-react';

// // --- Reusable FAQ Item Component (Accordion) ---
// const FAQItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className={`border border-green-200 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
//       isOpen ? 'bg-green-600' : 'bg-white'
//     }`}>
//       {/* Question Button - Hidden when open */}
//       <button
//         className={`flex justify-between items-center w-full p-5 text-left focus:outline-none transition-all duration-500 ${
//           isOpen ? 'hidden' : 'block'
//         }`}
//         onClick={() => setIsOpen(true)}
//         aria-expanded={isOpen}
//       >
//         <span className="text-lg font-medium text-gray-800">{question}</span>
//         <div className="p-1 rounded-full text-white bg-green-700 transition-colors duration-300">
//           <Plus className="w-5 h-5" />
//         </div>
//       </button>

//       {/* Answer Section - Shows when open */}
//       <div className={`transition-all duration-500 ease-in-out ${
//         isOpen ? 'block' : 'hidden'
//       }`}>
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-4">
//             <div className="flex-1">
//               <p className="text-white leading-relaxed text-lg">
//                 {answer}
//               </p>
//             </div>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="ml-4 p-1 rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors duration-300 flex-shrink-0"
//             >
//               <Minus className="w-5 h-5" />
//             </button>
//           </div>
          
//           {/* Helpful question section */}
//           <div className="mt-6 pt-4 border-t border-green-200">
//             <p className="text-white font-medium mb-3">Was This Content Helpful?</p>
//             <div className="flex space-x-3">
//               <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-700 transition-colors duration-200">
//                 <ThumbsUp className="w-5 h-5" />
//               </button>
//               <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition-colors duration-200">
//                 <ThumbsDown className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Main FAQ Section Component ---
// const FAQSection = () => {
//   // Updated FAQ data according to the image
//   const faqs = [
//     {
//       question: 'What is Habisolo?',
//       answer: 'Habisolo is a trusted housing platform that connects seniors with space rooms to students and young professionals seeking affordable housing.',
//     },
//     {
//       question: 'Is it Safe?',
//       answer: 'All users are Verified, Payments are Secure, and Reviews are Transparent.',
//     },
//     {
//       question: 'How much does it Cost?',
//       answer: 'Guests pay rent + a Small Service Fee. Hosts Earn Income After a Service Commission.',
//     },
//     {
//       question: "What if there's Damage?",
//       answer: 'Guests can choose Refundable Deposits or Optional Insurance Protection.',
//     },
//     {
//       question: 'Where is Habisolo available?',
//       answer: 'We are Rolling out in Spain\'s Main Student Hubs: Malaga, Granada, Valencia, Madrid, And Barcelona.',
//     },
//   ];

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
//           FREQUENTLY ASKED QUESTIONS (FAQ)
//         </h2>
        
//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <FAQItem 
//               key={index}
//               question={faq.question}
//               answer={faq.answer}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQSection;

"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// --- Reusable FAQ Item Component (Accordion) ---
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-green-200 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        className="flex justify-between items-center w-full p-5 text-left bg-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <div className={`p-1 rounded-full text-white transition-colors duration-300 ${isOpen ? 'bg-red-500' : 'bg-green-600'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="p-5 pt-0 text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main FAQ Section Component ---
const FAQSection = () => {
  // Static data for the FAQ content
  const faqs = [
    {
      question: 'What is Habisolo?',
      answer: 'Habisolo is a human-centered housing platform that connects elderly homeowners with international students and young professionals seeking affordable, meaningful accommodation in shared homes.',
    },
    {
      question: 'Is it Safe?',
      answer: 'Safety is our top priority. All users (both hosts and guests) go through a thorough ID verification process. We also offer secure payment systems and insurance options for peace of mind.',
    },
    {
      question: 'How much does it Cost?',
      answer: 'The cost varies based on location, room size, and duration. For students/professionals, we offer competitive, all-inclusive pricing. For hosts, listing a space is free, and we take a small, transparent service fee upon a successful match.',
    },
    {
      question: "What if there's Damage?",
      answer: "We commit to transparent insurance options and a clear protocol for handling damages. This includes a security deposit and a mediation service to ensure fair resolution for both the host and the guest.",
    },
    {
      question: 'Where is Habisolo Available?',
      answer: 'Currently, habisolo is primarily focused on connecting communities across major cities in Spain. We are rapidly expanding and plan to launch in other European countries soon!',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          FREQUENTLY ASKED QUESTIONS (FAQ)
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;