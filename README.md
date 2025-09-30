<h1 style="color: #fc0324">This package is currently under development. Please hold off on installing it—we'll provide updates soon!</h1>


# Shadcn Admin Layout

A modern, minimal admin dashboard layout for Next.js (App Router) with:
- **Dynamic server rendering** for user-aware layouts
- **Cookie-based auth** (dummy endpoints) with protected routes
- **Role-based sidebar** and **user header** display
- **Optional auth UI** (bring-your-own or use the provided forms)

## Installation

```bash
npm install shadcn-admin-layout
# or
yarn add shadcn-admin-layout
# or
pnpm add shadcn-admin-layout
```

## Usage

### Quick start

```tsx
import { AdminLayout } from 'shadcn-admin-layout'
import type { SidebarItem } from 'shadcn-admin-layout'

const sidebar: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', roles: ['admin','editor','viewer'] },
  {
    label: 'Users',
    roles: ['admin'],
    children: [
      { label: 'All Users', href: '/dashboard/users' },
      { label: 'Invitations', href: '/dashboard/users/invitations' },
    ],
  },
]

// Optional: your own login component; without it, access is open
function LoginScreen() {
  return <div>My Login Form</div>
}

export default function Page() {
  return (
    <AdminLayout sidebar={sidebar} header={[<span key="v">v1.0</span>]} login={<LoginScreen />}>
      <h1>Our content here</h1>
    </AdminLayout>
  )
}
```

### Dummy auth endpoints
The following are included out of the box:
- `POST /api/auth/login` → sets cookie with a dummy user
- `POST /api/auth/signup` → creates a dummy user and sets cookie
- `POST /api/auth/logout` → clears the cookie

User cookie shape:

```ts
type AuthUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}
```

### Sidebar authorization
When you pass `sidebar`, each item can include `roles` to gate visibility. If omitted, the item is shown only when a user exists.

### Minimal footprint
No external auth SDKs. Cookie is set via Next.js `headers().cookies()` APIs. You can replace the dummy endpoints with your production auth.

## Prefilled demo forms

Use the bundled forms with defaults for quick demos:

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

// Combine with AdminLayout
export default function Page() {
  return (
    <AdminLayout login={<DemoLogin />}>
      <h1>Our content here</h1>
    </AdminLayout>
  )
}
```

## Example

```tsx
// app/page.tsx: uses the provided LoginForm (optional)
import LoginForm from '@/components/auth/LoginForm'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  )
}
```

```tsx
// app/api/auth/login/route.ts (dummy)
export async function POST(req: Request) { /* provided by package */ }
```
## Documentation

- Auth helpers: `lib/auth.ts` → `getUser()`, `setUser()`, `clearUser()`, `userHasRole()`
- Protected routes: `middleware.ts` guards `/dashboard/**`
- Header shows user and logout form: `components/layout/Header.tsx`
- Sidebar role filtering: `components/layout/Sidebar.tsx`

## License
