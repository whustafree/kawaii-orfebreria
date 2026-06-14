/* ============================================
   Kawaii Orfebrería — Product Catalog Data
   ============================================ */

const PRODUCTS = [
  // ======== ANILLOS ========
  {
    id: 1,
    name: 'Anillo Corazón Kawaii',
    description: 'Anillo artesanal con dije de corazón rosa kawaii. Perfecto para las románticas.',
    materials: 'Plata 925 · Resina rosa · Baño de oro rosa',
    price: '29.900',
    category: 'anillos',
    emoji: '💗',
    theme: 'pink'
  },
  {
    id: 2,
    name: 'Anillo Luna Mágica',
    description: 'Anillo con luna creciente y estrella fugaz. Inspirado en Sailor Moon.',
    materials: 'Plata 925 · Zirconia · Calado artesanal',
    price: '35.900',
    category: 'anillos',
    emoji: '🌙',
    theme: 'lavender'
  },
  {
    id: 3,
    name: 'Anillo Gatito Sonriente',
    description: 'Anillo con silueta de gatito kawaii sonriendo. Un must para cat lovers.',
    materials: 'Plata 925 · Detalles esmaltados · Talla única',
    price: '32.900',
    category: 'anillos',
    emoji: '🐱',
    theme: 'peach'
  },
  {
    id: 4,
    name: 'Anillo Estrella Sailor',
    description: 'Anillo con estrella de cinco puntas y brillos. Como las sailor scouts.',
    materials: 'Plata 925 · Zirconias blancas · Pulido espejo',
    price: '38.900',
    category: 'anillos',
    emoji: '⭐',
    theme: 'gold'
  },
  {
    id: 5,
    name: 'Anillo Mariposa Pastel',
    description: 'Anillo con mariposa esmaltada en colores pastel. Super kawaii.',
    materials: 'Plata 925 · Esmalte pastel · Ala articulada',
    price: '36.900',
    category: 'anillos',
    emoji: '🦋',
    theme: 'mint'
  },

  // ======== COLLARES ========
  {
    id: 6,
    name: 'Collar Pokéball',
    description: 'Collar con dije de Pokéball en plata y resina roja/blanca. Atrapa todos.',
    materials: 'Plata 925 · Resina roja y blanca · Cadena ajustable',
    price: '42.900',
    category: 'collares',
    emoji: '🔴',
    theme: 'rose'
  },
  {
    id: 7,
    name: 'Collar Luna y Estrella',
    description: 'Collar con luna creciente y estrella danzante. Clásico mágico.',
    materials: 'Plata 925 · Cadena fina · Dije calado',
    price: '38.900',
    category: 'collares',
    emoji: '🌙',
    theme: 'lavender'
  },
  {
    id: 8,
    name: 'Collar Corazón Flotante',
    description: 'Collar con dije de corazón abierto con zirconia flotante.',
    materials: 'Plata 925 · Zirconia · Cadena de 45cm',
    price: '45.900',
    category: 'collares',
    emoji: '💕',
    theme: 'pink'
  },
  {
    id: 9,
    name: 'Collar Gatito Lunar',
    description: 'Collar con dije de gatito sentado en una luna. Dulce y místico.',
    materials: 'Plata 925 · Resina transparente · Cadena ajustable',
    price: '44.900',
    category: 'collares',
    emoji: '😺',
    theme: 'peach'
  },
  {
    id: 10,
    name: 'Collar Arcoíris Kawaii',
    description: 'Collar con dije de arcoíris con nubes kawaii. Pura felicidad.',
    materials: 'Plata 925 · Esmaltes de colores · Cadena dorada',
    price: '40.900',
    category: 'collares',
    emoji: '🌈',
    theme: 'gold'
  },

  // ======== PULSERAS ========
  {
    id: 11,
    name: 'Pulsera Charm Anime',
    description: 'Pulsera con charms intercambiables kawaii: corazón, estrella, luna y flor.',
    materials: 'Plata 925 · 7 charms · Cierre de seguridad',
    price: '34.900',
    category: 'pulseras',
    emoji: '🎀',
    theme: 'pink'
  },
  {
    id: 12,
    name: 'Pulsera Estrellas',
    description: 'Pulsera con pequeñas estrellas brillantes. Sutil y mágica.',
    materials: 'Plata 925 · Estrellas caladas · Cordón ajustable',
    price: '28.900',
    category: 'pulseras',
    emoji: '✨',
    theme: 'gold'
  },
  {
    id: 13,
    name: 'Pulsera Corazones',
    description: 'Pulsera tejida con cuentas de corazones kawaii. Dulce y delicada.',
    materials: 'Hilo encerado · Cuentas plata 925 · Corazones esmaltados',
    price: '24.900',
    category: 'pulseras',
    emoji: '💖',
    theme: 'rose'
  },
  {
    id: 14,
    name: 'Pulsera Arcoíris',
    description: 'Pulsera colorida con cuentas arcoíris y charm de nube kawaii.',
    materials: 'Cuentas pastel · Charm plata 925 · Nudo ajustable',
    price: '26.900',
    category: 'pulseras',
    emoji: '🌈',
    theme: 'mint'
  },
  {
    id: 15,
    name: 'Pulsera Luna Creciente',
    description: 'Pulsera delicada con dije de luna creciente. Perfecta para capas.',
    materials: 'Plata 925 · Cadena fina · Dije 10mm',
    price: '30.900',
    category: 'pulseras',
    emoji: '🌙',
    theme: 'lavender'
  },

  // ======== AROS ========
  {
    id: 16,
    name: 'Aros Corazón Colgante',
    description: 'Aros colgantes con corazón kawaii. Se balancean con gracia.',
    materials: 'Plata 925 · Corazón esmaltado rosa · Gancho hipoalergénico',
    price: '32.900',
    category: 'aros',
    emoji: '💗',
    theme: 'pink'
  },
  {
    id: 17,
    name: 'Aros Estrella Brillante',
    description: 'Aros con estrella de plata con zirconia central. Brillan como tú.',
    materials: 'Plata 925 · Zirconia · Baño de oro blanco',
    price: '36.900',
    category: 'aros',
    emoji: '⭐',
    theme: 'gold'
  },
  {
    id: 18,
    name: 'Aros Gatito Kawaii',
    description: 'Aros colgantes con silueta de gatito. Super coquetos.',
    materials: 'Plata 925 · Calado artesanal · Gancho presión',
    price: '34.900',
    category: 'aros',
    emoji: '🐱',
    theme: 'peach'
  },
  {
    id: 19,
    name: 'Aros Luna Mágica',
    description: 'Aros de luna creciente con estrella. Mágicos y elegantes.',
    materials: 'Plata 925 · Calado fino · Pulido brillante',
    price: '38.900',
    category: 'aros',
    emoji: '🌙',
    theme: 'lavender'
  },
  {
    id: 20,
    name: 'Aros Flor Sonriente',
    description: 'Aros con flor kawaii sonriente. Comparten alegría donde vayas.',
    materials: 'Plata 925 · Esmalte pastel · Gancho mariposa',
    price: '33.900',
    category: 'aros',
    emoji: '🌸',
    theme: 'mint'
  },

  // ======== LLAVEROS ========
  {
    id: 21,
    name: 'Llavero Totoro',
    description: 'Mini llavero artesanal del Totoro. Hecho en plata con resina.',
    materials: 'Plata 925 · Resina gris · Argolla resistente',
    price: '22.900',
    category: 'llaveros',
    emoji: '🐻',
    theme: 'mint'
  },
  {
    id: 22,
    name: 'Llavero Pikachu Kawaii',
    description: 'Llavero de Pikachu kawaii en plata con detalles amarillos.',
    materials: 'Plata 925 · Esmalte amarillo · Cadena decorativa',
    price: '24.900',
    category: 'llaveros',
    emoji: '⚡',
    theme: 'gold'
  },
  {
    id: 23,
    name: 'Llavero Corazón Alado',
    description: 'Llavero corazón con alitas. Como Cupido en tu llavero.',
    materials: 'Plata 925 · Alas caladas · Baño de oro rosa',
    price: '20.900',
    category: 'llaveros',
    emoji: '😇',
    theme: 'pink'
  },
  {
    id: 24,
    name: 'Llavero Nube Kawaii',
    description: 'Llavero nube kawaii sonriente con lluvia de estrellas.',
    materials: 'Plata 925 · Resina azul claro · Detalles brillantes',
    price: '19.900',
    category: 'llaveros',
    emoji: '☁️',
    theme: 'lavender'
  },
  {
    id: 25,
    name: 'Llavero Estrella Mágica',
    description: 'Llavero estrella mágica con brillos. Súper kawaii.',
    materials: 'Plata 925 · Zirconias · Acabado brillante',
    price: '21.900',
    category: 'llaveros',
    emoji: '🌟',
    theme: 'peach'
  }
];

// Category labels in Spanish
const CATEGORY_LABELS = {
  anillos: '💍 Anillo',
  collares: '📿 Collar',
  pulseras: 'Pulsera',
  aros: '💎 Aros',
  llaveros: '🔑 Llavero'
};
