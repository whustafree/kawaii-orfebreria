"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase-client";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const supabase = getSupabaseClient();
        const { data } = await supabase.auth.getSession();

        if (cancelled) return;

        if (!data.session) {
          router.replace("/admin/login");
          return;
        }

        setUser({ email: data.session.user.email ?? "" });
      } catch (err) {
        console.error("Auth error:", err);
        if (!cancelled) router.replace("/admin/login");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    checkAuth();
    return () => { cancelled = true; };
  }, [router]);

  const handleLogout = async () => {
    try {
      const supabase = getSupabaseClient();
      await supabase.auth.signOut();
    } catch {}
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-text-lighter">Bienvenida,</p>
            <p className="font-heading font-semibold text-text">{user.email}</p>
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
