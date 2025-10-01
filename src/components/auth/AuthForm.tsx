
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Briefcase, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

function AuthFormContent() {
  const [authType, setAuthType] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleEmailPasswordAuth = async () => {
    setIsLoading(true);
    if (authType === 'signup') {
      if (password !== confirmPassword) {
        toast({ variant: "destructive", title: "Passwords do not match" });
        setIsLoading(false);
        return;
      }
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name: `${firstName} ${lastName}`,
            mobile_number: mobileNumber,
            age: parseInt(age, 10),
            gender: gender,
          }
        }
      });
      if (error) {
        toast({ variant: "destructive", title: "Sign up failed", description: error.message });
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } else { // signin
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ variant: "destructive", title: "Sign in failed", description: error.message });
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    }
  };

  const isSignUp = authType === 'signup';
  const isSignIn = authType === 'signin';
  const isInstitution = authType === 'institution';
  
  const getTitle = () => {
      if (isSignUp) return 'Create a Student Account';
      if (isSignIn) return 'Welcome Back';
      if (isInstitution) return 'Institution Registration';
      return 'Get Started';
  }

  const getDescription = () => {
      if (isSignUp) return 'Enter your details to get started on your career journey.';
      if (isSignIn) return 'Enter your credentials to access your account.';
      if (isInstitution) return 'Register your college to partner with Cosmivity.';
      return 'Sign in or sign up.';
  }

  return (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
            <Link href="/" className="font-bold text-2xl text-primary relative">
                Cosmivity
            </Link>
        </div>
        <CardTitle className="text-2xl font-headline">{getTitle()}</CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
         <div className="mb-4 grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
            <Button
              onClick={() => setAuthType('signin')}
              variant={isSignIn ? 'default' : 'ghost'}
              className={cn(isSignIn && 'shadow-sm')}
            >
              Sign In
            </Button>
            <Button
              onClick={() => setAuthType('signup')}
              variant={isSignUp ? 'default' : 'ghost'}
              className={cn(isSignUp && 'shadow-sm')}
            >
              Sign Up
            </Button>
            <Button
                variant={'outline'}
                className={'w-full'}
                disabled
            >
                <Lock className="mr-2 h-4 w-4" />
                For Institutions
            </Button>
          </div>
        <div className="grid gap-4">
          {isSignUp && !isInstitution && (
             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Max" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Robinson" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
            </div>
          )}
           {isInstitution && (
             <>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="college-name">College Name</Label>
                        <Input id="college-name" placeholder="e.g. IIT Bombay" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="admin-name">Administrator Name</Label>
                        <Input id="admin-name" placeholder="e.g. Dr. A. P. J. Abdul Kalam" required />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="institution-address">Institution Address</Label>
                    <Textarea id="institution-address" placeholder="Enter the full address of the institution" required />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="institution-id">Institution ID</Label>
                    <Input id="institution-id" placeholder="e.g., UGC ID, AISHE Code" required />
                </div>
            </>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {isSignUp && !isInstitution && (
            <>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="mobile-number">Mobile Number</Label>
                        <Input id="mobile-number" type="tel" placeholder="e.g. +91 9876543210" required value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" placeholder="e.g. 21" required value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                </div>
                <div className="grid gap-2">
                <Label>Gender</Label>
                <RadioGroup defaultValue={gender} onValueChange={setGender} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                    </div>
                </RadioGroup>
                </div>
            </>
          )}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          )}
          <Button type="submit" className="w-full" onClick={isInstitution ? () => router.push('/dashboard/admin') : handleEmailPasswordAuth} disabled={isLoading}>
            {isLoading ? "Processing..." : isSignUp ? 'Create Account' : isSignIn ? 'Sign In' : 'Register Institution'}
          </Button>
        </div>
      </CardContent>
    </>
  );
}

const DynamicAuthFormContent = dynamic(() => Promise.resolve(AuthFormContent), {
  ssr: false,
});

export default function AuthForm() {
  return (
    <Card className="w-full max-w-lg">
      <DynamicAuthFormContent />
    </Card>
  );
}
