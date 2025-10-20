"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export interface SignupFormProps {
  defaultName?: string
  defaultEmail?: string
  defaultPassword?: string
}

export default function SignupForm({ defaultName = '', defaultEmail = '', defaultPassword = '' }: SignupFormProps) {
  const router = useRouter()
  const [name, setName] = useState(defaultName)
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState(defaultPassword)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) throw new Error('Signup failed')
      router.replace('/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
        <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Creating account…' : 'Create account'}</Button>
    </form>
  )
}


