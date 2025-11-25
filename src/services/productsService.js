const API_URL = 'http://localhost:3001/api' //URL BACKEND

//Obtener todas las cartas

export const obtenerCartas = async() => {
    try{
        const response = await fetch(`${API_URL}/carta`);
        if(!response.ok) throw new Error('Error al obtener productos');
        return await response.json();
    } catch(error){
        console.error('Error: ', error);
        throw error;
    }
}

//Generar el api/carta/destacados y llamar a ese.

export  function getProductById(id) {
    const all =  obtenerCartas();
    return all.find((p) => p.id === id) || null;
  }

/* Helpers opcionales (pueden servir para filtros en UI) */
export  function getMeta() {
    const all =  obtenerCartas();
    const categories = Array.from(new Set(all.map(p => p.category)));
    const rarities   = Array.from(new Set(all.map(p => p.rarity)));
    return { categories, rarities };
  }