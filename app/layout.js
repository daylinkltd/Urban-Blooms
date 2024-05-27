import './ui/globals.css'
import { SidebarProvider } from '@/contexts/SidebarContext'

export const metadata = {
  title: 'Daylink Admin Dashboard',
  description: 'Admin Panel Made with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}
