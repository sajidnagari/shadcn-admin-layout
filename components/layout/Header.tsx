import React from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/auth'
import Image from 'next/image'

const Header = async () => {
  const user = await getUser()
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
              <Image src="/favicon.ico" alt="avatar" width={32} height={32} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-gray-900">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
            <form action="/api/auth/logout" method="post">
              <Button type="submit" variant="outline" size="sm">Logout</Button>
            </form>
          </div>
        ) : (
          <a href="/" className="text-sm text-primary-600">Sign in</a>
        )}
      </div>
    </header>
  )
}

export default Header