import React from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3,
  LogOut
} from 'lucide-react'
import { getUser } from '@/lib/auth'
import type { AuthUser } from '@/lib/auth'

const Sidebar = async () => {
  const user = await getUser()
  const menuItems: { icon: React.ReactNode; label: string; href: string; roles: AuthUser['role'][] }[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard', roles: ['admin','editor','viewer'] },
    { icon: <Users size={20} />, label: 'Users', href: '/dashboard/users', roles: ['admin'] },
    { icon: <BarChart3 size={20} />, label: 'Analytics', href: '/dashboard/analytics', roles: ['admin','editor'] },
    { icon: <Settings size={20} />, label: 'Settings', href: '/dashboard/settings', roles: ['admin','editor'] },
  ]

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">Admin Panel</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.filter((item) => !user ? false : item.roles.includes(user.role)).map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <span className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-100 text-gray-700 hover:text-primary-600 transition-colors">
                  {item.icon}
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <form action="/api/auth/logout" method="post">
          <button className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}

export default Sidebar