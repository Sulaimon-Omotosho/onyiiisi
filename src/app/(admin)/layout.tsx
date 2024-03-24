import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import '@/app/(user)/globals.css'

// const inter = Inter({ subsets: ['latin'] })
const playFair = Playfair_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Onyiisi',
  description: 'Web app for Luxury Items.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={playFair.className}>{children}</body>
    </html>
  )
}
