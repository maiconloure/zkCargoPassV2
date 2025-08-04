import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWeb3Auth } from '../../contexts/web3authContext'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, isLoading } = useWeb3Auth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      console.log('User not logged in, redirecting to home...')
      navigate('/')
    }
  }, [isLoggedIn, isLoading, navigate])

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-accent-primary dark:border-dark-accent-primary" />
      </div>
    )
  }

  // Don't render children if not logged in (will redirect)
  if (!isLoggedIn) {
    return null
  }

  return <>{children}</>
}
