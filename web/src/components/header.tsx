'use client';

import Link from 'next/link';
import { ShoppingCart, Moon, Sun, LayoutDashboard, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme-provider';
import { useCart } from '@/contexts/cart-provider';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center gap-4 lg:gap-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
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
