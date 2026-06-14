"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase-client";

interface ImageUploadProps {
  currentImage?: string | null;
  onUploadComplete: (url: string) => void;
}

export default function ImageUpload({
  currentImage,
  onUploadComplete,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten imágenes (JPG, PNG, WEBP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar los 5MB");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      setPreview(publicUrl);
      onUploadComplete(publicUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al subir la imagen"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-text">
        Imagen del producto
      </label>

      <div
        onClick={() => fileRef.current?.click()}
        className={`relative aspect-square max-w-[250px] rounded-xl border-2 border-dashed cursor-pointer overflow-hidden transition-all ${
          preview
            ? "border-primary-light"
            : "border-gray-200 hover:border-primary-light"
        }`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-text-lighter">
            <span className="text-3xl">📸</span>
            <span className="text-xs text-center">
              Haz clic para subir una imagen
            </span>
            <span className="text-[10px]">JPG, PNG, WEBP (max 5MB)</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {currentImage && !preview?.includes("storage") && (
        <p className="text-[11px] text-text-lighter">
          Imagen actual: {currentImage.split("/").pop()}
        </p>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
