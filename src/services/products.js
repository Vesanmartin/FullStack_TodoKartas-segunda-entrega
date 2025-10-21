// Punto único de acceso a productos.
// Hoy usa un mock local; cuando tengas backend, reemplaza getProducts/getProductById por fetch().

const MOCK = [
  {
    id: "charizard-gx",
    name: "Charizard GX",
    price: 9990,
    category: "Pokémon",
    rarity: "Rara",
    stock: 5,
    img: "/assets/images/Charizard_GX.webp",
    desc: "Near Mint con funda protectora."
  },
  {
    id: "misty-psyduck",
    name: "Misty & Psyduck (193/182)",
    price: 54990,
    category: "Pokémon",
    rarity: "Ultra-Rara",
    stock: 2,
    img: "/assets/images/Misty-psyduck 193_182.webp",
    desc: "Carta vintage muy buscada."
  },
  {
    id: "koraidon",
    name: "Koraidon",
    price: 12990,
    category: "Pokémon",
    rarity: "Rara",
    stock: 8,
    img: "/assets/images/koraidon1.png",
    desc: "Ilustración especial."
  },
  {
    id: "chain-veil",
    name: "Magic · The Chain Veil",
    price: 1990,
    category: "Magic",
    rarity: "Común",
    stock: 10,
    img: "/assets/images/Magic_the_chain_veil.jpg",
    desc: "Artefacto clásico para commander."
  },
  {
    id: "bts-festa-2023",
    name: "Photocard BTS Festa 2023",
    price: 1990,
    category: "K-POP",
    rarity: "-",
    stock: 20,
    img: "/assets/images/Photocards_festa2023 bts.webp",
    desc: "Merch oficial edición Festa 2023."
  }
];


export function getProducts() {
  // FUTURO: return fetch('/api/products').then(r => r.json());
  return [...MOCK];
}

export  function getProductById(id) {
  const all =  getProducts();
  return all.find((p) => p.id === id) || null;
}

/* Helpers opcionales (pueden servir para filtros en UI) */
export  function getMeta() {
  const all =  getProducts();
  const categories = Array.from(new Set(all.map(p => p.category)));
  const rarities   = Array.from(new Set(all.map(p => p.rarity)));
  return { categories, rarities };
}
