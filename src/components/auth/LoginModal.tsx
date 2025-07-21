import React, { useState } from 'react';
import { X, Mail, Lock, AlertCircle } from 'lucide-react';
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const LoginModal = ({
  isOpen,
  onClose
}: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    // Simulate login request
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, just show an error
      setError('This is a demo. No actual login will occur.');
    }, 1500);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-[#0a1929] border border-[#172b44] rounded-xl shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8badc9] hover:text-white">
          <X size={20} />
        </button>
        <div className="flex items-center mb-6">
          <div className="mr-3 bg-[#0055ff] rounded-md p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 6L12 10L4 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 14L12 18L20 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Log in to zkCargoPass
          </h2>
        </div>
        {error && <div className="mb-6 p-3 bg-red-900/30 border border-red-800/50 rounded-lg flex items-start gap-2">
            <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#a9c1d9] mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail size={18} className="text-[#8badc9]" />
              </div>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-[#081624] border border-[#172b44] text-white rounded-lg block w-full pl-10 p-2.5 placeholder-[#8badc9]/70 focus:outline-none focus:ring-1 focus:ring-[#0055ff] focus:border-[#0055ff]" placeholder="you@company.com" />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-[#a9c1d9]">
                Password
              </label>
              <a href="#" className="text-xs text-[#0055ff] hover:text-[#4d8bff]">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} className="text-[#8badc9]" />
              </div>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-[#081624] border border-[#172b44] text-white rounded-lg block w-full pl-10 p-2.5 placeholder-[#8badc9]/70 focus:outline-none focus:ring-1 focus:ring-[#0055ff] focus:border-[#0055ff]" placeholder="••••••••" />
            </div>
          </div>
          <div className="flex items-center">
            <input id="remember-me" type="checkbox" className="w-4 h-4 bg-[#081624] border-[#172b44] rounded focus:ring-[#0055ff] focus:ring-1" />
            <label htmlFor="remember-me" className="ml-2 text-sm text-[#a9c1d9]">
              Remember me for 30 days
            </label>
          </div>
          <button type="submit" disabled={isLoading} className={`w-full py-2.5 rounded-lg font-medium flex justify-center ${isLoading ? 'bg-[#0055ff]/70 text-white/70 cursor-not-allowed' : 'bg-[#0055ff] hover:bg-[#0044cc] text-white'}`}>
            {isLoading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> : 'Log in'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-[#8badc9]">
            Don't have an account?{' '}
            <a href="#" className="text-[#0055ff] hover:text-[#4d8bff] font-medium">
              Sign up
            </a>
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-[#172b44] text-center">
          <p className="text-xs text-[#6d8fb5]">
            By logging in, you agree to our{' '}
            <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>;
};