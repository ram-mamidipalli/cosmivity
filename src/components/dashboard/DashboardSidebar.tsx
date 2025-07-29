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
  Moon,
  Sun,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "#", label: "Aptitude Practice", icon: BrainCircuit },
  { href: "#", label: "Mock Interviews (AI)", icon: MessageSquare },
  { href: "#", label: "Communication Lab", icon: Mic },
  { href: "#", label: "Team Challenges", icon: Users },
  { href: "#", label: "Resume & LinkedIn Coach", icon: FileText },
  { href: "#", label: "Skill Passport", icon: Award },
  { href: "#", label: "Leaderboard", icon: Trophy },
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

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
            <Link href="#" passHref>
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

// Dummy state for sidebar collapse - in a real app, you'd use React state
let isCollapsedState = false;
function useState(initial: boolean): [boolean, (val: boolean) => void] {
    // This is a dummy implementation for the purpose of this example.
    // In a real React component, you would use React.useState.
    const setState = (newState: boolean) => {
        isCollapsedState = newState;
    }
    return [isCollapsedState, setState];
}
const ChevronLeft = (props:any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
