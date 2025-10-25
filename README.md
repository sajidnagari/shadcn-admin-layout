# Shadcn Admin Layout

A modern, minimal admin dashboard layout for Next.js (App Router) with:
- **Dynamic server rendering** for user-aware layouts
- **Cookie-based auth** (dummy endpoints) with protected routes
- **Role-based sidebar** and **user header** display
- **Optional auth UI** (bring-your-own or use the provided forms)

## Features 

- 🚀 **Zero Configuration**: Works out of the box with minimal setup 
- 🔐 **Built-in Authentication**: Cookie-based auth with dummy endpoints for quick prototyping
- 👥 **Role-based Access Control**: Show/hide sidebar items based on user roles
- 🎨 **Shadcn/ui Compatible**: Uses your existing shadcn/ui components
- 📱 **Responsive Design**: Mobile-friendly sidebar and layout
- ⚡ **Server Components**: Full Next.js App Router support
- 🛡️ **Protected Routes**: Automatic route protection with middleware

## Installation

```bash
npm install shadcn-admin-layout
# or
yarn add shadcn-admin-layout
# or
pnpm add shadcn-admin-layout
```

### Prerequisites

- Next.js 13+ with App Router
- React 18+
- TypeScript (recommended)
- Tailwind CSS
- Shadcn/ui components (optional but recommended)

### Quick Setup

1. **Install the package**:
   ```bash
   npm install shadcn-admin-layout
   ```

2. **Copy the components** to your project:
   ```bash
   # Copy the layout components
   cp -r node_modules/shadcn-admin-layout/components/layout ./components/
   cp -r node_modules/shadcn-admin-layout/components/auth ./components/
   cp -r node_modules/shadcn-admin-layout/components/ui ./components/
   
   # Copy the API routes
   cp -r node_modules/shadcn-admin-layout/app/api ./app/
   
   # Copy utility files
   cp node_modules/shadcn-admin-layout/lib/auth.ts ./lib/
   cp node_modules/shadcn-admin-layout/middleware.ts ./
   ```

3. **Update your layout** to use the AdminLayout component

## Usage

### Basic Implementation

Create a new page or update your existing layout to use the AdminLayout:

```tsx
// app/dashboard/layout.tsx
import { AdminLayout } from '@/components/layout/AdminLayout'
import type { SidebarItem } from '@/components/layout/AdminLayout'

const sidebar: SidebarItem[] = [
  { 
    label: 'Dashboard', 
    href: '/dashboard', 
    icon: 'Home',
    roles: ['admin', 'editor', 'viewer'] 
  },
  {
    label: 'Users',
    icon: 'Users',
    roles: ['admin'],
    children: [
      { label: 'All Users', href: '/dashboard/users' },
      { label: 'Invitations', href: '/dashboard/users/invitations' },
    ],
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: 'BarChart',
    roles: ['admin', 'editor']
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: 'Settings',
    roles: ['admin']
  }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminLayout 
      sidebar={sidebar}
      header={[
        <span key="version" className="text-sm text-muted-foreground">v1.0</span>
      ]}
    >
      {children}
    </AdminLayout>
  )
}
```

### With Authentication

To add authentication, pass a login component:

```tsx
// app/dashboard/layout.tsx
import { AdminLayout } from '@/components/layout/AdminLayout'
import LoginForm from '@/components/auth/LoginForm'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminLayout 
      sidebar={sidebar}
      login={<LoginForm />}
    >
      {children}
    </AdminLayout>
  )
}
```

### Custom Login Component

You can create your own login component:

```tsx
// components/auth/CustomLogin.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CustomLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Your login logic here
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    if (response.ok) {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  )
}
```

## Authentication

### Built-in Auth Endpoints

The package includes dummy authentication endpoints for quick prototyping:

- `POST /api/auth/login` → sets cookie with a dummy user
- `POST /api/auth/signup` → creates a dummy user and sets cookie  
- `POST /api/auth/logout` → clears the cookie

### User Data Structure

```ts
type AuthUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}
```

### Role-based Access Control

Sidebar items can be filtered by user roles:

```tsx
const sidebar: SidebarItem[] = [
  // Visible to all authenticated users
  { label: 'Dashboard', href: '/dashboard' },
  
  // Only visible to admins
  { label: 'Users', href: '/dashboard/users', roles: ['admin'] },
  
  // Visible to admins and editors
  { label: 'Analytics', href: '/dashboard/analytics', roles: ['admin', 'editor'] },
  
  // Nested items inherit parent role restrictions
  {
    label: 'Settings',
    roles: ['admin'],
    children: [
      { label: 'General', href: '/dashboard/settings' },
      { label: 'Security', href: '/dashboard/settings/security' }
    ]
  }
]
```

### Custom Authentication

Replace the dummy endpoints with your production auth:

```tsx
// lib/auth.ts
import { cookies } from 'next/headers'

export async function getUser() {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('user')
  
  if (!userCookie) return null
  
  try {
    return JSON.parse(userCookie.value) as AuthUser
  } catch {
    return null
  }
}

export async function setUser(user: AuthUser) {
  const cookieStore = await cookies()
  cookieStore.set('user', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 
  })
}
```

## Demo Forms

Use the bundled forms with pre-filled defaults for quick demos:

```tsx
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'

export function DemoLogin() {
  return <LoginForm defaultEmail="admin@example.com" defaultPassword="password" />
}

export function DemoSignup() {
  return (
    <SignupForm
      defaultName="Jane Admin"
      defaultEmail="admin@example.com"
      defaultPassword="password"
    />
  )
}

// Use with AdminLayout
export default function Page() {
  return (
    <AdminLayout login={<DemoLogin />}>
      <h1>Dashboard Content</h1>
    </AdminLayout>
  )
}
```

## Configuration

### Sidebar Configuration

The sidebar supports various configuration options:

```tsx
interface SidebarItem {
  label: string
  href?: string
  icon?: string
  roles?: string[]
  children?: SidebarItem[]
  badge?: string | number
  disabled?: boolean
}

const sidebar: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'Home',
    roles: ['admin', 'editor', 'viewer']
  },
  {
    label: 'Users',
    icon: 'Users',
    roles: ['admin'],
    badge: '12', // Shows a badge
    children: [
      { label: 'All Users', href: '/dashboard/users' },
      { label: 'Invitations', href: '/dashboard/users/invitations', badge: '3' }
    ]
  },
  {
    label: 'Maintenance',
    href: '/dashboard/maintenance',
    icon: 'Settings',
    roles: ['admin'],
    disabled: true // Disabled state
  }
]
```

### Header Configuration

Customize the header with additional elements:

```tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout 
      sidebar={sidebar}
      header={[
        <ThemeToggle key="theme" />,
        <span key="version" className="text-sm text-muted-foreground">v1.0</span>
      ]}
    >
      {children}
    </AdminLayout>
  )
}
```

## API Reference

### AdminLayout Props

```tsx
interface AdminLayoutProps {
  children: React.ReactNode
  sidebar?: SidebarItem[]
  header?: React.ReactNode[]
  login?: React.ReactNode
  className?: string
}
```

### Auth Utilities

```tsx
// lib/auth.ts
export async function getUser(): Promise<AuthUser | null>
export async function setUser(user: AuthUser): Promise<void>
export async function clearUser(): Promise<void>
export function userHasRole(user: AuthUser, role: string): boolean
```

### Middleware

The included middleware automatically protects routes:

```tsx
// middleware.ts
export function middleware(request: NextRequest) {
  // Protects all /dashboard/** routes
  // Redirects to login if user is not authenticated
}
```

## Examples

### Complete Dashboard Setup

```tsx
// app/dashboard/layout.tsx
import { AdminLayout } from '@/components/layout/AdminLayout'
import LoginForm from '@/components/auth/LoginForm'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

const sidebar = [
  { label: 'Overview', href: '/dashboard', icon: 'Home' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart' },
  { label: 'Users', href: '/dashboard/users', icon: 'Users', roles: ['admin'] },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings', roles: ['admin'] }
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout 
      sidebar={sidebar}
      header={[<ThemeToggle key="theme" />]}
      login={<LoginForm />}
    >
      {children}
    </AdminLayout>
  )
}
```

### Standalone Login Page

```tsx
// app/login/page.tsx
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <LoginForm />
      </div>
    </div>
  )
}
```

## Troubleshooting

### Common Issues

**1. "Module not found" errors**
```bash
# Make sure you've copied all required files
cp -r node_modules/shadcn-admin-layout/components ./components/
cp -r node_modules/shadcn-admin-layout/app/api ./app/
cp node_modules/shadcn-admin-layout/lib/auth.ts ./lib/
cp node_modules/shadcn-admin-layout/middleware.ts ./
```

**2. Authentication not working**
- Check that your middleware is properly configured
- Verify cookie settings in your auth functions
- Ensure API routes are accessible

**3. Sidebar items not showing**
- Check user roles match the `roles` array in sidebar items
- Verify user is properly authenticated
- Check console for any JavaScript errors

**4. Styling issues**
- Ensure Tailwind CSS is properly configured
- Check that shadcn/ui components are installed
- Verify CSS imports in your layout

### Development Tips

- Use the browser dev tools to inspect the user cookie
- Check the Network tab for API calls to auth endpoints
- Use React DevTools to inspect component props
- Test with different user roles to verify access control

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Support

- 📖 [Documentation](https://github.com/your-org/shadcn-admin-layout/wiki)
- 🐛 [Report Issues](https://github.com/your-org/shadcn-admin-layout/issues)
- 💬 [Discussions](https://github.com/your-org/shadcn-admin-layout/discussions)

## License

MIT License - see [LICENSE](LICENSE) file for details.
