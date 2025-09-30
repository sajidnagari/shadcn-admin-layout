import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Modern admin dashboard built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {try {const s = localStorage.getItem('theme'); const m = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; const d = s ? s === 'dark' : m; const c = document.documentElement.classList; d ? c.add('dark') : c.remove('dark');} catch (_) {}})();`
          }}
        />
      </head>
      <body className={inter.className + " min-h-screen bg-background text-foreground antialiased"}>{children}</body>
    </html>
  )
}