"use client";

import { createBrowserClient } from "@supabase/ssr";

interface CookieOptions {
  path?: string;
  maxAge?: number;
  domain?: string;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
  httpOnly?: boolean;
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase URL o Anon Key no configurados. " +
      "Asegúrate de que NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY estén en .env.local o en Vercel."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        if (typeof document === "undefined") return null;
        const row = document.cookie
          .split("; ")
          .find((r) => r.startsWith(`${name}=`));
        if (!row) return null;
        return row.substring(name.length + 1);
      },
      set(name: string, value: string, options: CookieOptions) {
        if (typeof document === "undefined") return;
        const parts = [`${name}=${value}`];
        if (options.path) parts.push(`path=${options.path}`);
        if (options.maxAge) parts.push(`max-age=${options.maxAge}`);
        if (options.domain) parts.push(`domain=${options.domain}`);
        if (options.sameSite) parts.push(`samesite=${options.sameSite}`);
        if (options.secure) parts.push("secure");
        document.cookie = parts.join("; ");
      },
      remove(name: string, options: CookieOptions) {
        if (typeof document === "undefined") return;
        document.cookie = `${name}=; max-age=0; path=${options?.path || "/"}`;
      },
    },
  });
}
