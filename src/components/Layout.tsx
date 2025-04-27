
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Calendar, Package, ShoppingCart, Truck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="container py-6 px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                {isMobile && <SidebarTrigger />}
                <Link to="/" className="flex items-center">
                  <span className="text-xl font-bold text-fresh-dark ml-2">Bloom Market</span>
                </Link>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="py-4 px-3">
          <h2 className="text-lg font-bold text-fresh-dark">Bloom Market</h2>
          <p className="text-sm text-muted-foreground">Fresh Bulk Produce</p>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/order" className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    <span>Place Order</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/track" className="w-full">
                    <Truck className="h-4 w-4 mr-2" />
                    <span>Track Order</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/admin" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Admin Panel</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
