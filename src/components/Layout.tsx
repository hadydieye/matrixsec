import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const { signOut, profile } = useAuth();

  return (
    <SidebarProvider defaultOpen={!isMobile} open={isMobile ? false : undefined}>
      <div className="min-h-screen flex w-full bg-background relative">
        <AppSidebar />
        
        <div className={`flex-1 flex flex-col min-w-0 ${isMobile ? 'w-full' : ''}`}>
          {/* Header with Trigger */}
          <header className="h-12 md:h-16 flex items-center border-b border-border bg-card/50 backdrop-blur-xl px-2 md:px-4 lg:px-6 shrink-0">
            <SidebarTrigger className="text-primary hover:text-primary-glow transition-colors" />
            
            <div className="ml-2 md:ml-4 flex items-center space-x-1 md:space-x-2">
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-primary rounded-full animate-glow-pulse"></div>
              <h1 className="text-base md:text-xl font-bold text-glow-primary">MatrixSec</h1>
            </div>

            <div className="ml-auto flex items-center space-x-2 md:space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="text-xs md:text-sm text-muted-foreground">
                  Bienvenue, {profile?.username || 'Utilisateur'}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="btn-glass text-xs md:text-sm"
              >
                <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
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