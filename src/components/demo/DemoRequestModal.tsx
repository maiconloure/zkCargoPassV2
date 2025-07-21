import React, { useState } from 'react';
import { X, User, Building, Mail, Phone, Calendar, Check, AlertCircle } from 'lucide-react';
interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const DemoRequestModal = ({
  isOpen,
  onClose
}: DemoRequestModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    demoType: 'live',
    date: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  if (!isOpen) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!formData.name || !formData.email || !formData.company || !formData.date) {
      setError('Please fill in all required fields');
      return;
    }
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-10">
      <div className="relative w-full max-w-2xl p-6 bg-[#0a1929] border border-[#172b44] rounded-xl shadow-2xl m-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8badc9] hover:text-white">
          <X size={20} />
        </button>
        {!isSubmitted ? <>
            <div className="flex items-center mb-6">
              <div className="mr-3 bg-[#0055ff] rounded-md p-1">
                <Calendar size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Schedule a Demo</h2>
            </div>
            <p className="text-[#a9c1d9] mb-6">
              Experience how zkCargoPass can transform your customs document
              verification process. Fill out the form below and our team will
              contact you to schedule a personalized demo.
            </p>
            {error && <div className="mb-6 p-3 bg-red-900/30 border border-red-800/50 rounded-lg flex items-start gap-2">
                <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#a9c1d9] mb-1">
                    Full Name <span className="text-[#0055ff]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={18} className="text-[#8badc9]" />
                    </div>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-[#081624] border border-[#172b44] text-white rounded-lg block w-full pl-10 p-2.5 placeholder-[#8badc9]/70 focus:outline-none focus:ring-1 focus:ring-[#0055ff] focus:border-[#0055ff]" placeholder="John Smith" />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#a9c1d9] mb-1">
                    Company <span className="text-[#0055ff]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Building size={18} className="text-[#8badc9]" />
                    </div>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="bg-[#081624] border border-[#172b44] text-white rounded-lg block w-full pl-10 p-2.5 placeholder-[#8badc9]/70 focus:outline-none focus:ring-1 focus:ring-[#0055ff] focus:border-[#0055ff]" placeholder="Your Company" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#a9c1d9] mb-1">
                    Email <span className="text-[#0055ff]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail size={18} className="text-[#8badc9]" />
                    </div>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-[#081624] border border-[#172b44] text-white rounded-lg block w-full pl-10 p-2.5 placeholder-[#8badc9]/70 focus:outline-none focus:ring-1 focus:ring-[#0055ff] focus:border-[#0055ff]" placeholder="you@company.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#a9c1d9] mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone size={18} className="text-[#8badc9]" />
                    </div>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="bg-[#081624] border border-[#172b44] text-white rounded-lg block w-full pl-10 p-2.5 placeholder-[#8badc9]/70 focus:outline-none focus:ring-1 focus:ring-[#0055ff] focus:border-[#0055ff]" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="demoType" className="block text-sm font-medium text-[#a9c1d9] mb-1">
                  Demo Type <span className="text-[#0055ff]">*</span>
                </label>
                <select id="demoType" name="demoType" value={formData.demoType} onChange={handleChange} className="bg-[#081624] border border-[#172b44] text-white rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#0055ff] focus:border-[#0055ff]">
                  <option value="live">
                    Live Demo with Product Specialist
                  </option>
                  <option value="recorded">Recorded Demo + Q&A Session</option>
                  <option value="custom">Custom Demo for Enterprise</option>
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-[#a9c1d9] mb-1">
                  Preferred Date <span className="text-[#0055ff]">*</span>
                </label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="bg-[#081624] border border-[#172b44] text-white rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-[#0055ff] focus:border-[#0055ff]" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#a9c1d9] mb-1">
                  Additional Information
                </label>
                <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange} className="bg-[#081624] border border-[#172b44] text-white rounded-lg block w-full p-2.5 placeholder-[#8badc9]/70 focus:outline-none focus:ring-1 focus:ring-[#0055ff] focus:border-[#0055ff]" placeholder="Tell us about your specific needs or questions"></textarea>
              </div>
              <div className="pt-4">
                <button type="submit" disabled={isLoading} className={`w-full py-3 rounded-lg font-medium flex justify-center ${isLoading ? 'bg-[#0055ff]/70 text-white/70 cursor-not-allowed' : 'bg-[#0055ff] hover:bg-[#0044cc] text-white'}`}>
                  {isLoading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : 'Schedule Demo'}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-xs text-[#6d8fb5]">
                By submitting this form, you agree to our{' '}
                <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  Privacy Policy
                </a>
              </p>
            </div>
          </> : <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <Check size={32} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Demo Request Submitted!
            </h2>
            <p className="text-[#a9c1d9] mb-6 max-w-md mx-auto">
              Thank you for your interest in zkCargoPass. One of our product
              specialists will contact you within 24 hours to confirm your demo
              appointment.
            </p>
            <button onClick={onClose} className="bg-[#0055ff] hover:bg-[#0044cc] text-white px-6 py-2.5 rounded-lg font-medium">
              Return to Homepage
            </button>
          </div>}
      </div>
    </div>;
};