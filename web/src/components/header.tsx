'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-provider';
import { useTheme } from '@/contexts/theme-provider';
import { LayoutDashboard, Moon, ShoppingCart, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center gap-4 lg:gap-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image alt='shopswift' width={50} height={50} src="/ic_launcher.png" className="h-10 w-10 ml-5 text-primary" />
            <span className="font-bold sm:inline-block">ShopSwift</span>
          </Link>
          <Link href="/admin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <LayoutDashboard className="h-5 w-5 md:hidden" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge variant="destructive" className="absolute top-1 right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
