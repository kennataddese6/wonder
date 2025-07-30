import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  console.log('Auth callback - Code present:', !!code)

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    console.log('Auth callback - Exchange result:', { hasData: !!data, error: error?.message })
    
    if (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(requestUrl.origin + '/login?error=auth_failed')
    }

    // Create response with proper cookies
    const response = NextResponse.redirect(requestUrl.origin + '/ma')
    
    // Copy cookies from cookieStore to response
    const allCookies = cookieStore.getAll()
    console.log('Auth callback - Cookies to set:', allCookies.length)
    allCookies.forEach(cookie => {
      console.log('Auth callback - Setting cookie:', cookie.name)
      response.cookies.set(cookie.name, cookie.value, cookie)
    })
    
    console.log('Auth callback - Redirecting to /ma')
    return response
  }

  // If no code, redirect to login
  return NextResponse.redirect(requestUrl.origin + '/login')
} 