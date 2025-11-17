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
  // Updated FAQ data according to the image
  const faqs = [
    {
      question: 'What Is Habisolo?',
      answer: 'Habisolo Is A Trusted Housing Platform That Connects Seniors With Space Rooms To Students And Young Professionals Seeking Affordable Housing.',
    },
    {
      question: 'Is It Safe?',
      answer: 'All Users Are Verified, Payments Are Secure, And Reviews Are Transparent.',
    },
    {
      question: 'How Much Does It Cost?',
      answer: 'Guests Pay Rent + A Small Service Fee. Hosts Earn Income After A Service Commission.',
    },
    {
      question: "What If There's Damage?",
      answer: 'Guests Can Choose Refundable Deposits Or Optional Insurance Protection.',
    },
    {
      question: 'Where Is Habisolo Available?',
      answer: 'We Are Rolling Out In Spain\'s Main Student Hubs: Malaga, Granada, Valencia, Madrid, And Barcelona.',
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