import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import '../styles/critical.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { StylesProvider } from '@/components/StylesProvider'

export const metadata: Metadata = {
  title: 'Quince Basic Arianna Karina',
  description: 'Quince Basic Arianna Karina',
  generator: 'Quince Basic Arianna Karina',
  // Next.js 15 detecta automáticamente favicon.ico, icon.png y apple-icon.png en /app
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <StylesProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StylesProvider>
      </body>
    </html>
  )
}
