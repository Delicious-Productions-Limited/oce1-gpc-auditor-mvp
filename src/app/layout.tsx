import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GPC Auditor',
  description:
    'Automated Global Privacy Control (GPC) compliance audit with screenshots, tracker diffs, and a PDF report.',
  applicationName: 'GPC Auditor',
  openGraph: {
    title: 'GPC Auditor',
    description:
      'Automated Global Privacy Control (GPC) compliance audit with screenshots, tracker diffs, and a PDF report.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPC Auditor',
    description:
      'Automated Global Privacy Control (GPC) compliance audit with screenshots, tracker diffs, and a PDF report.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
