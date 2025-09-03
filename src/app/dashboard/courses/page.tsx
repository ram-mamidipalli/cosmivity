
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ListFilter, Star, BookOpen, Clock, BarChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "@/components/dashboard/courses/CourseCard";

const courses = [
    {
        id: "react-basics",
        title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
        instructor: "Maximilian Schwarzmüller",
        rating: 4.6,
        reviews: 188734,
        price: "449",
        originalPrice: "3199",
        category: "Development",
        level: "All Levels",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400",
        hint: "react logo",
        tags: ["React", "Bestseller"],
    },
    {
        id: "js-mastery",
        title: "The Complete JavaScript Course 2024: From Zero to Expert!",
        instructor: "Jonas Schmedtmann",
        rating: 4.7,
        reviews: 201483,
        price: "449",
        originalPrice: "3499",
        category: "Development",
        level: "All Levels",
        image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&h=400",
        hint: "javascript code",
        tags: ["JavaScript", "Bestseller"],
    },
    {
        id: "python-bootcamp",
        title: "The Complete Python Bootcamp From Zero to Hero in Python",
        instructor: "Jose Portilla",
        rating: 4.6,
        reviews: 497864,
        price: "Free",
        originalPrice: "3199",
        category: "Development",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400",
        hint: "python code",
        tags: ["Python"],
    },
    {
        id: "ux-design",
        title: "User Experience Design Essentials - Adobe XD UI UX Design",
        instructor: "Daniel Walter Scott",
        rating: 4.6,
        reviews: 21671,
        price: "449",
        originalPrice: "3199",
        category: "Design",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400",
        hint: "ui design screen",
        tags: ["UX Design", "Highest Rated"],
    },
     {
        id: "data-science",
        title: "The Data Science Course 2024: Complete Data Science Bootcamp",
        instructor: "365 Careers",
        rating: 4.6,
        reviews: 129489,
        price: "Free",
        originalPrice: "3499",
        category: "Data Science",
        level: "All Levels",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400",
        hint: "data analytics chart",
        tags: ["Data Science"],
    },
    {
        id: "digital-marketing",
        title: "The Complete Digital Marketing Course - 12 Courses in 1",
        instructor: "Rob Percival, Daragh Walsh",
        rating: 4.5,
        reviews: 174677,
        price: "499",
        originalPrice: "3199",
        category: "Marketing",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400",
        hint: "marketing strategy",
        tags: ["Marketing", "Bestseller"],
    },
];

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-8">
        <header>
            <h1 className="text-3xl font-bold font-headline">Explore Courses</h1>
            <p className="text-muted-foreground">Expand your skills with our expert-led courses.</p>
        </header>

        <Card>
            <div className="p-4 flex flex-col sm:flex-row gap-4 border-b">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search for courses..." className="pl-10 pr-4 py-2 w-full" />
                </div>
                 <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Skill Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="w-full sm:w-auto flex-shrink-0">
                    <ListFilter className="mr-2"/> Filter
                </Button>
            </div>
             <div className="p-4">
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Courses</TabsTrigger>
                        <TabsTrigger value="my-courses">My Courses</TabsTrigger>
                        <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </TabsContent>
                     <TabsContent value="my-courses" className="mt-6">
                        <div className="text-center py-16">
                            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Your learning journey awaits</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Courses you enroll in will appear here.
                            </p>
                            <Button className="mt-6">Explore Courses</Button>
                        </div>
                     </TabsContent>
                      <TabsContent value="wishlist" className="mt-6">
                         <div className="text-center py-16">
                            <Star className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Add courses to your wishlist to save them for later.
                            </p>
                            <Button className="mt-6">Explore Courses</Button>
                        </div>
                     </TabsContent>
                </Tabs>
            </div>
        </Card>
    </div>
  );
}
