"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "📊 Dashboard", icon: "📊" },
    { href: "/admin/productos", label: "📦 Productos", icon: "📦" },
    { href: "/admin/productos/nuevo", label: "➕ Nuevo Producto", icon: "➕" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#3D2C23] text-white p-6 flex flex-col">
      <Link href="/admin" className="flex items-center gap-2 mb-10">
        <span className="text-gold text-xl">✦</span>
        <span className="font-heading text-lg font-semibold">
          Kawaii Admin
        </span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              pathname === link.href
                ? "bg-white/10 text-gold-light"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          ← Ver sitio web
        </Link>
      </div>
    </aside>
  );
}
