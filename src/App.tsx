
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Partnerships } from './components/Partnerships';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { useState, useEffect } from 'react';
import { LoginModal } from './components/auth/LoginModal';
import { DemoRequestModal } from './components/demo/DemoRequestModal';
import { Dashboard } from './components/dashboard/Dashboard';

export function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-[#0a1929] text-white">
              <Header
                onOpenLogin={() => setIsLoginModalOpen(true)}
                onOpenDemo={() => setIsDemoModalOpen(true)}
              />
              <main className="w-full">
                <Hero />
                <Features />
                <HowItWorks />
                <Partnerships />
                <Pricing />
              </main>
              <Footer />
              <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
              <DemoRequestModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
            </div>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}