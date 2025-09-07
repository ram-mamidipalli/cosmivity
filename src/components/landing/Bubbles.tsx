import { Book, FileText, Laptop, MessageSquare, Mic } from "lucide-react";

const icons = [
    <Mic key="mic" />,
    <Laptop key="laptop" />,
    <Book key="book" />,
    <FileText key="resume" />,
    <MessageSquare key="chat" />,
    <Mic key="mic2" />,
    <Laptop key="laptop2" />,
    <Book key="book2" />,
    <FileText key="resume2" />,
    <MessageSquare key="chat2" />,
]

export default function Bubbles() {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute inset-0 bubbles">
                {icons.map((icon, i) => (
                    <div key={i} className="bubble">
                        {icon}
                    </div>
                ))}
            </div>
        </div>
    )
}
