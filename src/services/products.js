// Punto único de acceso a productos.
// Hoy usa un mock local; cuando tengas backend, reemplaza getProducts/getProductById por fetch().

const MOCK = [
  // Pokemon Cards
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
    id: "mewtwhoymew",
    name: "Mewtwho y Mew",
    price: 122990,
    category: "Pokémon",
    rarity: "Ultra-Rara",
    stock: 8,
    img: "/assets/images/mewtwhoymew.webp",
    desc: "Ilustración especial."
  },

    {
    id: "groudonex",
    name: "Groudoon Ex",
    price: 32990,
    category: "Pokémon",
    rarity: "Rara",
    stock: 18,
    img: "/assets/images/groudonex.png",
    desc: "Ilustración especial."
  },
      {
    id: "kyogreex",
    name: "Kyogre Ex",
    price: 22990,
    category: "Pokémon",
    rarity: "Rara",
    stock: 10,
    img: "/assets/images/kyogreex.webp",
    desc: "Ilustración especial."
  },
  {
    id: "lycanroc",
    name: "Lycanroc",
    price: 10990,
    category: "Pokémon",
    rarity: "Rara",
    stock: 7,
    img: "/assets/images/lycanroc.png",
    desc: "Ilustración especial."
  },
  {
    id: "pikachu",
    name: "Pikachu",
    price: 5000,
    category: "Pokémon",
    rarity: "Común",
    stock: 7,
    img: "/assets/images/pikachu.png",
    desc: "Ilustración especial."
  },

  // Magic Cards
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
    id: "blackdragon",      
    name: "Black Dragon",
    price: 12000,
    category: "Magic",
    rarity: "Rara",
    stock: 1,
    img: "/assets/images/blackdragon.jpg",
    desc: "La carta más icónica y valiosa de Magic."
  },
  {
    id: "baldursGate1",
    name: "Magic · The Chain Veil",
    price: 8990,
    category: "Magic",
    rarity: "Común",
    stock: 10,
    img: "/assets/images/baldursGate1.jpg",
    desc: "Alumnos Duoc"
  },
  {
    id: "minscYbooLegendary",
    name: "Magic · The Chain Veil",
    price: 999999,
    category: "Magic",
    rarity: "Ultra Rara",
    stock: 10,
    img: "/assets/images/minscYbooLegendary.jpg",
    desc: "Alumnos Duoc"
  },

  // K-POP Cards
  {
    id: "bts-festa-2023",
    name: "Photocard BTS Festa 2023",
    price: 1990,
    category: "K-POP",
    rarity: "-",
    stock: 20,
    img: "/assets/images/Photocards_festa2023 bts.webp",
    desc: "Merch oficial edición Festa 2023."
  },
  {
    id: "k_pop_lomocard",
    name: "L-pop Lomocard",
    price: 2990,
    category: "K-POP",
    rarity: "-",
    stock: 20,
    img: "/assets/images/k_pop_lomocard.avif",
    desc: "funda protectora."
  },

  //otros
  {
    id: "linternagastly",
    name: "Luz nocturna Gastly 3d",
    price: 22990,
    category: "Pokémon",
    rarity: "-",
    stock: 20,
    img: "/assets/images/linternagastly.webp",
    desc: "Luz nocturna y vaporizador Pokémon Gastly 3D "
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
