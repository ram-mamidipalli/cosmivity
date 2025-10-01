
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState(user?.user_metadata.name || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSaveChanges = async () => {
    if (!fullName.trim()) {
        toast({
            variant: "destructive",
            title: "Name is required",
            description: "Please enter your full name.",
        });
        return;
    }
    
    setIsSavingProfile(true);
    const { error } = await supabase.auth.updateUser({
      data: { name: fullName }
    });

    if (error) {
        toast({
            variant: "destructive",
            title: "Error updating profile",
            description: error.message,
        });
    } else {
        toast({
            title: "Settings Saved",
            description: "Your changes have been saved successfully.",
        });
    }
    setIsSavingProfile(false);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
        toast({
            variant: "destructive",
            title: "Passwords do not match",
            description: "Please ensure the new passwords match.",
        });
        return;
    }
    if (newPassword.length < 6) {
        toast({
            variant: "destructive",
            title: "Password too short",
            description: "Password should be at least 6 characters.",
        });
        return;
    }

    setIsChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
        toast({
            variant: "destructive",
            title: "Error changing password",
            description: error.message,
        });
    } else {
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }
    setIsChangingPassword(false);
  };

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
                                    <AvatarImage src={user?.user_metadata.avatar_url || ""} data-ai-hint="boy icon" />
                                    <AvatarFallback>{user?.user_metadata.name?.[0] || <UserIcon />}</AvatarFallback>
                                </Avatar>
                                <Button variant="outline"><Upload className="mr-2"/>Change Photo</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={user?.email || ""} disabled />
                                </div>
                            </div>
                             <div className="flex justify-end">
                                <Button onClick={handleSaveChanges} disabled={isSavingProfile}>
                                    {isSavingProfile ? "Saving..." : "Save Changes"}
                                </Button>
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
                                <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Supabase doesn't require current password"/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handlePasswordChange} disabled={isChangingPassword}>
                                    {isChangingPassword ? "Updating..." : "Update Password"}
                                </Button>
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
