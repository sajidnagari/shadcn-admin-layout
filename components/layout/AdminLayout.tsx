import React from 'react'
import { LayoutDashboard, Users, BarChart3, Settings } from 'lucide-react'
import { getUser, type AuthUser } from '@/lib/auth'
import AdminShell from '@/components/layout/AdminShell'

export const dynamic = 'force-dynamic'

export type Role = AuthUser['role']

export type SidebarItem = {
  label: string
  href?: string
  icon?: React.ReactNode
  roles?: Role[]
  children?: SidebarItem[]
}

type NodeOrComponent = React.ComponentType<any> | React.ReactNode

export interface AdminLayoutProps {
  children: React.ReactNode
  sidebar?: SidebarItem[]
  header?: React.ReactNode[]
  login?: NodeOrComponent
  sign?: NodeOrComponent
}

function renderNode(node?: NodeOrComponent): React.ReactNode | null {
  if (!node) return null
  if (typeof node === 'function') return React.createElement(node as React.ComponentType)
  return node
}

//

export default async function AdminLayout({ children, sidebar, header, login }: AdminLayoutProps) {
  const user = await getUser()

  // Gate access when no user by rendering provided login component
  if (!user && login) {
    return <>{renderNode(login)}</>
  }

  function filterByRole(list: SidebarItem[]): SidebarItem[] {
    return list.reduce<SidebarItem[]>((acc, i) => {
      const allowed = i.roles ? (user ? i.roles.includes(user.role) : false) : Boolean(user)
      const children = i.children ? filterByRole(i.children) : undefined
      const hasChildren = Boolean(children && children.length > 0)
      const keep = allowed || hasChildren
      if (keep) acc.push({ ...i, children })
      return acc
    }, [])
  }

  const items = filterByRole(
    sidebar ?? [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['admin','editor','viewer'] as Role[] },
      { label: 'Users', href: '/dashboard/users', icon: <Users size={20} />, roles: ['admin'] as Role[] },
      { label: 'Analytics', href: '/dashboard/analytics', icon: <BarChart3 size={20} />, roles: ['admin','editor'] as Role[] },
      { label: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} />, roles: ['admin','editor'] as Role[] },
    ]
  )

  return (
    <AdminShell items={items} headerNodes={header} user={user}>
      {children}
    </AdminShell>
  )
}


