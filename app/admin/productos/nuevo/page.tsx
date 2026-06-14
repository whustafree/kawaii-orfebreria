"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase-client";
import ImageUpload from "@/components/ImageUpload";
import { CATEGORIES } from "@/lib/database.types";

export default function NuevoProductoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    materials: "",
    price: "",
    category: "anillos",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const price = parseInt(form.price.replace(/\./g, ""));
    if (isNaN(price) || price <= 0) {
      setError("Ingresa un precio válido");
      setSaving(false);
      return;
    }

    try {
      const supabase = getSupabaseClient();
      const { error: insertError } = await (supabase.from("products") as any).insert({
        name: form.name,
        description: form.description || null,
        materials: form.materials || null,
        price,
        category: form.category,
        image_url: imageUrl || null,
        is_active: true,
      } as any);

      if (insertError) throw insertError;
      router.push("/admin/productos");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al guardar producto"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="text-text-lighter hover:text-text transition-colors"
        >
          ←
        </button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">
            Nuevo Producto
          </h1>
          <p className="text-sm text-text-lighter">
            Agrega un nuevo producto al catálogo
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-5 py-3">
            {error}
          </div>
        )}

        <div className="admin-card space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text">
                Nombre del producto *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej: Anillo Corazón Kawaii"
                required
                className="input-field"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text">
                Categoría *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input-field"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text">
              Descripción
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe el producto..."
              rows={3}
              className="input-field resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text">
              Materiales
            </label>
            <input
              name="materials"
              value={form.materials}
              onChange={handleChange}
              placeholder="Ej: Plata 925 · Resina rosa · Baño de oro rosa"
              className="input-field"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text">
                Precio (CLP) *
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="29900"
                required
                className="input-field"
              />
              <p className="text-[10px] text-text-lighter">
                Solo números, sin puntos ni comas
              </p>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <ImageUpload onUploadComplete={setImageUrl} />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? "Guardando..." : "✦ Guardar Producto"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
