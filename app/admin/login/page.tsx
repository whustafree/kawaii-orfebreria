"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();

      // Timeout after 10 seconds
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Tiempo de espera agotado. Revisa tu conexión o las credenciales de Supabase.")), 10000)
      );

      const loginPromise = supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      const result = await Promise.race([loginPromise, timeoutPromise]);

      if (!result) {
        throw new Error("Error inesperado al iniciar sesión");
      }

      const { error: authError } = result as Awaited<ReturnType<typeof supabase.auth.signInWithPassword>>;

      if (authError) {
        if (authError.message.includes("Invalid login credentials")) {
          throw new Error("Email o contraseña incorrectos");
        }
        throw authError;
      }

      // Successful login - redirect to admin
      router.push("/admin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-cream-alt to-cream p-5">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl text-gold mb-2">✦</div>
          <h1 className="font-heading text-2xl font-bold text-text">
            Kawaii Orfebrería
          </h1>
          <p className="text-sm text-text-lighter">Panel de Administración</p>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl p-8 shadow-sm border border-primary-light/10"
        >
          <h2 className="font-heading text-lg font-semibold text-text mb-6 text-center">
            Iniciar Sesión
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3 mb-4">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="input-field"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Entrando...
              </span>
            ) : (
              "✦ Entrar al Panel"
            )}
          </button>

          {loading && (
            <p className="text-[10px] text-text-lighter text-center mt-3">
              Conectando con Supabase...
            </p>
          )}
        </form>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-text-lighter hover:text-primary transition-colors"
          >
            ← Volver al sitio web
          </a>
        </div>
      </div>
    </div>
  );
}
