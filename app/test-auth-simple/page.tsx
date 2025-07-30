"use client"

import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export default function TestAuthSimplePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get current session
        const { data: { session: currentSession } } = await supabase.auth.getSession()
        console.log('Current session:', currentSession)
        setSession(currentSession)

        // Get current user
        const { data: { user: currentUser }, error } = await supabase.auth.getUser()
        console.log('Current user:', currentUser)
        console.log('Auth error:', error)
        setUser(currentUser)
      } catch (error) {
        console.error('Auth check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session)
      setUser(session?.user ?? null)
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error:', error)
      } else {
        console.log('Signed out successfully')
      }
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Auth Test (No Middleware)</h1>
      
      <div className="space-y-4">
        <div>
          <strong>User:</strong> {user ? 'Authenticated' : 'Not authenticated'}
        </div>
        
        {user && (
          <div>
            <strong>Email:</strong> {user.email}
          </div>
        )}
        
        <div>
          <strong>Session:</strong> {session ? 'Active' : 'No session'}
        </div>
        
        <div>
          <strong>Cookies:</strong> {document.cookie || 'No cookies'}
        </div>
        
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
} 