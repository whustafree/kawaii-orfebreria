"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import type { Product } from "@/lib/database.types";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const stats = {
    total: products.length,
    anillos: products.filter((p) => p.category === "anillos").length,
    collares: products.filter((p) => p.category === "collares").length,
    pulseras: products.filter((p) => p.category === "pulseras").length,
    aros: products.filter((p) => p.category === "aros").length,
    llaveros: products.filter((p) => p.category === "llaveros").length,
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás segura de eliminar este producto?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (!error) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text">
          Dashboard
        </h1>
        <p className="text-sm text-text-lighter mt-1">
          Gestiona tu catálogo de productos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {[
          { label: "Total", value: stats.total, color: "bg-primary" },
          { label: "Anillos", value: stats.anillos, color: "bg-pink" },
          { label: "Collares", value: stats.collares, color: "bg-lavender" },
          { label: "Pulseras", value: stats.pulseras, color: "bg-mint" },
          { label: "Aros", value: stats.aros, color: "bg-gold" },
          { label: "Llaveros", value: stats.llaveros, color: "bg-primary-light" },
        ].map((stat) => (
          <div key={stat.label} className="admin-card text-center">
            <div
              className={`w-8 h-8 rounded-full ${stat.color} bg-opacity-20 flex items-center justify-center mx-auto mb-2`}
            >
              <span className={`text-xs font-bold ${stat.color === "bg-primary" ? "text-white" : ""}`}>
                {stat.value}
              </span>
            </div>
            <p className="text-[10px] font-semibold text-text-lighter uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Product list */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-semibold text-text">
            Todos los Productos
          </h2>
          <Link
            href="/admin/productos/nuevo"
            className="btn-primary text-xs"
          >
            ➕ Nuevo Producto
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-10 text-text-lighter">
            <p className="text-lg mb-2">✨</p>
            <p className="text-sm">No hay productos todavía</p>
            <Link
              href="/admin/productos/nuevo"
              className="text-primary text-xs font-semibold hover:underline mt-2 inline-block"
            >
              Agregar el primer producto →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-2 font-semibold text-text-lighter">
                    Producto
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-text-lighter">
                    Categoría
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-text-lighter">
                    Precio
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-text-lighter">
                    Estado
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-text-lighter">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-50 hover:bg-cream/50 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-light to-cream flex items-center justify-center text-lg">
                            ✦
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-text">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-text-lighter">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-text-light capitalize">
                      {product.category}
                    </td>
                    <td className="py-3 px-2 text-right font-semibold text-text">
                      ${product.price.toLocaleString("es-CL")}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-[10px] font-semibold ${
                          product.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.is_active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/productos/${product.id}`}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-semibold hover:bg-blue-100 transition-colors"
                        >
                          ✏️ Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-[10px] font-semibold hover:bg-red-100 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
