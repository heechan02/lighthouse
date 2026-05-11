import { createContext, useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import type { UserProfile } from '@/mocks/user'
import { getProfile } from '@/lib/api'
import TopNav from './TopNav'
import BottomNav from './BottomNav'

export const UserContext = createContext<UserProfile | null>(null)

export function useUser() {
  return useContext(UserContext)
}

export default function AppShell() {
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    getProfile().then(setUser)
  }, [])

  return (
    <UserContext.Provider value={user}>
      <div className="min-h-screen bg-background flex flex-col">
        <TopNav />
        <main className="flex-1 pb-16 md:pb-0">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </UserContext.Provider>
  )
}
