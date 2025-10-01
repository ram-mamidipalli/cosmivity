
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully.",
    });
  }

  const handlePasswordChange = () => {
     toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  }

  return (
    <div className="flex flex-col gap-8">
        <header>
            <h1 className="text-3xl font-bold font-headline">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </header>

        <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
            <TabsList className="flex md:flex-col h-auto md:h-full bg-transparent p-0 w-full md:w-1/4">
                <TabsTrigger value="profile" className="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">My Profile</TabsTrigger>
                <TabsTrigger value="security" className="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">Account Security</TabsTrigger>
                <TabsTrigger value="appearance" className="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">Appearance</TabsTrigger>
            </TabsList>
            <div className="w-full md:w-3/4">
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Profile</CardTitle>
                            <CardDescription>Update your personal information and profile picture.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cHJvZmlsZXxlbnwwfHx8fDE3NTgwMTYyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080" data-ai-hint="boy icon" />
                                    <AvatarFallback><UserIcon /></AvatarFallback>
                                </Avatar>
                                <Button variant="outline"><Upload className="mr-2"/>Change Photo</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue={user?.user_metadata.name || "Aakash"} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" defaultValue={user?.email} disabled />
                                </div>
                            </div>
                             <div className="flex justify-end">
                                <Button onClick={handleSaveChanges}>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Security</CardTitle>
                            <CardDescription>Change your password to keep your account secure.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handlePasswordChange}>Update Password</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>Customize the look and feel of the application.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Appearance settings coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </div>
        </Tabs>
    </div>
  );
}
