
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Search, Award, Activity, BarChart3, Users, FileText, ChevronRight, Settings, LogOut, Flame, Trophy, Calendar, CheckCircle, BrainCircuit, Mic, MessageSquare, BookOpen, Quote, ChevronDown, ClipboardCheck, Timer, Moon, Sun, User as UserIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";

const learningPath = [
    {
        title: "English Fluency Boost",
        level: "Intermediate",
        progress: 65,
        icon: <Mic className="h-6 w-6 text-blue-500" />,
        nextActivity: "AI Chat Session",
        estTime: "20 min",
        color: "from-blue-100 to-blue-200 border-blue-300",
        textColor: "text-blue-800"
    },
    {
        title: "Aptitude Mastery",
        level: "Advanced",
        progress: 45,
        icon: <BrainCircuit className="h-6 w-6 text-purple-500" />,
        nextActivity: "Logical Reasoning Quiz",
        estTime: "30 min",
        color: "from-purple-100 to-purple-200 border-purple-300",
        textColor: "text-purple-800"
    },
    {
        title: "Interview Confidence",
        level: "Expert",
        progress: 30,
        icon: <Users className="h-6 w-6 text-green-500" />,
        nextActivity: "Technical Interview",
        estTime: "45 min",
        color: "from-green-100 to-green-200 border-green-300",
        textColor: "text-green-800"
    }
];

const quickAccessItems = [
    { label: "Aptitude", icon: <BrainCircuit/>, desc: "Quant, Verbal", href: "/dashboard/aptitude" },
    { label: "AI English Chat", icon: <Mic/>, desc: "Improve Fluency", href: "/dashboard/communication" },
    { label: "Mock Interview", icon: <MessageSquare/>, desc: "Practice with AI", href: "/dashboard/interviews" },
    { label: "Debate Rooms", icon: <Users/>, desc: "Live Discussions", href: "/dashboard/challenges" },
    { label: "Resume Builder", icon: <FileText/>, desc: "Create & Optimize", href: "/dashboard/coach" },
    { label: "Study Circles", icon: <BookOpen/>, desc: "Join Peer Groups", href: "/dashboard/teams" }
];

const leaderboardData = [
    { name: "Rahul Verma", school: "NIT Kurukshetra", xp: "2,850", avatar: "https://images.unsplash.com/photo-1583195763986-0231686dcd43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzU3MjQ3MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080", hint: "boy icon" },
    { name: "Priya Sharma", school: "IIT Allahabad", xp: "2,720", avatar: "https://images.unsplash.com/photo-1711645169736-53327e726205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHNtaWxpbmd8ZW58MHx8fHwxNzU3MjQ3MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080", hint: "woman icon" },
    { name: "Aakash (You)", school: "VIT Vellore", xp: "2,650", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cHJvZmlsZXxlbnwwfHx8fDE3NTgwMTYyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080", hint: "boy icon", isCurrentUser: true },
    { name: "Ankit Kumar", school: "BIT Mesra", xp: "2,580", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtYW4lMjBoZWFkc2hvdHxlbnwwfHx8fDE3NTczNDQyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080", hint: "boy icon" },
    { name: "Sneha Patel", school: "NSIT Delhi", xp: "2,450", avatar: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3b21hbiUyMGhlYWRzaG90fGVufDB8fHx8MTc1NzM0NDIwNXww&ixlib=rb-4.1.0&q=80&w=1080", hint: "woman icon" },
    { name: "Vikram Singh", school: "IIT Bombay", xp: "2,380", avatar: "https://images.unsplash.com/photo-1583195763986-0231686dcd43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzU3MjQ3MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080", hint: "boy icon" },
    { name: "Neha Gupta", school: "IIT Delhi", xp: "2,310", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmd8ZW58MHx8fHwxNzU3MjQ3MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080", hint: "woman icon" },
    { name: "Amit Reddy", school: "IIT Madras", xp: "2,250", avatar: "https://images.unsplash.com/photo-1627161684458-a62da52b51c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtYW4lMjBoZWFkc2hvdHxlbnwwfHx8fDE3NTczNDQyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080", hint: "boy icon" },
    { name: "Sunita Rao", school: "IIT Kanpur", xp: "2,190", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3b21hbiUyMGhlYWRzaG90fGVufDB8fHx8MTc1NzM0NDIwNXww&ixlib=rb-4.1.0&q=80&w=1080", hint: "woman icon" },
    { name: "Rajesh Kumar", school: "IIT Kharagpur", xp: "2,120", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTcyNDcwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080", hint: "boy icon" },
];

const achievements = [
    { title: "Debate Champion", rarity: "Rare", desc: "Won 3 consecutive debates", xp: "+250 XP", icon: <Trophy />, color: "bg-yellow-100 text-yellow-800" },
    { title: "Fluency Master", rarity: "Epic", desc: "Completed 50 AI chat sessions", xp: "+500 XP", icon: <Mic />, color: "bg-purple-100 text-purple-800" },
    { title: "Quick Learner", rarity: "Common", desc: "Solved 100 aptitude questions", xp: "+100 XP", icon: <BrainCircuit />, color: "bg-blue-100 text-blue-800" },
]

const searchMappings: { [key: string]: string } = {
    "analytics": "/dashboard/analytics",
    "practice": "/dashboard/aptitude",
    "aptitude": "/dashboard/aptitude",
    "discussions": "/dashboard/challenges",
    "debates": "/dashboard/challenges",
    "teams": "/dashboard/teams",
    "interviews": "/dashboard/interviews",
    "communication": "/dashboard/communication",
    "coach": "/dashboard/coach",
    "resume": "/dashboard/coach",
    "portfolio": "/dashboard/passport",
    "jobs": "/dashboard/jobs",
    "internships": "/dashboard/internships",
    "events": "/dashboard/events",
    "leaderboard": "/dashboard/leaderboard",
    "courses": "/dashboard/courses",
    "certifications": "/dashboard/certifications",
    "compiler": "/dashboard/compiler",
    "notebook": "/dashboard/notebook",
};

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/auth');
  };

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    if(darkModePreference) {
        setIsDarkMode(darkModePreference);
        document.documentElement.classList.add('dark');
    }
    setIsClient(true);
  }, []);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchQuery.trim() !== '') {
        const query = searchQuery.trim().toLowerCase();
        const route = Object.keys(searchMappings).find(key => query.includes(key));
        if (route) {
            router.push(searchMappings[route]);
        } else {
            toast({
                variant: 'destructive',
                title: "Not Found",
                description: `Could not find a page for "${searchQuery}".`,
            });
        }
    }
  };

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
    <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Good Evening, {user?.displayName || 'Aakash'} 👋</h1>
          {isClient && currentDate && (
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" /> {currentDate}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-2 font-semibold">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="font-code">2,650 XP</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-code">7-day streak</span>
            </div>
            <div className="flex items-center gap-2">
                <Badge>Novice</Badge>
            </div>
        </div>
        <div className="flex items-center gap-2">
          {isClient && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input 
                placeholder="Search courses, debates..." 
                className="pl-10 pr-4 py-2 rounded-full border bg-background w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          )}
          <Button variant="outline" asChild>
            <Link href="/dashboard/analytics">
                <BarChart3 className="mr-2" />
                Analytics
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cHJvZmlsZXxlbnwwfHx8fDE3NTgwMTYyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="User" data-ai-hint="boy icon"/>
                  <AvatarFallback><UserIcon /></AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName || 'Aakash'}</p>
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
                        <CardDescription className="mt-1">A quick 10-question revision to keep you sharp.</CardDescription>
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

            <Card>
                <CardHeader>
                    <CardTitle>Today's Goals</CardTitle>
                    <CardDescription>Keep up the momentum! You're doing great.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg"><BrainCircuit className="h-6 w-6 text-primary"/></div>
                        <div className="flex-1">
                            <p className="font-semibold">Complete Aptitude Quiz</p>
                            <p className="text-xs text-muted-foreground">Solve 10 quantitative questions</p>
                        </div>
                        <Progress value={70} className="w-24 h-2"/>
                        <span className="text-sm font-semibold font-code">7/10</span>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg"><Mic className="h-6 w-6 text-primary"/></div>
                        <div className="flex-1">
                            <p className="font-semibold">AI Chat Practice</p>
                            <p className="text-xs text-muted-foreground">15 minutes conversation</p>
                        </div>
                        <Progress value={40} className="w-24 h-2"/>
                        <span className="text-sm font-semibold font-code">6/15</span>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg"><BookOpen className="h-6 w-6 text-primary"/></div>
                        <div className="flex-1">
                            <p className="font-semibold">Vocabulary Building</p>
                            <p className="text-xs text-muted-foreground">Learn 5 new words</p>
                        </div>
                        <Progress value={100} className="w-24 h-2"/>
                        <CheckCircle className="h-5 w-5 text-green-500"/>
                    </div>
                    <div className="border-t pt-4 mt-4 flex items-center justify-end text-sm font-semibold text-yellow-600">
                        <Flame className="h-4 w-4 mr-1"/> <span className="font-code">7-day streak</span> <span className="text-muted-foreground mx-2">|</span> <span className="font-code">+150 XP today</span>
                    </div>
                </CardContent>
            </Card>

            <div>
                <CardTitle className="mb-4">Your Learning Path</CardTitle>
                <div className="grid md:grid-cols-3 gap-6">
                    {learningPath.map((path, i) => (
                        <Card key={i} className={`bg-gradient-to-br ${path.color} p-4 flex flex-col gap-4 transition-transform hover:scale-105`}>
                            <div className="flex justify-between items-center">
                                <Badge variant="secondary" className="text-xs">{path.level}</Badge>
                                {path.icon}
                            </div>
                            <div className="flex-grow">
                                <h3 className={`font-bold text-lg ${path.textColor}`}>{path.title}</h3>
                                <Progress value={path.progress} className="h-2 mt-2" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Next: {path.nextActivity}</p>
                                <p className="text-xs text-muted-foreground font-code">Est. Time: {path.estTime}</p>
                                <Button variant="link" className="p-0 h-auto mt-2 text-primary font-bold">Continue Learning <ChevronRight className="h-4 w-4 ml-1"/></Button>
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

            <RecentActivity />
        </div>

        <div className="xl:col-span-1 flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Leaderboard</CardTitle>
                    <CardDescription>Weekly XP Rankings</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-80">
                        <ul className="space-y-4 pr-4">
                            {leaderboardData.map((userItem, index) => (
                                <li key={index} className={`flex items-center gap-4 p-2 rounded-lg ${userItem.isCurrentUser ? 'bg-primary/10' : ''}`}>
                                    <span className="font-bold text-sm w-4 font-code">#{index + 1}</span>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={userItem.avatar} alt={userItem.name} data-ai-hint={userItem.hint} />
                                        <AvatarFallback><UserIcon /></AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{userItem.name}</p>
                                        <p className="text-xs text-muted-foreground">{userItem.school}</p>
                                    </div>
                                    <span className="font-bold text-primary font-code">{userItem.xp}</span>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Achievements</CardTitle>
                    <Button variant="link" size="sm">View All</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {achievements.map((ach, i) => (
                         <div key={i} className={`flex items-start gap-4 p-3 rounded-lg ${ach.color}`}>
                             <div className="p-2 bg-white/50 rounded-full">{ach.icon}</div>
                             <div>
                                <div className="flex items-center gap-2">
                                 <p className="font-semibold">{ach.title}</p>
                                 <Badge variant="outline" className="text-xs border-current">{ach.rarity}</Badge>
                                </div>
                                 <p className="text-xs">{ach.desc}</p>
                                 <p className="text-xs font-bold mt-1 font-code">{ach.xp}</p>
                             </div>
                         </div>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-semibold">Interview Ace</p>
                            <p className="text-xs text-muted-foreground font-code">7/10</p>
                        </div>
                        <Progress value={70} />
                    </div>
                     <div>
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-semibold">Community Leader</p>
                            <p className="text-xs text-muted-foreground font-code">10/25</p>
                        </div>
                        <Progress value={40} />
                    </div>
                </CardContent>
            </Card>
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

    
    