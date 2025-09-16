

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
  Badge,
  GraduationCap,
  Code,
  NotebookText,
  BarChart3,
  Shield,
  User as UserIcon,
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
import { auth } from "@/lib/firebase";


const studentMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/aptitude", label: "Practice", icon: BrainCircuit },
  { href: "/dashboard/challenges", label: "Discussions", icon: Gamepad2 },
  { href: "/dashboard/teams", label: "Collaboration", icon: Users },
  { href: "/dashboard/interviews", label: "Mock Interviews (AI)", icon: MessageSquare },
  { href: "/dashboard/communication", label: "Communication Lab", icon: Mic },
  { href: "/dashboard/coach", label: "Resume Builder", icon: FileText },
  { href: "/dashboard/passport", label: "Portfolio", icon: Award },
  { href: "/dashboard/jobs", label: "Jobs", icon: Briefcase },
  { href: "/dashboard/internships", label: "Internships", icon: GraduationCap },
  { href: "/dashboard/events", label: "Events", icon: Calendar },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/courses", label: "Courses", icon: BookCopy },
  { href: "/dashboard/certifications", label: "Certifications", icon: Badge },
  { href: "/dashboard/compiler", label: "Online Compiler", icon: Code },
  { href: "/dashboard/notebook", label: "Notebook", icon: NotebookText },
];

const adminMenuItems = [
  { href: "/dashboard/admin", label: "Admin", icon: Shield },
];

const SidebarMenuItem = ({ item, isCollapsed, onLinkClick }: { item: any; isCollapsed: boolean, onLinkClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link href={item.href} passHref onClick={onLinkClick}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 transition-all duration-300",
          isCollapsed ? "px-2" : "px-4"
        )}
      >
        <item.icon className="h-5 w-5" />
        {!isCollapsed && <span>{item.label}</span>}
      </Button>
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
  const menuItems = isAdmin ? adminMenuItems : studentMenuItems.filter(item => item.href !== '/dashboard/admin');
  
  const handleLogout = async () => {
    await auth.signOut();
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
            {menuItems.map((item) => (
              <SidebarMenuItem 
                key={item.href} 
                item={item} 
                isCollapsed={isMobile ? false : isCollapsed} 
                onLinkClick={onLinkClick}
              />
            ))}
          </nav>
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-4 border-t pt-4 flex-shrink-0">
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("w-full justify-start gap-3 h-auto p-2", isCollapsed ? 'px-2' : 'px-3')}>
                    <Avatar>
                         <AvatarFallback><UserIcon /></AvatarFallback>
                    </Avatar>
                    {!(isMobile ? false : isCollapsed) && (
                        <div className="text-left">
                        <p className="font-semibold text-sm">{isAdmin ? "Admin" : user?.displayName || "Aakash"}</p>
                        <p className="text-xs text-muted-foreground font-code">{isAdmin ? "Institution" : "2,650 XP"}</p>
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
                 <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{isAdmin ? "Admin" : user?.displayName || "Aakash"}</p>
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
