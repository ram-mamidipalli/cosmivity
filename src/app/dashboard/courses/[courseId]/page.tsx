
"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, BarChart, Clock, Film, FileText, Trophy, Infinity, Users, Check, MessageSquare, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data, in a real app this would be fetched based on courseId
const courseData = {
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    subtitle: "Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600",
    hint: "react logo",
    rating: 4.6,
    reviews: 188734,
    students: "786,966",
    instructor: "Maximilian Schwarzmüller",
    lastUpdated: "June 2024",
    language: "English",
    tags: ["React", "Bestseller"],
    price: "449",
    originalPrice: "3199",
    includes: [
        { icon: <Film/>, text: "48.5 hours on-demand video" },
        { icon: <FileText/>, text: "79 coding exercises" },
        { icon: <FileText/>, text: "50 articles" },
        { icon: <Trophy/>, text: "Certificate of completion" },
    ],
    curriculum: [
        { title: "Getting Started", items: ["Course Introduction", "What is React?", "Setting up the Development Environment"] },
        { title: "React Basics & Working with Components", items: ["Understanding JSX", "Creating Functional Components", "Props and State"] },
        { title: "Styling React Components & Working with CSS", items: ["Styled Components", "CSS Modules", "Tailwind CSS Integration"] },
        { title: "Debugging React Apps", items: ["Using React DevTools", "Error Boundaries", "Common Pitfalls"] },
        { title: "Advanced Concepts: Context API & Hooks", items: ["useContext for State Management", "Custom Hooks", "useReducer"] },
    ],
    reviewsData: [
        { name: "Priya S.", rating: 5, text: "This is the best React course I've ever taken. Max explains everything so clearly. Highly recommended!", avatar: "PS" },
        { name: "Rohan K.", rating: 5, text: "Incredible content and very well-structured. I went from knowing nothing about React to building complex apps.", avatar: "RK" },
        { name: "Anjali M.", rating: 4, text: "A bit fast-paced at times, but overall a fantastic course. The projects are very practical.", avatar: "AM" },
    ]
};

export default function CourseDetailsPage() {
    const params = useParams();
    const courseId = params.courseId;

    return (
        <div className="flex flex-col gap-8 pb-16">
            <header className="bg-primary text-primary-foreground py-12">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <div className="lg:col-span-2 space-y-4">
                     <h1 className="text-4xl font-bold font-headline">{courseData.title}</h1>
                     <p className="text-xl text-primary-foreground/80">{courseData.subtitle}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                             <span className="font-bold text-yellow-400">{courseData.rating}</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(courseData.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400/50'}`}/>
                                ))}
                            </div>
                        </div>
                        <span className="text-sm">({courseData.reviews.toLocaleString()} ratings)</span>
                        <span className="text-sm">{courseData.students.toLocaleString()} students</span>
                      </div>
                      <p className="text-sm">Created by {courseData.instructor}</p>
                   </div>
                </div>
            </header>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-24">
                <main className="lg:col-span-2">
                    <Card className="p-6">
                        <CardTitle className="mb-4">What you'll learn</CardTitle>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Build powerful, fast, user-friendly and reactive web apps",
                                "Provide amazing user experiences by leveraging the power of JavaScript with ease",
                                "Apply for high-paid jobs or work as a freelancer in one of the most-demanded sectors in web development",
                                "Learn all about React Hooks and React Components",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 mt-1 text-primary flex-shrink-0"/>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <div className="mt-8">
                         <h2 className="text-2xl font-bold font-headline mb-4">Course Content</h2>
                         <Accordion type="single" collapsible className="w-full">
                            {courseData.curriculum.map((section, i) => (
                                <AccordionItem value={`item-${i}`} key={i}>
                                    <AccordionTrigger className="font-semibold">{section.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-2">
                                            {section.items.map((item, j) => (
                                                <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                                    <PlayCircle className="h-4 w-4 text-primary"/>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                     <div className="mt-8">
                         <h2 className="text-2xl font-bold font-headline mb-4">Student Feedback</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             {courseData.reviewsData.map((review, i) => (
                                 <Card key={i} className="p-4">
                                     <div className="flex items-center gap-2 mb-2">
                                         <div className="flex">
                                            {[...Array(5)].map((_, j) => (
                                                <Star key={j} className={`h-4 w-4 ${j < review.rating ? 'text-orange-500 fill-orange-500' : 'text-muted-foreground'}`}/>
                                            ))}
                                         </div>
                                     </div>
                                     <p className="italic text-muted-foreground">"{review.text}"</p>
                                     <p className="font-semibold mt-2">- {review.name}</p>
                                 </Card>
                             ))}
                         </div>
                     </div>

                </main>
                <aside className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader className="p-0">
                           <Image src={courseData.image} alt={courseData.title} width={600} height={400} className="rounded-t-lg" data-ai-hint={courseData.hint} />
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold">₹{courseData.price}</span>
                                <span className="text-lg text-muted-foreground line-through">₹{courseData.originalPrice}</span>
                                <span className="text-lg font-semibold text-destructive">86% off</span>
                            </div>
                            <Button className="w-full mt-4 neon-glow">Enroll Now</Button>
                            <Button variant="outline" className="w-full mt-2">Add to Wishlist</Button>
                             <div className="text-center text-sm text-muted-foreground mt-4">30-Day Money-Back Guarantee</div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0 flex-col items-start gap-4">
                             <h3 className="font-semibold">This course includes:</h3>
                             <ul className="space-y-2 text-sm">
                                {courseData.includes.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                             </ul>
                        </CardFooter>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
