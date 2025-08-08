import '../globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/layout/Navbar' // ✅ Add this import

export const metadata = {
  title: 'CommerceKit',
  description: 'Your modern storefront',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navbar /> {/* ✅ Add this line */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
