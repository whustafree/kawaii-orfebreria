"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import ProductCard from "@/components/ProductCard";
import type { Product, Category } from "@/lib/database.types";
import { CATEGORIES, WHATSAPP_NUMBER } from "@/lib/database.types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    async function loadProducts() {
      const supabase = createClient();
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (data) setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  const handleContactWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("¡Hola! ✿ Quería consultar por sus productos")}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* ========== HEADER ========== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-xl shadow-sm py-3"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="text-gold text-xl">✦</span>
            <span className="font-heading font-bold text-text text-lg">
              Kawaii Orfebrería
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Inicio", href: "#inicio" },
              { label: "Catálogo", href: "#catalogo" },
              { label: "Sobre Mí", href: "#sobre-mi" },
              { label: "Contacto", href: "#contacto" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-text-light hover:text-primary-dark hover:bg-primary-light/10 transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menú"
          >
            <span
              className={`block w-6 h-0.5 bg-text rounded transition-all ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text rounded transition-all ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text rounded transition-all ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden bg-cream/98 backdrop-blur-xl border-t border-primary-light/10 px-5 py-4 flex flex-col items-center gap-2">
            {[
              { label: "Inicio", href: "#inicio" },
              { label: "Catálogo", href: "#catalogo" },
              { label: "Sobre Mí", href: "#sobre-mi" },
              { label: "Contacto", href: "#contacto" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl text-sm font-medium text-text-light hover:text-primary-dark hover:bg-primary-light/10 transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ========== HERO ========== */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream-alt to-cream" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink rounded-full blur-3xl" />
        </div>

        {/* Floating particles */}
        {["✦", "✧", "♥", "☆", "✿", "♡"].map((char, i) => (
          <span
            key={i}
            className="absolute text-gold/20 text-lg animate-float pointer-events-none"
            style={{
              top: `${15 + i * 10}%`,
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {char}
          </span>
        ))}

        <div className="relative text-center max-w-2xl mx-auto px-5">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold-light/20 border border-gold/20 px-4 py-2 rounded-full mb-6">
            ✦ Orfebrería Femenina ✦
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-text mb-4">
            Artesanía Kawaii
            <br />
            <span className="text-primary italic">Hecha a Mano</span>
          </h1>
          <p className="text-text-light text-base md:text-lg mb-8 leading-relaxed">
            Joyas únicas con alma anime ✿
            <br />
            Cada pieza cuenta una historia mágica
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#catalogo" className="btn-primary">
              ✦ Explorar Catálogo
            </a>
            <button onClick={handleContactWhatsApp} className="btn-secondary">
              💬 Contactar
            </button>
          </div>
        </div>
      </section>

      {/* ========== CATEGORY STRIP ========== */}
      <div className="sticky top-0 z-40 bg-cream border-y border-primary-light/10 py-3 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-5 flex gap-2 min-w-max">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === "all"
                ? "bg-primary text-white shadow-md"
                : "text-text-light hover:text-primary-dark hover:bg-primary-light/10"
            }`}
          >
            ✦ Todo
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filter === cat.value
                  ? "bg-primary text-white shadow-md"
                  : "text-text-light hover:text-primary-dark hover:bg-primary-light/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========== CATALOG ========== */}
      <section id="catalogo" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="section-tag">✦ Catálogo ✦</span>
            <h2 className="section-title">
              Nuestras <span className="text-primary italic">Creaciones</span>
            </h2>
            <p className="text-text-light text-sm max-w-lg mx-auto">
              Cada joya está hecha a mano con amor, fusionando la magia del
              anime con la tradición orfebre chilena.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-text-lighter">
              <p className="text-lg">✨ No hay productos en esta categoría</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="sobre-mi" className="py-16 md:py-24 bg-cream-alt relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink via-gold to-lavender" />
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-cream to-pink-light border-2 border-dashed border-primary-light/30 flex flex-col items-center justify-center gap-3">
                <span className="text-5xl">✿</span>
                <span className="text-sm text-text-lighter italic">
                  Tu foto aquí
                </span>
              </div>
              <span className="absolute -bottom-3 -right-3 bg-gradient-to-r from-gold to-gold-light text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg">
                ✦ Artesana ✦
              </span>
            </div>
            <div>
              <span className="section-tag">✿ Sobre Mí ✿</span>
              <h2 className="section-title">
                Creando <span className="text-primary italic">Magia</span> en
                Cada Pieza
              </h2>
              <p className="text-text-light text-sm leading-relaxed mb-4">
                Soy una orfebre chilena apasionada por el arte anime y la
                cultura kawaii. Cada joya que creo es una pieza única,
                fusionando técnicas tradicionales de orfebrería con diseños
                inspirados en el universo anime.
              </p>
              <p className="text-text-light text-sm leading-relaxed mb-6">
                Trabajo con plata 925, resinas de colores, zirconias y
                materiales cuidadosamente seleccionados para crear piezas que
                cuentan historias. Mi taller está en Chile y cada pedido se hace
                con amor y dedicación.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["🖐️", "Hecho a mano"],
                  ["🇨🇱", "Artesanía chilena"],
                  ["♻️", "Materiales éticos"],
                  ["🎨", "Diseño único"],
                ].map(([icon, label], i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-3 border border-primary-light/10"
                  >
                    <span className="text-lg">{icon}</span>
                    <span className="text-xs font-semibold text-text">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contacto" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="section-tag">💬 Contacto</span>
            <h2 className="section-title">
              ¿Te gusta <span className="text-primary italic">alguna pieza</span>
              ?
            </h2>
            <p className="text-text-light text-sm max-w-lg mx-auto">
              Cada joya es personalizable. Escríbeme por WhatsApp y la hacemos
              realidad ✨
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {[
              {
                icon: "💬",
                title: "Consultas por WhatsApp",
                desc: "Todos los precios y disponibilidad se consultan directamente por WhatsApp.",
                action: (
                  <button
                    onClick={handleContactWhatsApp}
                    className="btn-primary text-sm"
                  >
                    ✦ Escribir al WhatsApp
                  </button>
                ),
              },
              {
                icon: "🎀",
                title: "Personalización",
                desc: "¿Quieres un diseño único? Cuéntame tu idea y la creamos juntas.",
              },
              {
                icon: "🇨🇱",
                title: "Envíos a Todo Chile",
                desc: "Hacemos envíos a todo el país. También puedes retirar en persona en la RM.",
              },
            ].map((card, i) => (
              <div key={i} className="card p-8 text-center">
                <span className="text-3xl block mb-4">{card.icon}</span>
                <h3 className="font-heading font-semibold text-text mb-2">
                  {card.title}
                </h3>
                <p className="text-text-light text-xs leading-relaxed mb-4">
                  {card.desc}
                </p>
                {"action" in card && card.action}
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-xl mx-auto">
            <h3 className="font-heading text-xl font-semibold text-center text-text mb-6">
              Preguntas Frecuentes
            </h3>
            <div className="space-y-2">
              {[
                {
                  q: "¿Cómo hago un pedido?",
                  a: "Selecciona la pieza que te guste del catálogo y haz clic en 'Consultar por WhatsApp'. Te responderé con los detalles de precio, disponibilidad y tiempo de entrega.",
                },
                {
                  q: "¿Hacen envíos internacionales?",
                  a: "Por ahora solo realizamos envíos dentro de Chile. ¡Pronto abriremos envíos internacionales!",
                },
                {
                  q: "¿Los productos son personalizables?",
                  a: "¡Sí! Me encanta crear piezas únicas. Contáctame por WhatsApp con tu idea y la hacemos realidad.",
                },
                {
                  q: "¿Cuál es el tiempo de entrega?",
                  a: "Los productos hechos a mano tardan entre 5 a 12 días hábiles, dependiendo de la complejidad del diseño.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden border border-primary-light/10"
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-text hover:text-primary-dark transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-gold text-xs transition-transform ${
                        faqOpen === i ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      faqOpen === i ? "max-h-40 pb-4" : "max-h-0"
                    }`}
                  >
                    <p className="px-5 text-xs text-text-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-[#3D2C23] text-white/80 pt-14">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            <div>
              <a href="#" className="flex items-center gap-2 mb-3">
                <span className="text-gold">✦</span>
                <span className="font-heading font-semibold text-white">
                  Kawaii Orfebrería
                </span>
              </a>
              <p className="text-xs text-white/50 leading-relaxed">
                Joyas artesanales con alma anime ✿ Hechas a mano en Chile con
                amor.
              </p>
            </div>
            <div>
              <h4 className="font-body text-[10px] font-semibold tracking-widest uppercase text-gold mb-4">
                Navegación
              </h4>
              <ul className="space-y-2">
                {[
              { label: "Inicio", href: "#inicio" },
              { label: "Catálogo", href: "#catalogo" },
              { label: "Sobre Mí", href: "#sobre-mi" },
              { label: "Contacto", href: "#contacto" },
            ].map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-xs text-white/50 hover:text-gold transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-body text-[10px] font-semibold tracking-widest uppercase text-gold mb-4">
                Categorías
              </h4>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat.value}>
                    <a
                      href="#catalogo"
                      onClick={() => setFilter(cat.value)}
                      className="text-xs text-white/50 hover:text-gold transition-colors"
                    >
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-body text-[10px] font-semibold tracking-widest uppercase text-gold mb-4">
                Redes
              </h4>
              <div className="flex gap-2">
                {["📸", "💬", "🎵", "📌"].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg hover:bg-gold/20 hover:-translate-y-0.5 transition-all"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="py-6 text-center">
            <p className="text-[11px] text-white/30">
              © 2026 Kawaii Orfebrería — Hecho con ♡ en Chile
            </p>
            <p className="text-[10px] text-white/20 mt-0.5">
              ✿ Diseños originales protegidos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
