
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


const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/aptitude", label: "Aptitude Practice", icon: BrainCircuit },
  { href: "/dashboard/interviews", label: "Mock Interviews (AI)", icon: MessageSquare },
  { href: "/dashboard/communication", label: "Communication Lab", icon: Mic },
  { href: "/dashboard/challenges", label: "Team Challenges", icon: Users },
  { href: "/dashboard/coach", label: "Resume & LinkedIn Coach", icon: FileText },
  { href: "/dashboard/passport", label: "Skill Passport", icon: Award },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
];

const SidebarMenuItem = ({ item, isCollapsed }: { item: any; isCollapsed: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link href={item.href} passHref>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 transition-all duration-300",
          isActive && "neon-glow",
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
                {[...Array(8)].map((_, i) => (
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


export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <SidebarSkeleton isCollapsed={isCollapsed} />;
  }

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col justify-between p-4 bg-background/80 backdrop-blur-lg border-r transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div>
        <div className="flex items-center justify-center gap-2 px-4 pb-4 border-b mb-4">
          <Link href="/" className="font-bold text-2xl text-primary relative">
            <span className="relative">
              {!isCollapsed && "Cosmivity"}
              {isCollapsed && "C"}
              <svg
                  viewBox="0 0 285 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-1 left-0 w-full"
                  preserveAspectRatio="none"
              >
                  <path
                  d="M2.35999 15.352C53.8647 10.1561 161.464 2.53673 282.64 6.13624"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  />
              </svg>
            </span>
          </Link>
        </div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href} item={item} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-4 border-t pt-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("w-full justify-start gap-3 h-auto p-2", isCollapsed ? 'px-2' : 'px-3')}>
                    <Avatar>
                        <AvatarImage src="https://placehold.co/100x100.png" alt="Aakash" data-ai-hint="man portrait"/>
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                        <div className="text-left">
                        <p className="font-semibold text-sm">Aakash</p>
                        <p className="text-xs text-muted-foreground">1,250 XP</p>
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Aakash</p>
                        <p className="text-xs leading-none text-muted-foreground">
                        aakash@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/auth')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={() => setIsCollapsed(!isCollapsed)} variant="outline" size="icon" className="absolute -right-5 top-16">
            <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
        </Button>
      </div>
    </aside>
  );
}
