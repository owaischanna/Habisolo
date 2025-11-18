"use client";

import { useState } from "react";
import { X, Home, Shield, Users } from "lucide-react";
import SignInForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("signin");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* RESPONSIVE FIXES: 
         1. max-w-[95%] -> Fits mobile screens.
         2. md:max-w-2xl -> Made wider for desktop (changed from md:max-w-lg)
         3. max-h-[90vh] -> Prevents modal from being taller than screen.
         4. flex flex-col -> Enables sticky footers inside children to work.
      */}
      <div
        className="bg-white rounded-xl w-full max-w-[95%] sm:max-w-md md:max-w-2xl shadow-xl relative transform animate-in zoom-in duration-300 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400 z-20"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 group border border-gray-200"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
        </button>

        {/* Header Section (Fixed at top) */}
        <div className="relative z-10 shrink-0 bg-white">
          <div className="text-center pt-6 pb-4 px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Welcome to <span className="text-green-600">Habisolo</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mx-6 mb-1">
            <button
              onClick={() => setActiveTab("signin")}
              className={`flex-1 py-3 text-sm font-medium transition-all duration-300 relative ${
                activeTab === "signin"
                  ? "text-green-600"
                  : "text-gray-500 hover:text-green-500"
              }`}
            >
              Sign In
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 transition-transform duration-300 ${
                activeTab === "signin" ? "scale-x-100" : "scale-x-0"
              }`}></span>
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 text-sm font-medium transition-all duration-300 relative ${
                activeTab === "signup"
                  ? "text-green-600"
                  : "text-gray-500 hover:text-green-500"
              }`}
            >
              New Account
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 transition-transform duration-300 ${
                activeTab === "signup" ? "scale-x-100" : "scale-x-0"
              }`}></span>
            </button>
          </div>
        </div>

        {/* Dynamic Form Area - Responsive & Scrollable */}
        {/* Added 'flex-1 overflow-hidden' so the SignUpForm takes remaining space 
           and handles its own internal scrolling 
        */}
        <div className="flex-1 overflow-hidden relative flex flex-col w-full">
          {activeTab === "signin" ? (
            <div className="p-6 overflow-y-auto">
               <SignInForm switchToSignUp={() => setActiveTab("signup")} />
            </div>
          ) : (
            <SignUpForm switchToSignIn={() => setActiveTab("signin")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;