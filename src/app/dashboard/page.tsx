
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, LogOut, BrainCircuit, Mic, MessageSquare, BookOpen, Quote, ChevronRight, ClipboardCheck, Timer, Moon, Sun, User as UserIcon, Users, FileText, Briefcase, Award, Calendar, LayoutDashboard } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";

const presentFeatures = [
    { 
        title: "Practice", 
        href: "/dashboard/aptitude", 
        icon: <BrainCircuit className="h-6 w-6 text-blue-500" />,
        description: "Sharpen your aptitude skills.",
        color: "from-blue-100 to-blue-200 border-blue-300",
        textColor: "text-blue-800"
    },
    { 
        title: "Resume Builder", 
        href: "/dashboard/coach", 
        icon: <FileText className="h-6 w-6 text-purple-500" />,
        description: "Build a professional resume.",
        color: "from-purple-100 to-purple-200 border-purple-300",
        textColor: "text-purple-800"
    },
    { 
        title: "Portfolio", 
        href: "/dashboard/passport", 
        icon: <Award className="h-6 w-6 text-green-500" />,
        description: "Showcase your skills and projects.",
        color: "from-green-100 to-green-200 border-green-300",
        textColor: "text-green-800"
    },
    { 
        title: "Opportunities", 
        href: "/dashboard/opportunities", 
        icon: <Briefcase className="h-6 w-6 text-orange-500" />,
        description: "Find jobs and internships.",
        color: "from-orange-100 to-orange-200 border-orange-300",
        textColor: "text-orange-800"
    },
    { 
        title: "Events", 
        href: "/dashboard/events", 
        icon: <Calendar className="h-6 w-6 text-red-500" />,
        description: "Join workshops and webinars.",
        color: "from-red-100 to-red-200 border-red-300",
        textColor: "text-red-800"
    },
];

const quickAccessItems = [
    { label: "Dashboard", icon: <LayoutDashboard/>, href: "/dashboard" },
    { label: "Practice", icon: <BrainCircuit/>, href: "/dashboard/aptitude" },
    { label: "Resume Builder", icon: <FileText/>, href: "/dashboard/coach" },
    { label: "Portfolio", icon: <Award/>, href: "/dashboard/passport" },
    { label: "Opportunities", icon: <Briefcase/>, href: "/dashboard/opportunities" },
    { label: "Events", icon: <Calendar/>, href: "/dashboard/events" }
];


export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  useEffect(() => {
    // This code now runs only on the client
    setIsClient(true);
    
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    if (darkModePreference) {
        document.documentElement.classList.add('dark');
    }
  }, []);

  const handleQuickAccessClick = (href: string) => {
    router.push(href);
  };
  
  const toggleDarkMode = (checked: boolean) => {
      setIsDarkMode(checked);
      localStorage.setItem('darkMode', String(checked));
      if (checked) {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  };


  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome, {user?.user_metadata.name || 'Aakash'}</h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={user?.user_metadata.avatar_url || ""} alt="User" data-ai-hint="boy icon"/>
                  <AvatarFallback>{user?.user_metadata.name?.[0] || <UserIcon />}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.user_metadata.name || 'Aakash'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || 'aakash@example.com'}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                             {isDarkMode ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
                        </div>
                        <Switch id="dark-mode-toggle" checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </header>
      
      <main className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-8">
            <Card className="neon-glow">
                <CardHeader className="flex-row items-center gap-4">
                     <div className="p-3 bg-primary/10 rounded-full">
                        <ClipboardCheck className="h-8 w-8 text-primary"/>
                    </div>
                    <div>
                        <CardTitle>Daily Quick Test</CardTitle>
                        <CardDescription className="mt-1">A quick 5-question revision to keep you sharp.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Timer className="h-4 w-4"/>
                        <span className="font-code">Est. time: 5 mins</span>
                    </div>
                    <Button asChild>
                        <Link href="/dashboard/daily-test">Start Test</Link>
                    </Button>
                </CardContent>
            </Card>

            <div>
                <CardTitle className="mb-4">Explore Features</CardTitle>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {presentFeatures.map((feature, i) => (
                        <Card key={i} className={`bg-gradient-to-br ${feature.color} p-4 flex flex-col gap-4 transition-transform hover:scale-105 cursor-pointer`} onClick={() => router.push(feature.href)}>
                            <div className="flex justify-end items-center">
                                {feature.icon}
                            </div>
                            <div className="flex-grow">
                                <h3 className={`font-bold text-lg ${feature.textColor}`}>{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                            <div>
                                <Button variant="link" className="p-0 h-auto text-primary font-bold">
                                    Explore Now <ChevronRight className="h-4 w-4 ml-1"/>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <CardTitle className="mb-4">Quick Access</CardTitle>
                <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                    <div className="flex w-max space-x-4 pb-4">
                        {quickAccessItems.map(item => (
                            <Button key={item.label} variant="outline" className="flex flex-col h-28 w-32 gap-2 p-2 items-center justify-center text-center" onClick={() => handleQuickAccessClick(item.href)}>
                               <div className="p-2 bg-primary/10 rounded-full">{item.icon}</div>
                                <div className="text-center">
                                    <p className="font-semibold text-sm whitespace-normal">{item.label}</p>
                                </div>
                            </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>

        <div className="xl:col-span-1 flex flex-col gap-8">
             <Card className="text-center p-6">
                <CardContent className="p-0">
                    <Quote className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold italic">"Success is not final, failure is not fatal: it is the courage to continue that counts."</p>
                    <p className="text-sm text-muted-foreground mt-2">- Winston Churchill</p>
                </CardContent>
             </Card>
        </div>
      </main>
    </div>
  );
}
