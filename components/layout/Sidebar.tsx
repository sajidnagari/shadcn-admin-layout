import React from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3,
  LogOut
} from 'lucide-react'

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Users', href: '/dashboard/users' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">Admin Panel</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <span className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-100 text-gray-700 hover:text-primary-600 transition-colors">
                  <item.icon size={20} />
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar