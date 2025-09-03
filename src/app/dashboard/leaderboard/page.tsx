
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Award, Medal, Shield, Crown } from "lucide-react";

const studentLeaders = [
    { rank: 1, name: "Rahul Verma", school: "NIT Kurukshetra", xp: "2,850", avatar: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=100", hint: "man portrait", change: 2 },
    { rank: 2, name: "Priya Sharma", school: "IIT Allahabad", xp: "2,720", avatar: "https://images.unsplash.com/photo-1591980896142-4e36328411ec?w=100", hint: "woman smiling", change: -1 },
    { rank: 3, name: "Aakash (You)", school: "VIT Vellore", xp: "2,650", avatar: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=100", hint: "man portrait", change: 0, isCurrentUser: true },
    { rank: 4, name: "Ankit Kumar", school: "BIT Mesra", xp: "2,580", avatar: "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?w=100", hint: "man headshot", change: 5 },
    { rank: 5, name: "Sneha Patel", school: "NSIT Delhi", xp: "2,450", avatar: "https://images.unsplash.com/photo-1648183185045-7a5592e66e9c?w=100", hint: "woman headshot", change: -2 },
    { rank: 6, name: "Vikram Singh", school: "IIT Bombay", xp: "2,380", avatar: "https://placehold.co/100x100.png", hint: "man portrait", change: 1 },
    { rank: 7, name: "Neha Gupta", school: "IIT Delhi", xp: "2,310", avatar: "https://placehold.co/100x100.png", hint: "woman smiling", change: -1 },
    { rank: 8, name: "Amit Reddy", school: "IIT Madras", xp: "2,250", avatar: "https://placehold.co/100x100.png", hint: "man headshot", change: 3 },
    { rank: 9, name: "Sunita Rao", school: "IIT Kanpur", xp: "2,190", avatar: "https://placehold.co/100x100.png", hint: "woman headshot", change: 0 },
    { rank: 10, name: "Rajesh Kumar", school: "IIT Kharagpur", xp: "2,120", avatar: "https://placehold.co/100x100.png", hint: "man portrait", change: -2 },
];

const institutionLeaders = [
    { rank: 1, name: "IIT Bombay", avgXp: "2,450", topStudents: 25, logo: "https://placehold.co/40x40.png", hint: "IIT Bombay logo"},
    { rank: 2, name: "IIT Delhi", avgXp: "2,380", topStudents: 22, logo: "https://placehold.co/40x40.png", hint: "IIT Delhi logo"},
    { rank: 3, name: "NIT Kurukshetra", avgXp: "2,310", topStudents: 18, logo: "https://placehold.co/40x40.png", hint: "NIT Kurukshetra logo"},
];

const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="text-yellow-500"/>
    if (rank === 2) return <Medal className="text-gray-400"/>
    if (rank === 3) return <Award className="text-yellow-700"/>
    return <Shield className="text-muted-foreground"/>
}

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">Leaderboard</h1>
            <p className="text-muted-foreground">See how you rank against your peers and other institutions.</p>
            </div>
        </header>

        <Card>
            <CardContent className="p-4">
                 <Tabs defaultValue="overall">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <TabsList>
                            <TabsTrigger value="overall">Overall</TabsTrigger>
                            <TabsTrigger value="region">Region Wise</TabsTrigger>
                            <TabsTrigger value="institution">Institution Wise</TabsTrigger>
                        </TabsList>
                        <div className="flex items-center gap-2">
                             <Select defaultValue="weekly">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Weekly" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="all-time">All Time</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <TabsContent value="overall" className="mt-6">
                        <LeaderboardTable data={studentLeaders} type="student" />
                    </TabsContent>
                    <TabsContent value="region" className="mt-6">
                         <div className="flex items-center gap-2 mb-4">
                             <Select defaultValue="national">
                                <SelectTrigger className="w-[240px]">
                                    <SelectValue placeholder="National" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="national">National</SelectItem>
                                    <SelectItem value="state">State</SelectItem>
                                    <SelectItem value="city">City</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <LeaderboardTable data={studentLeaders} type="student" />
                    </TabsContent>
                    <TabsContent value="institution" className="mt-6">
                         <div className="flex items-center gap-2 mb-4">
                             <Select defaultValue="all">
                                <SelectTrigger className="w-[240px]">
                                    <SelectValue placeholder="All Institutions" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Institutions</SelectItem>
                                    <SelectItem value="iit">IITs</SelectItem>
                                    <SelectItem value="nit">NITs</SelectItem>
                                    <SelectItem value="private">Private Colleges</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <LeaderboardTable data={institutionLeaders} type="institution" />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}

function LeaderboardTable({ data, type }: { data: any[], type: 'student' | 'institution'}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>{type === 'student' ? 'Student' : 'Institution'}</TableHead>
                    <TableHead className="text-right">{type === 'student' ? 'XP' : 'Avg. XP'}</TableHead>
                    <TableHead className="text-right">{type === 'student' ? 'Change' : 'Top Students'}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.rank} className={item.isCurrentUser ? 'bg-primary/10' : ''}>
                        <TableCell>
                            <div className="flex items-center gap-2 font-bold">
                                {getRankIcon(item.rank)}
                                <span>{item.rank}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={item.avatar || item.logo} data-ai-hint={item.hint}/>
                                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    {type === 'student' && <p className="text-xs text-muted-foreground">{item.school}</p>}
                                </div>
                            </div>
                        </TableCell>
                         <TableCell className="text-right font-code font-semibold text-primary">{item.xp || item.avgXp}</TableCell>
                         <TableCell className="text-right font-code">
                            {type === 'student' ? (
                                item.change > 0 ? (
                                    <span className="text-green-500">+{item.change}</span>
                                ) : item.change < 0 ? (
                                    <span className="text-destructive">{item.change}</span>
                                ) : (
                                    <span>-</span>
                                )
                            ) : (
                                item.topStudents
                            )}
                         </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
