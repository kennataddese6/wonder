"use client"

import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export default function TestAuthPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [cookies, setCookies] = useState<string>('')

  useEffect(() => {
    const checkUser = async () => {
      console.log('TestAuth - Checking user...')
      const { data: { user }, error } = await supabase.auth.getUser()
      console.log('TestAuth - User result:', { user: !!user, error })
      setUser(user)
      setCookies(document.cookie)
      setLoading(false)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('TestAuth - Auth state changed:', event, session?.user?.email)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignIn = async () => {
    console.log('TestAuth - Manual sign in attempt')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    console.log('TestAuth - Manual sign in result:', { data, error })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Auth Page (No Middleware)</h1>
      <div className="space-y-4">
        <div>
          <strong>User:</strong> {user ? 'Logged in' : 'Not logged in'}
        </div>
        {user && (
          <div>
            <strong>Email:</strong> {user.email}
          </div>
        )}
        <div>
          <strong>Cookies:</strong> {cookies || 'No cookies'}
        </div>
        <button 
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Test Sign In
        </button>
      </div>
    </div>
  )
} 