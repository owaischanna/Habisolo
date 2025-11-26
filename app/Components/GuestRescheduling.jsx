"use client";

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Calendar, 
  Clock, 
  User, 
  Briefcase, 
  Star, 
  AlertCircle, 
  Edit,
  CheckCircle2,
  Circle,
  ArrowLeft,
  CheckCircle,MessageSquare
} from 'lucide-react';

// Adjust these import paths based on your actual project structure
import HostSidebar from './HostSidebar';
import HostHeader from './HostHeader';

export default function GuestRescheduling() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get the application ID from the URL
  const applicationId = searchParams.get('id');

  const [selectedDate, setSelectedDate] = useState('2024-10-30');
  const [selectedSlot, setSelectedSlot] = useState('afternoon'); 
  const [customStart, setCustomStart] = useState('15:00');
  const [customEnd, setCustomEnd] = useState('17:00');
  const [reason, setReason] = useState('');

  // Helper to determine slot styles
  const getSlotStyle = (slotName) => {
    if (selectedSlot === slotName) {
      return "border-green-500 bg-green-50 ring-1 ring-green-500";
    }
    return "border-gray-200 hover:border-gray-300 bg-white";
  };

  // Helper to render radio circle
  const renderRadioIcon = (slotName) => {
    if (selectedSlot === slotName) {
      return <CheckCircle2 className="w-6 h-6 text-green-600 fill-current" />;
    }
    return <Circle className="w-6 h-6 text-gray-300" />;
  };

  const handleConfirm = () => {
    // 1. Validation
    if (!selectedDate) {
      toast.error("Please select a new check-in date.");
      return;
    }

    if (selectedSlot === 'custom' && (!customStart || !customEnd)) {
      toast.error("Please specify both start and end times for the custom slot.");
      return;
    }

    if (!reason.trim()) {
      toast.error("Please provide a reason for rescheduling.");
      return;
    }

    // 2. Success Logic
    // Here you would typically send the data to your backend
    console.log("Rescheduling App ID:", applicationId);
    console.log("New Date:", selectedDate);
    console.log("Time Slot:", selectedSlot);
    console.log("Reason:", reason);
    
    toast.success("Reschedule request submitted successfully!");

    // 3. Redirect after a short delay to allow the user to read the toast
    setTimeout(() => {
      router.push('/host/check-ins'); 
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Sidebar */}
      <HostSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HostHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Back Button */}
            <button 
              onClick={() => router.back()} 
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Check-ins
            </button>

            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Reschedule Check-in</h1>

            {/* 1. Important Reminder Alert */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex flex-col sm:flex-row items-start gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-yellow-800 font-semibold text-sm mb-1">Important Reminder</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  Rescheduling check-in times may affect your guest's travel plans. Please coordinate with your guest before making changes and provide adequate notice to avoid any inconvenience.
                </p>
              </div>
            </div>

            {/* 2. Guest Profile Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar - Centered on mobile, left on desktop */}
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" 
                    alt="Alex Kim" 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-gray-50"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                    <div className="w-full">
                      <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold text-gray-900">Alex Kim</h2>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4 text-sm text-gray-500 mt-1 mb-4">
                          <span className="flex items-center gap-1"><Briefcase size={14} /> Student</span>
                          <span className="flex items-center gap-1"><User size={14} /> 24 years old</span>
                          <span className="flex items-center gap-1 text-orange-500"><Star size={14} /> New Guest</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-4 md:border-t-0 md:pt-0">
                        <h3 className="font-bold text-gray-800 text-center md:text-left">Modern Studio Apartment</h3>
                        <p className="text-gray-500 text-sm mb-4 text-center md:text-left">Williamsburg, Cantabria</p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div className="text-center sm:text-left">
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Scheduled Time</p>
                            <p className="text-blue-600 font-medium flex items-center justify-center sm:justify-start gap-1">
                              <Clock size={14} /> 2:00 PM - 4:00 PM
                            </p>
                          </div>
                          <div className="text-center sm:text-left">
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Contact</p>
                            <p className="font-medium text-gray-800">+1 (555) 123-4567</p>
                          </div>
                          <div className="text-center sm:text-left">
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Lease Period</p>
                            <p className="font-medium text-gray-800">Oct 28 - Oct 28, 2025</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side Status */}
                    <div className="w-full lg:w-auto flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-end gap-4 mt-2 lg:mt-0 lg:pl-6 lg:border-l border-gray-100 lg:min-h-[140px]">
                      <div className="text-left lg:text-right">
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                          Check-in Today
                        </span>
                        <div className="mt-2 hidden sm:block">
                          <p className="text-green-600 font-bold text-lg">€950/month</p>
                          <p className="text-xs text-gray-500">12 month lease</p>
                        </div>
                      </div>
                      <button className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 justify-center w-full sm:w-auto transition-colors">
                        <MessageSquare size={16} /> <span className="hidden sm:inline">Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Rescheduling Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Clock className="text-blue-600" size={20} />
                  New Check-in Time
                </h3>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">Required</span>
              </div>

              {/* Date Picker */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select new check-in date:</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 pl-4 text-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition-shadow"
                  />
                </div>
              </div>

              {/* Time Selection Radio Cards */}
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-gray-700">Select new check-in time:</p>

                {/* Option 1: Morning */}
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${getSlotStyle('morning')}`}>
                  <input 
                    type="radio" 
                    name="timeSlot" 
                    value="morning" 
                    checked={selectedSlot === 'morning'} 
                    onChange={() => setSelectedSlot('morning')}
                    className="hidden" 
                  />
                  {renderRadioIcon('morning')}
                  <div>
                    <p className="font-semibold text-gray-800 text-sm md:text-base">Morning Check-in</p>
                    <p className="text-xs md:text-sm text-gray-500">10:00 AM - 12:00 PM</p>
                  </div>
                </label>

                {/* Option 2: Afternoon (Standard) */}
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${getSlotStyle('afternoon')}`}>
                  <input 
                    type="radio" 
                    name="timeSlot" 
                    value="afternoon" 
                    checked={selectedSlot === 'afternoon'} 
                    onChange={() => setSelectedSlot('afternoon')}
                    className="hidden" 
                  />
                  {/* Using Green Circle for checked state manually to match screenshot style */}
                  {selectedSlot === 'afternoon' ? (
                     <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                       <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                     </div>
                  ) : <Circle className="w-6 h-6 text-gray-300 flex-shrink-0" />}
                  
                  <div>
                    <p className={`font-semibold text-sm md:text-base ${selectedSlot === 'afternoon' ? 'text-green-800' : 'text-gray-800'}`}>
                      Afternoon Check-in (Standard)
                    </p>
                    <p className={`text-xs md:text-sm ${selectedSlot === 'afternoon' ? 'text-green-700' : 'text-gray-500'}`}>
                      2:00 PM - 4:00 PM
                    </p>
                  </div>
                </label>

                {/* Option 3: Evening */}
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${getSlotStyle('evening')}`}>
                  <input 
                    type="radio" 
                    name="timeSlot" 
                    value="evening" 
                    checked={selectedSlot === 'evening'} 
                    onChange={() => setSelectedSlot('evening')}
                    className="hidden" 
                  />
                  {renderRadioIcon('evening')}
                  <div>
                    <p className="font-semibold text-gray-800 text-sm md:text-base">Evening Check-in</p>
                    <p className="text-xs md:text-sm text-gray-500">6:00 PM - 8:00 PM</p>
                  </div>
                </label>

                {/* Option 4: Custom */}
                <label className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${getSlotStyle('custom')}`}>
                  <div className="flex items-center gap-4">
                    <input 
                      type="radio" 
                      name="timeSlot" 
                      value="custom" 
                      checked={selectedSlot === 'custom'} 
                      onChange={() => setSelectedSlot('custom')}
                      className="hidden" 
                    />
                    {renderRadioIcon('custom')}
                    <p className="font-semibold text-gray-800 text-sm md:text-base">Custom Time</p>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:ml-auto mt-2 sm:mt-0">
                    <input 
                      type="time" 
                      value={customStart}
                      disabled={selectedSlot !== 'custom'}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 text-sm text-gray-600 focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
                    />
                    <span className="text-gray-400 text-sm">to</span>
                    <input 
                      type="time" 
                      value={customEnd}
                      disabled={selectedSlot !== 'custom'}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 text-sm text-gray-600 focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
                    />
                  </div>
                </label>
              </div>

              {/* Updated Schedule Summary */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-blue-600 font-medium mb-1 text-sm">Updated Check-in Schedule:</p>
                  <p className="text-xs text-blue-500 font-semibold uppercase">New Check-in Time</p>
                </div>
                <p className="text-blue-700 font-bold text-base md:text-lg text-right">
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'} 
                  <span className="block sm:inline sm:ml-2">
                    {selectedSlot === 'morning' && '10:00 AM - 12:00 PM'}
                    {selectedSlot === 'afternoon' && '2:00 PM - 4:00 PM'}
                    {selectedSlot === 'evening' && '6:00 PM - 8:00 PM'}
                    {selectedSlot === 'custom' && `${customStart} - ${customEnd}`}
                  </span>
                </p>
              </div>

              {/* Reason Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Edit className="text-blue-600" size={20} />
                    Reason for Rescheduling
                  </h3>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">Required</span>
                </div>
                <textarea 
                  rows={4}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm md:text-base"
                  placeholder="Please explain why the check-in time needs to be changed..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
                <p className="text-xs text-gray-500 mt-2 text-right">This will be sent to the guest.</p>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-8">
                <button 
                  onClick={() => router.back()}
                  className="px-6 py-3 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto text-center"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirm}
                  className="px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-sm w-full sm:w-auto text-center"
                >
                  Confirm Reschedule
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}