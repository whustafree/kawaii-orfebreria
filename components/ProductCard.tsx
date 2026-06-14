"use client";

import type { Product } from "@/lib/database.types";
import { WHATSAPP_NUMBER } from "@/lib/database.types";

interface ProductCardProps {
  product: Product;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  anillos: "💍",
  collares: "📿",
  pulseras: "✨",
  aros: "💎",
  llaveros: "🔑",
};

const THEME_GRADIENTS: Record<string, string> = {
  pink: "from-pink-100 via-pink-50 to-white",
  lavender: "from-purple-100 via-purple-50 to-white",
  mint: "from-emerald-100 via-emerald-50 to-white",
  peach: "from-orange-100 via-orange-50 to-white",
  gold: "from-yellow-100 via-yellow-50 to-white",
  rose: "from-rose-100 via-rose-50 to-white",
};

const THEMES = ["pink", "lavender", "mint", "peach", "gold", "rose"];

function getTheme(id: number): string {
  return THEMES[id % THEMES.length];
}

export default function ProductCard({ product }: ProductCardProps) {
  const theme = getTheme(product.id);

  const handleWhatsApp = () => {
    const message =
      `¡Hola! ✿ Me encantaría consultar por un producto ✦\n\n` +
      `Me interesa: *${product.name}* 🎀\n` +
      `ID: #${product.id}\n\n` +
      `¿Me puedes dar el precio y disponibilidad? 💕`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <div
        className={`relative aspect-square bg-gradient-to-br ${THEME_GRADIENTS[theme]} flex items-center justify-center overflow-hidden`}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              {CATEGORY_EMOJIS[product.category] || "✦"}
            </span>
            <span className="text-xs text-text-lighter italic font-heading">
              {product.category}
            </span>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-primary-dark shadow-sm">
          {CATEGORY_EMOJIS[product.category]}{" "}
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-semibold text-text mb-1.5">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-text-light leading-relaxed mb-2 flex-1">
            {product.description}
          </p>
        )}
        {product.materials && (
          <p className="text-[11px] text-text-lighter mb-2 flex items-center gap-1">
            <span className="text-gold">✦</span> {product.materials}
          </p>
        )}
        <p className="font-heading text-lg font-bold text-primary-dark mb-4">
          ${product.price.toLocaleString("es-CL")}{" "}
          <span className="text-xs font-normal text-text-lighter font-body">
            CLP
          </span>
        </p>
        <button
          onClick={handleWhatsApp}
          className="btn-whatsapp w-full justify-center"
        >
          💬 Consultar Precio
        </button>
      </div>
    </div>
  );
}
