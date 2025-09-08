
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart, BrainCircuit, Mic, Users, FileText } from "lucide-react"

const studentData = [
    { name: 'Rahul Verma', email: 'rahul.v@example.com', overallScore: 82, aptitude: 85, communication: 75, interviews: 88, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', hint: "man portrait" },
    { name: 'Priya Sharma', email: 'priya.s@example.com', overallScore: 91, aptitude: 90, communication: 92, interviews: 90, avatar: 'https://images.unsplash.com/photo-1714415182234-0672970be61a?w=100', hint: "woman smiling" },
    { name: 'Ankit Kumar', email: 'ankit.k@example.com', overallScore: 75, aptitude: 70, communication: 80, interviews: 78, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', hint: "man headshot" },
    { name: 'Sneha Patel', email: 'sneha.p@example.com', overallScore: 88, aptitude: 88, communication: 85, interviews: 92, avatar: 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?w=100', hint: "woman headshot" },
    { name: 'Vikram Singh', email: 'vikram.s@example.com', overallScore: 79, aptitude: 82, communication: 70, interviews: 85, avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100', hint: "man portrait" },
]


export default function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Institution Analytics</h1>
          <p className="text-muted-foreground">An overview of student progress and performance at your institution.</p>
        </div>
         <Select defaultValue="last-30-days">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="all-time">All time</SelectItem>
            </SelectContent>
        </Select>
      </header>

      <main className="grid grid-cols-1 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Student Performance Overview</CardTitle>
                <CardDescription>A summary of student performance across all modules.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead className="text-center">Overall Score</TableHead>
                            <TableHead className="text-center">Aptitude</TableHead>
                            <TableHead className="text-center">Communication</TableHead>
                            <TableHead className="text-center">Interviews</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow key={student.email}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={student.avatar} data-ai-hint={student.hint}/>
                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{student.name}</p>
                                            <p className="text-xs text-muted-foreground">{student.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center font-code"><Badge>{student.overallScore}%</Badge></TableCell>
                                <TableCell className="text-center font-code">{student.aptitude}%</TableCell>
                                <TableCell className="text-center font-code">{student.communication}%</TableCell>
                                <TableCell className="text-center font-code">{student.interviews}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </div>
  )
}
