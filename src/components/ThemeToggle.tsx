'use client'

import { useTheme } from './ThemeProvider'
import { Button } from './ui/button'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground"
            aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </Button>
    )
}