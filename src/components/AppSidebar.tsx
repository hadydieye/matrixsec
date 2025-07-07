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

const moduleCategories = [
  { title: "Hacking Éthique", url: "/modules/hacking-ethique", icon: Shield },
  { title: "Red Teaming", url: "/modules/redteaming", icon: Zap },
  { title: "Blue Teaming", url: "/modules/blueteaming", icon: Brain },
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
    <Sidebar className={`border-r border-border bg-card/30 backdrop-blur-xl ${collapsed ? "w-16" : "w-64"}`}>
      <SidebarContent className="bg-transparent">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary text-glow-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={getNavCls}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Module Categories */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent text-glow-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider">
            Domaines
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {moduleCategories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span className="ml-3 text-sm">{item.title}</span>}
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