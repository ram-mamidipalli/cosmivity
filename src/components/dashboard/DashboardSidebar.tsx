
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
        <div className="flex flex-col gap-4">
            <div className="border-t pt-4">
                 <Skeleton className={cn("h-10 w-full", isCollapsed ? "w-12 mx-auto" : "w-full")} />
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary">
                <Skeleton className="h-10 w-10 rounded-full" />
                {!isCollapsed && <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-3 w-12" /></div>}
            </div>
        </div>
    </aside>
);


export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
        <div className="flex items-center gap-2 px-4 pb-4 border-b mb-4">
          <Link href="/" className="font-bold text-2xl text-primary relative">
            {!isCollapsed && "Cosmivity"}
            {isCollapsed && "C"}
          </Link>
        </div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href} item={item} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <div className="border-t pt-4">
            <Link href="/dashboard/settings" passHref>
                <Button variant="ghost" className={cn("w-full justify-start gap-3", isCollapsed ? "px-2" : "px-4")}>
                    <Settings className="h-5 w-5" />
                    {!isCollapsed && "Settings"}
                </Button>
            </Link>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary">
          <Avatar>
            <AvatarImage src="https://placehold.co/100x100.png" alt="Aakash" data-ai-hint="man portrait"/>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div>
              <p className="font-semibold text-sm">Aakash</p>
              <p className="text-xs text-muted-foreground">1,250 XP</p>
            </div>
          )}
        </div>
        <Button onClick={() => setIsCollapsed(!isCollapsed)} variant="outline" size="icon" className="absolute -right-5 top-16">
            <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
        </Button>
      </div>
    </aside>
  );
}

