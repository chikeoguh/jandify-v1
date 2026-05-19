import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth-admin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/login");

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar admin={session} />
      <div className="flex-1 flex flex-col overflow-hidden lg:pt-0 pt-14">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
