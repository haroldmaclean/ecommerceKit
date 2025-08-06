import '../globals.css' // ✅ updated path
import { ThemeProvider } from '@/components/ThemeProvider'

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
