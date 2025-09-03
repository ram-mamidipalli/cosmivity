
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, BarChart, Clock, Heart } from "lucide-react";

export default function CourseCard({ course }: { course: any }) {
    const isFree = course.price.toLowerCase() === 'free';
    return (
        <Card className="hover:shadow-lg transition-shadow flex flex-col group overflow-hidden">
            <CardHeader className="p-0 relative">
                <Link href={`/dashboard/courses/${course.id}`}>
                    <Image 
                        src={course.image} 
                        alt={course.title} 
                        width={600} 
                        height={400} 
                        className="rounded-t-lg object-cover aspect-video transition-transform duration-300 group-hover:scale-105" 
                        data-ai-hint={course.hint} 
                    />
                </Link>
                <Button variant="secondary" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/70 hover:bg-background">
                    <Heart className="h-4 w-4"/>
                </Button>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <div className="flex flex-wrap gap-1 mb-2">
                    {course.tags.map((tag: string) => (
                        <Badge key={tag} variant={tag === 'Bestseller' ? 'default' : 'secondary'}>{tag}</Badge>
                    ))}
                </div>
                <h3 className="font-bold font-headline text-lg leading-tight h-12 overflow-hidden">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-orange-500">{course.rating}</span>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                             <Star key={i} className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-orange-500 fill-orange-500' : 'text-muted-foreground'}`}/>
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({course.reviews.toLocaleString()})</span>
                </div>
                 <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4"/> 8 total hours</span>
                    <span className="flex items-center gap-1.5"><BarChart className="h-4 w-4"/> {course.level}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
                 {isFree ? (
                    <span className="text-xl font-bold text-green-600">Free</span>
                 ): (
                     <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">₹{course.price}</span>
                        <span className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</span>
                    </div>
                 )}
                 <Button asChild>
                    <Link href={`/dashboard/courses/${course.id}`}>Enroll Now</Link>
                 </Button>
            </CardFooter>
        </Card>
    )
}
