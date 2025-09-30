import { NextResponse, NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const auth = req.cookies.get('sa_user')?.value
  const isAuthed = Boolean(auth)
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/dashboard') && !isAuthed) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}


