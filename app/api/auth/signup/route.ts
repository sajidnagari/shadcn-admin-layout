import { NextResponse } from 'next/server'
import { setUser, type AuthUser } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user: AuthUser = {
      id: Math.random().toString(36).slice(2),
      name: name || email.split('@')[0],
      email,
      role: 'viewer',
    }

    await setUser(user)
    return NextResponse.json({ user })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}


