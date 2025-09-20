
"use client";

import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 animated-gradient -z-10"></div>
      <AuthForm />
    </div>
  );
}
