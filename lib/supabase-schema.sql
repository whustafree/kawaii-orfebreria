-- ============================================
-- Kawaii Orfebrería — Supabase Schema
-- ============================================
-- EJECUTA ESTO EN: Supabase Dashboard → SQL Editor
-- ============================================

-- 1. Crear tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  materials TEXT,
  price INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('anillos', 'collares', 'pulseras', 'aros', 'llaveros')),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at DESC);

-- 3. Bucket de Storage para imágenes de productos
-- Ejecuta esto en: Supabase Dashboard → Storage → Create bucket
-- Nombre: product-images
-- Público: ON

-- 4. Política de seguridad para Storage (bucket público)
-- NOTA: Ejecuta esto DESPUÉS de crear el bucket
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Auth Upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Auth Delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );

-- 5. Row Level Security para la tabla products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Todos pueden leer productos activos
CREATE POLICY "Public Read Active" ON products
  FOR SELECT USING (is_active = true);

-- Admin puede leer todos los productos
CREATE POLICY "Auth Read All" ON products
  FOR SELECT USING (auth.role() = 'authenticated');

-- Admin puede insertar
CREATE POLICY "Auth Insert" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Admin puede actualizar
CREATE POLICY "Auth Update" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Admin puede eliminar
CREATE POLICY "Auth Delete" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- DATOS INICIALES (opcional)
-- ============================================
-- INSERT INTO products (name, description, materials, price, category, is_active) VALUES
-- ('Anillo Corazón Kawaii', 'Anillo artesanal con dije de corazón rosa kawaii.', 'Plata 925 · Resina rosa · Baño de oro rosa', 29900, 'anillos', true),
-- ('Anillo Luna Mágica', 'Anillo con luna creciente y estrella fugaz. Inspirado en Sailor Moon.', 'Plata 925 · Zirconia · Calado artesanal', 35900, 'anillos', true);
