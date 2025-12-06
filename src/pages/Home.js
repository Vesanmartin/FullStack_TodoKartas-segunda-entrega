import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getProducts } from '../services/products';               // MOCK local
import { obtenerDestacadas } from '../services/productsService';  // desde backend (Mongo)
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { add } = useCart();   // para agregar productos al carrito

  // Estado con las cartas destacadas que se muestran en el home
  const [destacadas, setDestacadas] = useState([]);

  // Estados para mensajes de carga / error (solo para la sección destacadas)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mapa de imágenes usando el MOCK
  // Ejemplo: { 'charizard-gx': '/assets/images/Charizard_GX.webp', ... }
  const [imgMap] = useState(() => {
    const base = getProducts();
    const m = {};
    base.forEach(p => {
      m[p.id] = p.img;
    });
    return m;
  });

  // Función que carga las cartas destacadas.
  // 1) Intenta traerlas desde el backend (Mongo).
  // 2) Si no hay datos, usa las primeras del MOCK como destacadas.
  const cargarDestacadas = useCallback(async () => {
    try {
      setLoading(true);

      // 1) Pedimos destacadas al backend
      let data = [];
      try {
        const resp = await obtenerDestacadas();   // /api/carta/destacados
        if (Array.isArray(resp)) {
          data = resp;
        }
      } catch (e) {
        // Si falla la ruta destacados, seguimos igual y usamos MOCK
        console.warn('Error al obtener destacadas desde backend:', e);
      }

      // 2) Si el backend no devuelve nada, usamos las primeras 4 del MOCK
      if (data.length === 0) {
        data = getProducts().slice(0, 4);
      }

      // 3) Mezclamos datos con rutas de imagen
      const conImg = data.map(c => ({
        ...c,
        img: c.img || imgMap[c.id] || c.img
      }));

      setDestacadas(conImg);
      setError(null);
    } catch (err) {
      setError('Error al cargar productos destacados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [imgMap]);

  // useEffect: se ejecuta una vez al montar el Home
  useEffect(() => {
    cargarDestacadas();
  }, [cargarDestacadas]);

  return (
    <div className="home-page">

      {/* Sección principal / portada */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="mb-3">Bienvenido a TodoKartas</h1>
          <p className="lead mb-4">
            La mejor mano en cartas Pokémon, Magic y K-POP.
          </p>
          <Link to="/catalogo" className="btn btn-primary btn-lg">
            Ver catálogo
          </Link>
        </div>
      </section>

      {/* Sección de productos destacados */}
      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Productos destacados</h2>
          <Link to="/catalogo" className="btn btn-link">
            Ver todo el catálogo
          </Link>
        </div>

        {loading && <p>Cargando destacados...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="row g-3">
          {destacadas.map(p => (
            <div className="col-12 col-sm-6 col-md-3" key={p.id}>
              <ProductCard producto={p} onAdd={add} />
            </div>
          ))}

          {(!loading && destacadas.length === 0) && (
            <p className="text-muted">No hay productos destacados por ahora.</p>
          )}
        </div>
      </section>
    </div>
  );
}
