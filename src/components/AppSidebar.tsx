import { Home, BookOpen, Target, TrendingUp, User, Shield, Zap, Brain } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Accueil", url: "/", icon: Home },
  { title: "Modules", url: "/modules", icon: BookOpen },
  { title: "Quiz", url: "/quiz", icon: Target },
  { title: "Progression", url: "/progress", icon: TrendingUp },
  { title: "Profil", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/");
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary glow-primary font-medium" 
      : "text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all duration-300";

  return (
    <Sidebar className={`border-r border-border bg-card/30 backdrop-blur-xl ${collapsed ? "w-12 md:w-16" : "w-64 md:w-72"}`}>
      <SidebarContent className="bg-transparent">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary text-glow-primary px-2 md:px-4 py-2 text-xs font-semibold uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10 md:h-12">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 md:h-5 w-4 md:w-5 shrink-0" />
                      {!collapsed && <span className="ml-2 md:ml-3 text-sm md:text-base">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}