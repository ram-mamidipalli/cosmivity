import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 animated-gradient -z-10"></div>
      <main className="container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto glassmorphic">
            <CardHeader>
                <CardTitle className="text-2xl font-headline text-center">Welcome to your Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center">
                    <p className="text-muted-foreground">This is your personal space. More features coming soon!</p>
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
