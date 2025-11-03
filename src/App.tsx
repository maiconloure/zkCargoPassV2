import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import { AboutUs } from './components/AboutUs'
import { LoginModal } from './components/auth/LoginModal'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Dashboard } from './components/dashboard/Dashboard'
import { DemoRequestModal } from './components/demo/DemoRequestModal'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Partnerships } from './components/Partnerships'
import { Pricing } from './components/Pricing'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'

const AppContent = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false)
    navigate('/dashboard')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary transition-colors duration-300">
            <Header
              onOpenLogin={() => setIsLoginModalOpen(true)}
              onOpenDemo={() => setIsDemoModalOpen(true)}
            />
            <main className="w-full">
              <Hero onOpenLogin={() => setIsLoginModalOpen(true)} />
              <Features />
              <HowItWorks />
              <Partnerships />
              <Pricing />
            </main>
            <Footer />
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
              onSuccess={handleLoginSuccess}
            />
            <DemoRequestModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
          </div>
        }
      />
      <Route path="/about" element={<AboutUs />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}
