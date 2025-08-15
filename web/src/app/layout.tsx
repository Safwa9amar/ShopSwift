import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/theme-provider';
import { CartProvider } from '@/contexts/cart-provider';
import Header from '@/components/header';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'ShopSwift',
  description: 'A modern e-commerce experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background font-sans">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
          <CartProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
