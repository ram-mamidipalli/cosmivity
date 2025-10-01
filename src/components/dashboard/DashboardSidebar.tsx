

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BrainCircuit,
  MessageSquare,
  Mic,
  Users,
  FileText,
  Award,
  Trophy,
  Settings,
  ChevronLeft,
  LogOut,
  Briefcase,
  Calendar,
  Gamepad2,
  BookCopy,
  Badge as BadgeIcon,
  GraduationCap,
  Code,
  NotebookText,
  BarChart3,
  Shield,
  User as UserIcon,
  Lock,
  Database,
  LifeBuoy,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";


const presentMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/aptitude", label: "Practice", icon: BrainCircuit },
  { href: "/dashboard/coach", label: "Resume Builder", icon: FileText },
  { href: "/dashboard/passport", label: "Portfolio", icon: Award },
  { href: "/dashboard/opportunities", label: "Opportunities", icon: Briefcase },
];

const upcomingMenuItems = [
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/courses", label: "Courses", icon: BookCopy },
  { href: "/dashboard/certifications", label: "Certifications", icon: BadgeIcon },
  { href: "/dashboard/notebook", label: "Notebook", icon: NotebookText },
  { href: "/dashboard/challenges", label: "Discussions", icon: Gamepad2 },
  { href: "/dashboard/teams", label: "Collaboration", icon: Users },
  { href: "/dashboard/interviews", label: "Mock Interviews (AI)", icon: MessageSquare },
  { href: "/dashboard/communication", label: "Communication Lab", icon: Mic },
  { href: "/dashboard/events", label: "Events", icon: Calendar },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/compiler", label: "Online Compiler", icon: Code },
]

const bottomMenuItems = [
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/help", label: "Help & Support", icon: LifeBuoy },
]

const adminMenuItems = [
  { href: "/dashboard/admin", label: "Admin", icon: Shield },
];

const SidebarMenuItem = ({ item, isCollapsed, onLinkClick, disabled = false }: { item: any; isCollapsed: boolean, onLinkClick?: () => void, disabled?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  const content = (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-3 transition-all duration-300 relative",
        isCollapsed ? "px-2" : "px-4",
        disabled && "text-muted-foreground/50 cursor-not-allowed hover:bg-transparent"
      )}
      disabled={disabled}
    >
      {item.icon && <item.icon className="h-5 w-5" />}
      {!isCollapsed && <span>{item.label}</span>}
      {disabled && !isCollapsed && <Badge variant="outline" className="absolute right-2 text-xs">Upcoming</Badge>}
    </Button>
  );

  if (disabled) {
    return <div className="cursor-not-allowed">{content}</div>
  }

  return (
    <Link href={item.href} passHref onClick={onLinkClick}>
      {content}
    </Link>
  );
};

const SidebarSkeleton = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <aside
      className={cn(
        "hidden md:flex flex-col justify-between p-4 bg-background/80 backdrop-blur-lg border-r transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
        <div>
            <div className="flex items-center gap-2 px-4 pb-4 border-b mb-4">
                <Skeleton className="h-8 w-24" />
            </div>
            <div className="flex flex-col gap-2">
                {[...Array(10)].map((_, i) => (
                    <Skeleton key={i} className={cn("h-10 w-full", isCollapsed ? "w-12 mx-auto" : "w-full")} />
                ))}
            </div>
        </div>
        <div className="flex flex-col gap-4 border-t pt-4">
            <div className="flex items-center gap-3 p-2 rounded-lg">
                <Skeleton className="h-10 w-10 rounded-full" />
                {!isCollapsed && <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-3 w-12" /></div>}
            </div>
        </div>
    </aside>
);


export default function DashboardSidebar({ isMobile = false, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const isAdmin = pathname.startsWith('/dashboard/admin');
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted && !isMobile) {
    return <SidebarSkeleton isCollapsed={isCollapsed} />;
  }
  
  const SidebarContent = () => (
      <>
        <div className="flex flex-col flex-grow min-h-0">
        <div className="flex items-center justify-center gap-2 px-4 pb-4 border-b mb-4 flex-shrink-0">
          <Link href="/" className="font-bold text-2xl text-primary relative">
            <span className="relative">
              {!isCollapsed && "Cosmivity"}
              {isCollapsed && "C"}
            </span>
          </Link>
        </div>
        <ScrollArea className="flex-grow">
          <nav className="flex flex-col gap-2 pr-4">
            {isAdmin ? (
                adminMenuItems.map((item) => (
                  <SidebarMenuItem 
                    key={item.href} 
                    item={item} 
                    isCollapsed={isMobile ? false : isCollapsed} 
                    onLinkClick={onLinkClick}
                  />
                ))
            ) : (
                <>
                    {presentMenuItems.map((item) => (
                      <SidebarMenuItem 
                        key={item.href} 
                        item={item} 
                        isCollapsed={isMobile ? false : isCollapsed} 
                        onLinkClick={onLinkClick}
                      />
                    ))}
                    {!isCollapsed && <p className="text-xs font-semibold text-muted-foreground px-4 mt-4 mb-2">Upcoming Features</p>}
                     {upcomingMenuItems.map((item) => (
                      <SidebarMenuItem 
                        key={item.href} 
                        item={item} 
                        isCollapsed={isMobile ? false : isCollapsed} 
                        onLinkClick={onLinkClick}
                        disabled={true}
                      />
                    ))}
                </>
            )}
          </nav>
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-2 border-t pt-4 flex-shrink-0">
        
        {bottomMenuItems.map((item) => (
            <SidebarMenuItem 
                key={item.href} 
                item={item} 
                isCollapsed={isMobile ? false : isCollapsed} 
                onLinkClick={onLinkClick}
            />
        ))}

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("w-full justify-start gap-3 h-auto p-2", isCollapsed ? 'px-2' : 'px-3')}>
                    <Avatar>
                         <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="boy icon" />
                         <AvatarFallback><UserIcon /></AvatarFallback>
                    </Avatar>
                    {!(isMobile ? false : isCollapsed) && (
                        <div className="text-left">
                        <p className="font-semibold text-sm">{isAdmin ? "Admin" : user?.user_metadata.name || "Aakash"}</p>
                        <p className="text-xs text-muted-foreground font-code">{isAdmin ? "Institution" : "2,650 XP"}</p>
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
                 <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{isAdmin ? "Admin" : user?.user_metadata.name || "Aakash"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                        {isAdmin ? "admin@example.com" : user?.email || "aakash@example.com"}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        {!isMobile && (
             <Button onClick={() => setIsCollapsed(!isCollapsed)} variant="outline" size="icon" className="absolute -right-5 top-8">
                <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
            </Button>
        )}
      </div>
      </>
  );

  if (isMobile) {
      return (
          <div className="flex flex-col justify-between h-full p-4 bg-background">
            <SidebarContent />
          </div>
      )
  }

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col justify-between p-4 bg-background/80 backdrop-blur-lg border-r transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
        <SidebarContent />
    </aside>
  );
}
