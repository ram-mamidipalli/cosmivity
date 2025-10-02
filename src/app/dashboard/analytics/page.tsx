
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts"
import { BarChart, BrainCircuit, Mic, Users, FileText } from "lucide-react"
import { useEffect, useState } from "react"

const overallData = [
    { name: 'Aptitude', value: 75, fill: 'hsl(var(--primary))' },
    { name: 'Interviews', value: 85, fill: 'hsl(var(--chart-2))' },
    { name: 'Communication', value: 60, fill: 'hsl(var(--chart-3))' },
    { name: 'Resume', value: 90, fill: 'hsl(var(--chart-4))' },
];

const overallScore = Math.round(overallData.reduce((acc, item) => acc + item.value, 0) / overallData.length);

const defaultPieChartData = {
    aptitude: [
        { name: 'Quantitative', value: 400, fill: '#8884d8' },
        { name: 'Logical', value: 300, fill: '#82ca9d' },
        { name: 'Verbal', value: 300, fill: '#ffc658' },
        { name: 'Technical', value: 200, fill: '#ff8042' },
    ],
    interviews: [
        { name: 'Technical', value: 250, fill: '#0088FE' },
        { name: 'Behavioral', value: 350, fill: '#00C49F' },
        { name: 'HR Round', value: 200, fill: '#FFBB28' },
    ],
    communication: [
        { name: 'Fluency', value: 30, fill: '#FF8042' },
        { name: 'Clarity', value: 40, fill: '#8884d8' },
        { name: 'Confidence', value: 30, fill: '#82ca9d' },
    ],
    resume: [
        { name: 'Keywords', value: 80, fill: '#0088FE' },
        { name: 'Formatting', value: 95, fill: '#00C49F' },
        { name: 'Impact', value: 85, fill: '#FFBB28' },
    ],
}


export default function AnalyticsPage() {
    const [pieChartData, setPieChartData] = useState(defaultPieChartData);

    useEffect(() => {
        // In a real app, you would fetch this data from your backend.
        // For demonstration, we'll use mock data.
        const mockAptitudeScores = {
            "Percentages": 80,
            "Ratio & Proportion": 75,
            "Profit, Loss & Partnership": 90
        };

        const aptitudeData = Object.entries(mockAptitudeScores).map(([name, value], index) => ({
            name,
            value,
            fill: defaultPieChartData.aptitude[index % defaultPieChartData.aptitude.length].fill
        }));

        setPieChartData(prevData => ({
            ...prevData,
            aptitude: aptitudeData.length > 0 ? aptitudeData : prevData.aptitude
        }));

    }, [])

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Performance Analytics</h1>
          <p className="text-muted-foreground">An overview of your progress and skill development.</p>
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

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Overall Score</CardTitle>
                <CardDescription>A summary of your performance across all modules.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="mx-auto aspect-square h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart 
                            data={[{ name: 'Overall', value: overallScore }]} 
                            startAngle={90} 
                            endAngle={-270} 
                            innerRadius="70%" 
                            outerRadius="85%"
                            barSize={30}
                        >
                            <RadialBar 
                                dataKey='value'
                                background
                                cornerRadius={10} 
                                className="fill-primary"
                            />
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-foreground text-5xl font-bold"
                            >
                                {`${overallScore}%`}
                            </text>
                             <text
                                x="50%"
                                y="60%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-muted-foreground text-lg"
                            >
                                Overall Score
                            </text>
                        </RadialBarChart>
                    </ResponsiveContainer>
                 </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><BrainCircuit className="h-6 w-6 text-primary"/></div>
                <CardTitle>Aptitude Performance</CardTitle>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{}} className="mx-auto aspect-square h-[200px]">
                    <PieChart>
                        <Tooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={pieChartData.aptitude} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} />
                    </PieChart>
                 </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                 <div className="p-2 bg-primary/10 rounded-lg"><Users className="h-6 w-6 text-primary"/></div>
                <CardTitle>Mock Interviews</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="mx-auto aspect-square h-[200px]">
                    <PieChart>
                        <Tooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={pieChartData.interviews} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} />
                    </PieChart>
                 </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                 <div className="p-2 bg-primary/10 rounded-lg"><Mic className="h-6 w-6 text-primary"/></div>
                <CardTitle>Communication Lab</CardTitle>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{}} className="mx-auto aspect-square h-[200px]">
                    <PieChart>
                        <Tooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={pieChartData.communication} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} />
                    </PieChart>
                 </ChartContainer>
            </CardContent>
        </Card>

      </main>
    </div>
  )
}
