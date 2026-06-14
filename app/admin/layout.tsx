"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import AdminSidebar from "@/components/AdminSidebar";
import type { User } from "@supabase/supabase-js";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/admin/login");
        return;
      }

      setUser(session.user);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 bg-cream-alt p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-text-lighter">Bienvenida,</p>
            <p className="font-heading font-semibold text-text">
              {user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-text-lighter hover:text-red-500 transition-colors px-4 py-2 rounded-full border border-gray-200 hover:border-red-200"
          >
            Cerrar sesión
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
