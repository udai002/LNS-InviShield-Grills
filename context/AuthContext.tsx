// context/AuthContext.tsx
'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface IAdmin {
  id: string
  email: string
  username: string
}

interface IAuthContext {
  admin: IAdmin | null
  token: string | null
  appLoading: boolean
  error: string | null
  clearError: () => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<IAuthContext | null>(null)

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin]       = useState<IAdmin | null>(null)
  const [token, setToken]       = useState<string | null>(null)
  const [appLoading, setAppLoading] = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token')
    const storedAdmin = localStorage.getItem('admin_user')

    if (storedToken && storedAdmin) {
      try {
        setToken(storedToken)
        setAdmin(JSON.parse(storedAdmin))
      } catch {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
      }
    }

    setAppLoading(false)
  }, [])

  const clearError = () => setError(null)

  // ── Login — returns true on success, false on failure ────────────────────
  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null)

    try {
      const res = await fetch(`/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed. Please try again.')
        return false
      }

      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_user', JSON.stringify(data.admin))

      setToken(data.token)
      setAdmin(data.admin)

      return true

    } catch {
      setError('Network error. Please check your connection.')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setToken(null)
    setAdmin(null)
    setError(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ admin, token, appLoading, error, clearError, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}