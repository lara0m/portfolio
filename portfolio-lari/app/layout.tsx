import './globals.css'
import { IBM_Plex_Mono } from 'next/font/google'

const plex = IBM_Plex_Mono({
  subsets: ['latin'],            // incluye ñ y tildes
  weight: ['400', '700'],        // normal y negrita
  variable: '--font-plex',
  display: 'swap',
})

export const metadata = { title: 'lara-muiña | portfolio' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={plex.variable}>
      <body>{children}</body>
    </html>
  )
}