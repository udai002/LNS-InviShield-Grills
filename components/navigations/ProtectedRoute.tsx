// components/ProtectedRoute.tsx
'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { admin, appLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!appLoading && !admin) {
      router.replace('/login')
    }
  }, [admin, appLoading])

  if (appLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!admin) return null

  return <>{children}</>
}