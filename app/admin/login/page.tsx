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
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      router.push("/admin");
      router.refresh();
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
          <span className="text-4xl text-gold">✦</span>
          <h1 className="font-heading text-2xl font-bold text-text mt-2">
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
              {error}
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
            className="btn-primary w-full justify-center mt-6 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "✦ Entrar al Panel"}
          </button>

          <p className="text-[10px] text-text-lighter text-center mt-4">
            Para crear una cuenta, ve a Supabase Authentication &gt; Users &gt;
            Add User
          </p>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-xs text-text-lighter hover:text-primary transition-colors">
            ← Volver al sitio web
          </a>
        </div>
      </div>
    </div>
  );
}
