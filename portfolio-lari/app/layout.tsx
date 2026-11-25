import './globals.css'
import { Bricolage_Grotesque } from 'next/font/google'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata = { title: 'loubre · fotografía deportiva' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={bricolage.variable}>
      <body>{children}</body>
    </html>
  )
}