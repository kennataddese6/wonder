"use client"

export default function CheckRedirectPage() {
  const currentOrigin = window.location.origin
  const redirectUrl = `${currentOrigin}/auth/callback`

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Redirect URL Check</h1>
      <div className="space-y-4">
        <div>
          <strong>Current Origin:</strong> {currentOrigin}
        </div>
        <div>
          <strong>Redirect URL:</strong> {redirectUrl}
        </div>
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <strong>Instructions:</strong>
          <ol className="mt-2 list-decimal list-inside space-y-1">
            <li>Copy the redirect URL above</li>
            <li>Go to your Supabase dashboard</li>
            <li>Navigate to Authentication → URL Configuration</li>
            <li>Add the redirect URL to "Redirect URLs"</li>
            <li>Also check Google OAuth provider settings</li>
          </ol>
        </div>
      </div>
    </div>
  )
} 