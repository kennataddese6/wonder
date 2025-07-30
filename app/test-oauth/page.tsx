"use client"

import { supabase } from "@/lib/supabase"
import { useState } from "react"

export default function TestOAuthPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testOAuth = async () => {
    setLoading(true)
    try {
      console.log('Testing OAuth configuration...')
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set')
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      console.log('OAuth test result:', { data, error })
      setResult({ data, error })

      if (error) {
        console.error('OAuth error:', error)
      } else if (data?.url) {
        console.log('OAuth URL:', data.url)
        // Don't redirect automatically, just show the URL
      }
    } catch (error) {
      console.error('Test error:', error)
      setResult({ error: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">OAuth Configuration Test</h1>
      
      <div className="space-y-4 mb-8">
        <div>
          <strong>Environment Variables:</strong>
          <div className="mt-2 space-y-1">
            <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set'}</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</div>
          </div>
        </div>
        
        <div>
          <strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Loading...'}
        </div>
        
        <div>
          <strong>Redirect URL:</strong> {typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : 'Loading...'}
        </div>
      </div>

      <button 
        onClick={testOAuth}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test OAuth Flow'}
      </button>

      {result && (
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Test Result:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
} 