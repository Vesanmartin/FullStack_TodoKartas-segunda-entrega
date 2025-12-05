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


export const obtenerDestacadas = async() => {
    try{
        const response = await fetch(`${API_URL}/carta/destacados`);
        if(!response.ok) throw new Error('Error al obtener productos');
        return await response.json();
    } catch(error){
        console.error('Error: ', error);
        throw error;
    }
}

//Generar el api/carta/destacados y llamar a ese.
/**
 * Obtiene una carta específica por su ID.
 * @param {string} id - El ID de la carta a buscar.
 * @returns {object|null} El objeto carta o null si no se encuentra.
 */
export async function getProductById(id) {
    try {
        // Usamos la URL que definiste en carta.routes.js (ej: /api/carta/charizard-gx)
        const response = await fetch(`${API_URL}/carta/${id}`);
        
        // Manejo de errores
        if (!response.ok) {
            // Si la respuesta es 404 (no encontrado), devolvemos null
            if (response.status === 404) {
                return null;
            }
            // Para otros errores (500, etc.), lanzamos una excepción
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const productData = await response.json();
        
        // La API ya devolvió el objeto único, ¡lo retornamos directamente!
        return productData; 

    } catch (error) {
        console.error("Fallo al obtener producto por ID:", error);
        return null;
    }
}

/* Helpers opcionales (pueden servir para filtros en UI) */
export  function getMeta() {
    const all =  obtenerCartas();
    const categories = Array.from(new Set(all.map(p => p.category)));
    const rarities   = Array.from(new Set(all.map(p => p.rarity)));
    return { categories, rarities };
  }