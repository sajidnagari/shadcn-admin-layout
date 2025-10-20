"use client"

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check current state from DOM first (in case inline script already set it)
    const currentDark = document.documentElement.classList.contains('dark')
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Use current DOM state if available, otherwise use saved preference or system preference
    const useDark = currentDark || (saved ? saved === 'dark' : prefersDark)
    
    // Ensure DOM and state are in sync
    document.documentElement.classList.toggle('dark', useDark)
    setIsDark(useDark)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    
    // Force the class change
    if (next) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    try { 
      localStorage.setItem('theme', next ? 'dark' : 'light') 
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }

  if (!mounted) return null

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      aria-label="Toggle theme" 
      onClick={toggle}
      className="relative z-10 hover:bg-accent"
      style={{ cursor: 'pointer' }}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}



