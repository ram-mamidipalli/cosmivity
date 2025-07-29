"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, MessageSquare, UserCheck, BarChart, CheckCircle, ChevronDown } from "lucide-react";

const activityData = [
  {
    icon: <Award className="h-5 w-5 text-yellow-600" />,
    text: "Earned 'Debate Champion' badge",
    details: "Won 3 consecutive debates in the Communication Skills room",
    time: "2 hours ago",
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-blue-600" />,
    text: "Completed Mock Interview",
    details: "Technical interview simulation - Score: 85/100",
    time: "4 hours ago",
  },
  {
    icon: <UserCheck className="h-5 w-5 text-green-600" />,
    text: "Received feedback from Priya Sharma",
    details: "'Great improvement in pronunciation! Keep practicing.'",
    time: "6 hours ago",
  },
  {
    icon: <BarChart className="h-5 w-5 text-purple-600" />,
    text: "Reached Level 5 in Aptitude",
    details: "Solved 100+ quantitative reasoning problems",
    time: "1 day ago",
  },
  {
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    text: "Joined 'Interview Prep' study circle",
    details: "Connect with 24 other students preparing for placements",
    time: "1 day ago",
  },
];

export default function RecentActivity() {
  return (
    <Card className="glassmorphic">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>An overview of your latest accomplishments.</CardDescription>
            </div>
            <Button variant="link" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {activityData.map((activity, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 p-2 bg-background/50 rounded-full mt-1">
                            {activity.icon}
                        </div>
                        <div className="flex-grow min-w-0">
                            <p className="font-semibold">{activity.text}</p>
                            <p className="text-sm text-muted-foreground break-words">{activity.details}</p>
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{activity.time}</p>
                    </li>
                ))}
            </ul>
            <div className="text-center mt-6">
                <Button variant="outline" className="w-full sm:w-auto">
                    Load More Activities <ChevronDown className="h-4 w-4 ml-2"/>
                </Button>
            </div>
        </CardContent>
    </Card>
  );
}
