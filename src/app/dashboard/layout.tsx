import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-secondary/50">
      <DashboardSidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}
