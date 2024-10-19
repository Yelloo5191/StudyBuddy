import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient'
import { VscCommentUnresolved } from 'react-icons/vsc'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  console.log(code)
  console.log(next)
  console.log(request.url)
  console.log(searchParams)
  console.log(origin)

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
        const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
        const isLocalEnv = process.env.NODE_ENV === 'development'

        await supabase.from("profiles").upsert({
            user_id: data.user?.id,
            name: data.user?.user_metadata.full_name,
            image_url: data.user?.user_metadata.avatar_url,
        })

        return NextResponse.redirect(`${origin}/profile`)
    }
    else{
        console.log(error);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}