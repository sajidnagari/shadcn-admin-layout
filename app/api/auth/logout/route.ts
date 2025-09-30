import { NextResponse } from 'next/server'
import { clearUser } from '@/lib/auth'

export async function POST(req: Request) {
  await clearUser()
  const accept = req.headers.get('accept') || ''
  if (accept.includes('text/html')) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.json({ ok: true })
}


