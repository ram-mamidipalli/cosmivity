"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Search, Award, Activity, BarChart3, Users, FileText, ChevronRight, Settings, LogOut } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const chartData = [
  { name: "Week 1", communication: 65, aptitude: 72, projects: 45 },
  { name: "Week 2", communication: 70, aptitude: 78, projects: 50 },
  { name: "Week 3", communication: 78, aptitude: 85, projects: 60 },
  { name: "Week 4", communication: 85, aptitude: 90, projects: 75 },
];

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome back, Aakash 👋</h1>
          <p className="text-muted-foreground">{currentDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full border bg-background" />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1615109398623-88346a601842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtYW58ZW58MHx8fHwxNzUzNzgwMjUzfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Aakash" data-ai-hint="man portrait"/>
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
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
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="glassmorphic hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Daily Goal Progress</CardTitle>
              <CardDescription>You're on your way to greatness!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Progress value={75} className="h-4" />
                <span className="font-bold text-primary">75%</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Next reward unlocks at 1000 XP</p>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-8">
             <Card className="glassmorphic hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Next Activity</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Aptitude: Ratios</div>
                    <p className="text-xs text-muted-foreground">Level: Intermediate</p>
                    <Button size="sm" className="mt-4 w-full">Start Challenge <ChevronRight className="ml-2 h-4 w-4"/></Button>
                </CardContent>
            </Card>
             <Card className="glassmorphic hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Mock Interview</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Score: 8.2/10</div>
                    <p className="text-xs text-muted-foreground">Role: Jr. Software Engineer</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full">Reattempt Now</Button>
                </CardContent>
            </Card>
          </div>

          <Card className="glassmorphic hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Weekly Skill Development</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                  <Bar dataKey="communication" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="aptitude" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                   <Bar dataKey="projects" fill="hsl(var(--secondary-foreground))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>
        <div className="space-y-8">
           <Card className="glassmorphic hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle>Upcoming Group Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="font-semibold">E-Commerce Checkout Flow</h3>
                    <p className="text-sm text-muted-foreground mb-4">Deadline: 3 days</p>
                    <Button className="w-full">Join Challenge</Button>
                </CardContent>
            </Card>
            <Card className="glassmorphic hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary"/> Quick Resume Tip</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">"Use action verbs like 'developed', 'led', and 'optimized' to describe your accomplishments."</p>
                </CardContent>
            </Card>
             <Card className="glassmorphic hover:shadow-2xl transition-shadow duration-300 bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary"/> New Badge Unlocked!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold text-primary">"Aptitude Ace"</p>
                    <p className="text-sm text-muted-foreground">You completed 10 aptitude challenges in a row.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
