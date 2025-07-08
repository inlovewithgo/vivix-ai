import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalProvider } from '@/context/GlobalStateContext'
import Provider from './provider'
import Head from 'next/head' 

const inter = Inter({ subsets: ['latin'] })

interface ExtendedMetadata extends Metadata {
  image?: string;
  favicon?: string;
}

export const metadata: ExtendedMetadata = {
  title: 'No Code. No Limits. ~ Infinite Creativity.',
  description: 'Turn your AI dreams into reality with Vivix AI - no coding, no limits, just unstoppable innovation on a censorship-resistant blockchain.',
  image: 'public/logo-v.ico',
  favicon: 'public/logo-v.ico'
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy text-white`}><Provider>{children}</Provider></body>
    </html>
  )
}

