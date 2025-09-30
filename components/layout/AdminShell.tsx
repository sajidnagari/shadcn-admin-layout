"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Bell, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SidebarItem } from '@/components/layout/AdminLayout'
import type { AuthUser } from '@/lib/auth'
import ThemeToggle from '@/components/theme/ThemeToggle'

export interface AdminShellProps {
  items: SidebarItem[]
  headerNodes?: React.ReactNode[]
  user: AuthUser | null
  children: React.ReactNode
}

function SidebarList({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname()
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index}>
          {item.href ? (
            <Link href={item.href}>
              <span className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-primary-100 text-gray-700 hover:text-primary-600'
              }`}>
                {item.icon ?? null}
                {item.label}
              </span>
            </Link>
          ) : (
            <span className="flex items-center gap-3 p-3 rounded-lg text-gray-800">
              {item.icon ?? null}
              {item.label}
            </span>
          )}
          {item.children && item.children.length > 0 ? (
            <ul className="ml-6 mt-1 space-y-1">
              {item.children.map((child, ci) => (
                <li key={ci}>
                  {child.href ? (
                    <Link href={child.href}>
                      <span className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        pathname === child.href
                          ? 'bg-primary-50 text-primary-700'
                          : 'hover:bg-primary-50 text-gray-700 hover:text-primary-600'
                      }`}>
                        {child.icon ?? null}
                        {child.label}
                      </span>
                    </Link>
                  ) : (
                    <span className="flex items-center gap-3 p-2 rounded-lg text-gray-700">
                      {child.icon ?? null}
                      {child.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export default function AdminShell({ items, headerNodes, user, children }: AdminShellProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-screen w-64 bg-white border-r border-gray-200 flex-col sticky top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <SidebarList items={items} />
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

      {/* Mobile sidebar (drawer) */}
      {open ? (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 flex items-center justify-between border-b">
              <h1 className="text-lg font-semibold">Menu</h1>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 p-4 overflow-y-auto">
              <SidebarList items={items} />
            </nav>
            <div className="p-4 border-t">
              <form action="/api/auth/logout" method="post">
                <button className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors">
                  <LogOut size={20} />
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button className="md:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {Array.isArray(headerNodes) && headerNodes.length > 0 ? headerNodes.map((n, i) => <React.Fragment key={i}>{n}</React.Fragment>) : null}
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                  <Image src="/favicon.ico" alt="avatar" width={32} height={32} />
                </div>
                <div className="flex-col items-start leading-tight hidden md:flex">
                  <span className="text-sm font-medium text-gray-900 truncate max-w-[160px]">{user.name}</span>
                  <span className="text-xs text-gray-500 truncate max-w-[160px]">{user.email}</span>
                </div>
              </div>
            ) : (
              <a href="/" className="text-sm text-primary-600">Sign in</a>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}


