
"use client";

import { useParams } from 'next/navigation';
import RoomHeader from '@/components/dashboard/challenges/RoomHeader';
import VideoParticipants from '@/components/dashboard/challenges/VideoParticipants';
import ChatArea from '@/components/dashboard/challenges/ChatArea';

export default function RoomPage() {
    const params = useParams();
    const roomId = params.roomId as string;

    // Mock data - in a real app, you would fetch this based on roomId
    const roomDetails = {
        title: "AI in Education Debate",
        participants: 4,
        maxParticipants: 8,
        time: "15:08"
    };

    const messages = [
        { sender: "Sarah Chen", time: "09:03 PM", text: "Welcome everyone! Let's start with the opening statements.", avatar: "https://placehold.co/40x40.png" },
        { sender: "Mike Johnson", time: "09:04 PM", text: "Great topic! I believe AI can enhance education but not replace teachers entirely.", avatar: "https://placehold.co/40x40.png" },
        { type: 'event', text: 'Priya Sharma joined the debate' },
        { sender: "Priya Sharma", time: "09:06 PM", text: "I disagree. AI can provide personalized learning at scale.", avatar: "https://placehold.co/40x40.png" },
    ];
    
    const participants = [
        { name: 'Sarah Chen', isHost: true, avatar: "https://placehold.co/400x300.png", isMuted: false },
        { name: 'Mike Johnson', avatar: "https://placehold.co/160x120.png", isMuted: false },
        { name: 'Priya Sharma', avatar: "https://placehold.co/160x120.png", isMuted: true },
        { name: 'You', avatar: "https://placehold.co/160x120.png", isMuted: false },
    ];

    return (
        <div className="flex flex-col min-h-[calc(100vh-theme(spacing.16))] bg-background text-foreground gap-4">
            <RoomHeader {...roomDetails} />
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
                <div className="lg:col-span-2">
                    <VideoParticipants participants={participants} />
                </div>
                <div className="lg:col-span-1 flex flex-col gap-4">
                    <ChatArea messages={messages} />
                </div>
            </div>
        </div>
    );
}
