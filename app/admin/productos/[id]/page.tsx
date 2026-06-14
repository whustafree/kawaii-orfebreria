"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import ImageUpload from "@/components/ImageUpload";
import { CATEGORIES } from "@/lib/database.types";
import type { Product } from "@/lib/database.types";

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    materials: "",
    price: "",
    category: "anillos",
    is_active: true,
  });

  useEffect(() => {
    async function loadProduct() {
      const idStr = params.id;
      if (!idStr || Array.isArray(idStr)) {
        setLoading(false);
        return;
      }
      const productId = parseInt(idStr, 10);
      if (isNaN(productId)) {
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data } = await supabase
        .from("products")
        .select()
        .eq("id", productId)
        .single();

      if (data) {
        setForm({
          name: data.name,
          description: data.description || "",
          materials: data.materials || "",
          price: data.price.toString(),
          category: data.category,
          is_active: data.is_active,
        });
        setImageUrl(data.image_url || "");
      }
      setLoading(false);
    }
    loadProduct();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setForm({ ...form, [e.target.name]: value });
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
      const supabase = createClient();
      const idStr = params.id;
      if (!idStr || Array.isArray(idStr)) {
        setError("ID de producto inválido");
        setSaving(false);
        return;
      }
      const productId = parseInt(idStr, 10);
      if (isNaN(productId)) {
        setError("ID de producto inválido");
        setSaving(false);
        return;
      }

      const { error: updateError } = await supabase
        .from("products")
        .update({
          name: form.name,
          description: form.description || null,
          materials: form.materials || null,
          price,
          category: form.category,
          image_url: imageUrl || null,
          is_active: form.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", productId);

      if (updateError) throw updateError;
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar producto"
      );
    } finally {
      setSaving(false);
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
            Editar Producto
          </h1>
          <p className="text-sm text-text-lighter">
            Modifica los datos del producto
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
                required
                className="input-field"
              />
            </div>

            <div className="space-y-1.5 flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  name="is_active"
                  type="checkbox"
                  checked={form.is_active}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-xs font-semibold text-text">
                  Producto activo
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <ImageUpload
            currentImage={imageUrl}
            onUploadComplete={setImageUrl}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? "Guardando..." : "✦ Guardar Cambios"}
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
