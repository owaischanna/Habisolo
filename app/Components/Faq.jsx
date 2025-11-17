"use client";
import React, { useState } from 'react';
import { Plus, Minus, ThumbsUp, ThumbsDown } from 'lucide-react';

// --- Reusable FAQ Item Component (Accordion) ---
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (value) => {
    setFeedback(value);
  };

  return (
    <div className={`border rounded-lg shadow-sm overflow-hidden transition-all duration-300 mb-4 ${
      isOpen ? 'border-green-600 bg-green-700' : 'border-gray-200 bg-white hover:shadow-md'
    }`}>
      <button
        className={`flex justify-between items-center w-full p-6 text-left focus:outline-none transition-colors duration-300 ${
          isOpen ? 'bg-green-700' : 'bg-white'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={`text-lg font-semibold transition-colors duration-300 ${
          isOpen ? 'text-white' : 'text-gray-900'
        }`}>
          {question}
        </span>
        <div className={`p-1 rounded-full transition-colors duration-300 ${
          isOpen ? 'bg-white text-green-700' : 'bg-green-600 text-white'
        }`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`p-6 pt-0 transition-colors duration-300 ${
          isOpen ? 'bg-green-700' : ''
        }`}>
          <p className={`leading-relaxed mb-4 transition-colors duration-300 ${
            isOpen ? 'text-white' : 'text-gray-600'
          }`}>
            {answer}
          </p>
          
          {/* Feedback Section */}
          <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-300 ${
            isOpen ? 'border-green-600' : 'border-gray-100'
          }`}>
            <span className={`text-sm transition-colors duration-300 ${
              isOpen ? 'text-green-100' : 'text-gray-500'
            }`}>
              Was This Content Helpful ?
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFeedback('yes')}
                className={`p-2 rounded-full transition-colors ${
                  feedback === 'yes' 
                    ? 'bg-green-600 text-white' 
                    : isOpen 
                    ? 'text-green-200 hover:bg-green-600 hover:text-white'
                    : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleFeedback('no')}
                className={`p-2 rounded-full transition-colors ${
                  feedback === 'no' 
                    ? 'bg-green-600 text-white' 
                    : isOpen 
                    ? 'text-green-200 hover:bg-green-600 hover:text-white'
                    : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          </div>
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            FREQUENTLY ASKED QUESTIONS (FAQ)
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to the most common questions about our platform
          </p>
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;