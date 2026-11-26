'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

// Thinker UI reads its tokens from data-thinker-theme on <html>.
function ThinkerThemeSync() {
  const { resolvedTheme } = useTheme()
  React.useEffect(() => {
    document.documentElement.setAttribute('data-thinker-theme', resolvedTheme === 'light' ? 'light' : 'dark')
  }, [resolvedTheme])
  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThinkerThemeSync />
      {children}
    </NextThemesProvider>
  )
}
