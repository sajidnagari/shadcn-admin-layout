import { cookies } from 'next/headers'

export type AuthUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}

const AUTH_COOKIE = 'sa_user'

export function getAuthCookieName(): string {
  return AUTH_COOKIE
}

export async function getUser(): Promise<AuthUser | null> {
  try {
    const store = await cookies()
    const raw = store.get(AUTH_COOKIE)?.value
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthUser
    if (!parsed?.id || !parsed?.email) return null
    return parsed
  } catch (err) {
    return null
  }
}

export async function setUser(user: AuthUser, options?: { maxAgeSeconds?: number }) {
  const store = await cookies()
  store.set(AUTH_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: options?.maxAgeSeconds ?? 60 * 60 * 24 * 7,
  })
}

export async function clearUser() {
  const store = await cookies()
  store.delete(AUTH_COOKIE)
}

export async function userHasRole(required: AuthUser['role'] | AuthUser['role'][]): Promise<boolean> {
  const user = await getUser()
  if (!user) return false
  const req = Array.isArray(required) ? required : [required]
  return req.includes(user.role)
}


