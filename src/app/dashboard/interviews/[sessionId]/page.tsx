
"use client";

import InterviewSession from "@/components/dashboard/interviews/InterviewSession";

export default function InterviewSessionPage() {
    // In a real app, you would fetch session details based on sessionId
    // For now, we'll use mock data.
    const mockSession = {
        id: '123',
        type: 'Technical',
        questions: [
            { id: 1, text: "Tell me about a challenging project you've worked on. What was your role?", expertTip: "Structure your answer using the STAR method: Situation, Task, Action, and Result. Start by briefly describing the project and its goal." },
            { id: 2, text: "How do you handle disagreements with your team members?", expertTip: "Focus on collaboration and finding a mutually agreeable solution. Emphasize open communication and respecting different perspectives." },
            { id: 3, text: "Where do you see yourself in five years?", expertTip: "Show ambition and a desire for growth within the company. Align your goals with the company's long-term vision." },
        ]
    }

    return <InterviewSession session={mockSession} />;
}
