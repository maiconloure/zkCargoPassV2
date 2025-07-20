import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Partnerships } from './components/Partnerships';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
export function App() {
  return <div className="min-h-screen bg-[#0a1929] text-white">
      <Header />
      <main className="w-full">
        <Hero />
        <Features />
        <HowItWorks />
        <Partnerships />
        <Pricing />
      </main>
      <Footer />
    </div>;
}