import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/providers/chakra'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DNGN',
  description: 'TTRPG Player UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}