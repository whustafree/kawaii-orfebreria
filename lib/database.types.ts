export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          materials: string | null;
          price: number;
          category: string;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          materials?: string | null;
          price: number;
          category: string;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          materials?: string | null;
          price?: number;
          category?: string;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

export type Product = Database["public"]["Tables"]["products"]["Row"];

export const CATEGORIES = [
  { value: "anillos", label: "💍 Anillos" },
  { value: "collares", label: "📿 Collares" },
  { value: "pulseras", label: "✨ Pulseras" },
  { value: "aros", label: "💎 Aros" },
  { value: "llaveros", label: "🔑 Llaveros" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];

export const WHATSAPP_NUMBER = "56912345678"; // ← CAMBIA ESTO POR TU NÚMERO REAL
