import { type IProvider, WEB3AUTH_NETWORK, Web3Auth, type Web3AuthOptions } from '@web3auth/modal'
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

// Web3Auth configuration
export const web3AuthOptions: Web3AuthOptions = {
  clientId:
    'BAZLrXxnj16Nj024d7-2JW9qcXA8rir00eeiLivttPPtvhdRkfSFiQ6755pi-_uZLLozdy3m4xRESWKZogz-IR8',
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  uiConfig: {
    appName: 'zkCargoPass',
    theme: {
      primary: '#0364ff',
    },
    mode: 'auto',
    logoLight: 'https://web3auth.io/images/web3authlog.png',
    logoDark: 'https://web3auth.io/images/web3authlogodark.png',
    loginGridCol: 3,
    primaryButton: 'externalLogin',
  },
}

// Types
interface UserInfo {
  email?: string
  name?: string
  profileImage?: string
  aggregateVerifier?: string
  verifier?: string
  verifierId?: string
  typeOfLogin?: string
}

interface Web3AuthContextType {
  web3auth: Web3Auth | null
  provider: IProvider | null
  isLoading: boolean
  user: UserInfo | null
  isLoggedIn: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  getUserInfo: () => Promise<UserInfo | null>
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined)

export const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [provider, setProvider] = useState<IProvider | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true)
        const web3auth = new Web3Auth(web3AuthOptions)

        await web3auth.init()
        setWeb3auth(web3auth)

        if (web3auth.connected && web3auth.provider) {
          setProvider(web3auth.provider)
          setIsLoggedIn(true)
          try {
            const userInfo = await web3auth.getUserInfo()
            setUser(userInfo)
          } catch (err) {
            console.warn('Could not get user info:', err)
          }
        }
      } catch (error) {
        console.error('Error initializing Web3Auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [])

  const login = async () => {
    if (!web3auth) {
      console.error('Web3Auth not initialized')
      throw new Error('Web3Auth not initialized')
    }

    try {
      setIsLoading(true)
      console.log('Starting Web3Auth login...')
      const web3authProvider = await web3auth.connect()

      if (web3authProvider) {
        console.log('Web3Auth login successful, setting provider...')
        setProvider(web3authProvider)
        setIsLoggedIn(true)

        try {
          const userInfo = await web3auth.getUserInfo()
          console.log('User info retrieved:', userInfo)
          setUser(userInfo)
        } catch (userInfoError) {
          console.warn('Could not get user info:', userInfoError)
          // Set basic user info if getUserInfo fails
          setUser({ email: 'user@example.com', name: 'User' })
        }
        console.log('Web3Auth login process completed successfully')
      } else {
        throw new Error('Failed to connect to Web3Auth')
      }
    } catch (error) {
      console.error('Error during login:', error)
      setIsLoggedIn(false)
      setProvider(null)
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    if (!web3auth) {
      console.error('Web3Auth not initialized')
      return
    }

    try {
      setIsLoading(true)
      if (web3auth.connected) {
        await web3auth.logout()
      }
      setProvider(null)
      setUser(null)
      setIsLoggedIn(false)
    } catch (error) {
      console.error('Error during logout:', error)
      // Even if logout fails, clear the local state
      setProvider(null)
      setUser(null)
      setIsLoggedIn(false)
    } finally {
      setIsLoading(false)
    }
  }

  const getUserInfo = async (): Promise<UserInfo | null> => {
    if (!web3auth || !web3auth.connected) {
      return null
    }

    try {
      const userInfo = await web3auth.getUserInfo()
      return userInfo
    } catch (error) {
      console.error('Error getting user info:', error)
      return null
    }
  }

  const contextValue: Web3AuthContextType = {
    web3auth,
    provider,
    isLoading,
    user,
    isLoggedIn,
    login,
    logout,
    getUserInfo,
  }

  return <Web3AuthContext.Provider value={contextValue}>{children}</Web3AuthContext.Provider>
}

// Hook to use the context
export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext)
  if (context === undefined) {
    throw new Error('useWeb3Auth must be used within a Web3AuthProvider')
  }
  return context
}
