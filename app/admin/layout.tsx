"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import AdminSidebar from "@/components/AdminSidebar";

type AuthState = "loading" | "authenticated" | "unauthenticated" | "error";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [userEmail, setUserEmail] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const supabase = createClient();

      // Timeout after 8 seconds
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Tiempo de espera agotado")), 8000)
      );

      const sessionPromise = supabase.auth.getSession();
      const result = await Promise.race([sessionPromise, timeoutPromise]);

      if (!result || !result.data?.session) {
        setAuthState("unauthenticated");
        router.push("/admin/login");
        return;
      }

      setUserEmail(result.data.session.user.email ?? "");
      setAuthState("authenticated");
    } catch (err) {
      console.error("Auth check failed:", err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Error de conexión con el servidor de autenticación"
      );
      setAuthState("error");
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore errors on logout
    }
    router.push("/admin/login");
  };

  const handleRetry = () => {
    setAuthState("loading");
    setErrorMsg("");
    checkAuth();
  };

  // Loading state
  if (authState === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-sm text-text-lighter">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (authState === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream p-5">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-sm border border-red-100">
          <span className="text-4xl block mb-4">⚠️</span>
          <h2 className="font-heading text-lg font-semibold text-text mb-2">
            Error de conexión
          </h2>
          <p className="text-sm text-text-light mb-1">
            No se pudo conectar con Supabase para verificar tu sesión.
          </p>
          <p className="text-xs text-red-500 mb-4 bg-red-50 rounded-xl px-3 py-2">
            {errorMsg}
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={handleRetry} className="btn-primary text-sm">
              Reintentar
            </button>
            <a href="/admin/login" className="btn-secondary text-sm">
              Ir al Login
            </a>
          </div>
          <a
            href="/"
            className="block text-xs text-text-lighter hover:text-primary mt-4 transition-colors"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  // Unauthenticated — redirect is in progress, show minimal UI
  if (authState === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-sm text-text-lighter">Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  // Authenticated — show admin panel
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 bg-cream-alt p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-text-lighter">Bienvenida,</p>
            <p className="font-heading font-semibold text-text">{userEmail}</p>
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
