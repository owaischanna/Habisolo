"use client";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useState } from "react";
import toast from 'react-hot-toast';
import { Mail, Lock, User, MapPin, Phone, Calendar, Users, Briefcase, Eye, EyeOff, Check, X } from "lucide-react";

// --- Inlined RoleSelection Component ---
const RoleSelection = ({ onClose, onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'Renter',
      title: 'Tenant',
      description: 'I am looking for a place to rent.',
      icon: <User className="w-8 h-8 text-green-600" />,
    },
    {
      id: 'Landlord',
      title: 'Landlord',
      description: 'I want to list my property.',
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Select Account Type</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4 mb-8">
            {roles.map((role) => (
              <div 
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-4 ${
                  selectedRole === role.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                }`}
              >
                <div className={`p-3 rounded-full ${selectedRole === role.id ? 'bg-white' : 'bg-gray-100'}`}>
                  {role.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{role.title}</h4>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
                {selectedRole === role.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main SignUpForm Component ---
const SignUpForm = ({ switchToSignIn }) => {
  const [step, setStep] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    currentLocation: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password.");
      return;
    }
    setStep("personal");
  };

  const handlePersonalInfoContinue = () => {
    const { firstName, lastName, country, phoneNumber, dateOfBirth, currentLocation, occupation } = formData;
    if (!firstName || !lastName || !country || !phoneNumber || !dateOfBirth || !currentLocation || !occupation) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setStep("role");
  };

  const handleRoleSelectAndSubmit = async (role) => {
    setLoading(true);
    setError(null);

    const finalData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: role,
      country: formData.country,
      phone: formData.phoneNumber,
      gender: formData.gender,
      currentLocation: formData.currentLocation,
      renterBasic: {
        dateOfBirth: formData.dateOfBirth,
      },
      renterAbout: {
        occupation: formData.occupation,
        isStudent: formData.occupation === 'Student'
      }
    };

    const loadingToastId = toast.loading('Creating your account...');

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "An error occurred during signup.");
      }

      toast.success('Account created! Please sign in.', { id: loadingToastId });
      switchToSignIn();
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message);
      toast.error(err.message, { id: loadingToastId });
      setLoading(false);
      return false;
    }
  };

  const handleCloseRoleSelection = () => {
    setStep("personal");
  };

  return (
    <>
      {step === "role" && (
        <RoleSelection
          onClose={handleCloseRoleSelection}
          onRoleSelect={handleRoleSelectAndSubmit}
        />
      )}

      {/* ==================================================
      STEP 2: PERSONAL (Mobile Layout Fix)
      ================================================== */}
      {step === "personal" ? (
        <div className="flex flex-col h-full w-full max-w-full overflow-hidden relative bg-white">
          
          {/* Header: Fixed at top, never shrinks */}
          <div className="shrink-0 z-20 bg-white pt-3 sm:pt-4 pb-2 border-b border-gray-100 shadow-sm px-4 sm:px-6">
            <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center mb-1">
              Personal Information
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center">
              Tell us a bit about yourself.
            </p>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto min-h-0 w-full overscroll-contain px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 pb-24">
            <h4 className="text-sm sm:text-md font-semibold text-gray-800 border-b pb-2">Basic Information</h4>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">First Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-8 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Last Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-8 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Email (Read-only) */}
            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-8 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm bg-gray-100 cursor-not-allowed outline-none"
                />
              </div>
            </div>

            {/* Country & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Country *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-8 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-8 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400"
                  />
                </div>
              </div>
            </div>

            <h4 className="text-sm sm:text-md font-semibold text-gray-800 border-b pb-2 pt-3 sm:pt-4">Personal Details</h4>

            {/* Date of Birth & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Date of Birth *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    className="w-full border border-gray-300 rounded-lg px-8 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Gender (Optional)</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-8 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400 appearance-none"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Current Location */}
            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Current Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                <input
                  type="text"
                  placeholder="Enter your current city and state"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-8 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400"
                />
              </div>
            </div>

            <h4 className="text-sm sm:text-md font-semibold text-gray-800 border-b pb-2 pt-3 sm:pt-4">Occupation & Status</h4>

            {/* Occupation */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">I am a... *</label>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                {['Student', 'Working Professional', 'Other'].map((occ) => (
                  <label key={occ} className="flex-1 min-w-0">
                    <input
                      type="radio"
                      name="occupation"
                      value={occ}
                      checked={formData.occupation === occ}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`cursor-pointer border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center font-medium transition-all whitespace-nowrap overflow-hidden text-ellipsis ${
                        formData.occupation === occ
                          ? 'border-green-500 bg-green-50 text-green-700 ring-2 ring-green-500'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {occ}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* FIXED FOOTER */}
          <div className="shrink-0 z-50 bg-white p-3 sm:p-4 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] w-full">
            <button
              onClick={handlePersonalInfoContinue}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold hover:from-green-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs sm:text-sm">Processing...</span>
                </div>
              ) : (
                "Continue to Role Selection"
              )}
            </button>
          </div>
        </div>

      ) : step === "signup" ? (
        <div className="flex flex-col h-full w-full max-w-full overflow-hidden relative bg-white">
          {/* Header */}
          <div className="shrink-0 z-20 bg-white pt-3 sm:pt-4 pb-2 border-b border-gray-100 shadow-sm px-4 sm:px-6">
            <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto min-h-0 w-full overscroll-contain px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 pb-24">
            {/* Email */}
            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-8 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400"
                />
              </div>
            </div>

            {/* Password - With Toggle */}
            <div className="relative mt-3">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-8 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 hover:border-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center pt-3 sm:pt-4">
              <p className="text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={switchToSignIn}
                  className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors duration-200"
                >
                  Sign In
                </button>
              </p>
            </div>

            {/* Terms */}
            <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
              <p className="text-xs text-gray-500 text-center leading-4 sm:leading-5">
                By signing up, you agree to our{" "}
                <span className="text-green-600 cursor-pointer hover:underline font-medium">
                  Terms and Conditions
                </span>
                . Learn how we use your data in our{" "}
                <span className="text-green-600 cursor-pointer hover:underline font-medium">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="shrink-0 z-50 bg-white p-3 sm:p-4 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] w-full">
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold hover:from-green-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs sm:text-sm">Checking...</span>
                </div>
              ) : (
                "Continue to Personal Info"
              )}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SignUpForm;