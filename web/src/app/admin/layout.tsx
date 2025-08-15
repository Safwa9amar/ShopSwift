'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Package, ShoppingCart, Users, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarHeader>
               <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="group-data-[collapsible=icon]:hidden" asChild>
                    <Link href="/">
                        <Code />
                    </Link>
                </Button>
                <div className="font-bold text-lg group-data-[collapsible=icon]:hidden">
                  ShopSwift
                </div>
                <SidebarTrigger className="ml-auto" />
              </div>
            </SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/admin/products')}
                  tooltip={{ children: 'Products' }}
                >
                  <Link href="/admin/products">
                    <Package />
                    <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: 'Orders' }}>
                  <Link href="#">
                    <ShoppingCart />
                    <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: 'Customers' }}>
                  <Link href="#">
                    <Users />
                    <span>Customers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="p-4 md:p-8 flex-1">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
