"use client"

import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export default function DebugPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
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
          <strong>Cookies:</strong> {document.cookie}
        </div>
      </div>
    </div>
  )
} 