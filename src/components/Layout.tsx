import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header with Trigger */}
          <header className="h-16 flex items-center border-b border-border bg-card/50 backdrop-blur-xl px-4 lg:px-6">
            <SidebarTrigger className="text-primary hover:text-primary-glow transition-colors" />
            
            <div className="ml-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
              <h1 className="text-xl font-bold text-glow-primary">MatrixSec</h1>
            </div>

            <div className="ml-auto flex items-center space-x-2">
              <div className="text-sm text-muted-foreground">
                Cybersecurity Learning Platform
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}