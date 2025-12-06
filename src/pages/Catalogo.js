import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/products';              // productos MOCK locales
import { obtenerCartas } from '../services/productsService';    // productos desde backend
import ProductCard from '../components/ProductCard';
import FiltersBar from '../components/FiltersBar';
import { useCart } from '../context/CartContext';

export default function Catalogo() {
  const { add } = useCart();   // función para agregar al carrito

  // Estado con todas las cartas (después de cargar y mezclar datos)
  const [allData, setCartas] = useState(null);

  // Estado para mostrar mensajes de carga o error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado de filtros (buscador, categoría, rareza, etc.)
  const [filters, setFilters] = useState({
    q: '',
    category: '',
    rarity: '',
    min: '',
    max: '',
    sort: 'relevance',
    pageSize: 12
  });

  // Estado para la paginación
  const [page, setPage] = useState(1);

  // Mapa de imágenes usando el MOCK (services/products.js)
  // Ejemplo: { 'charizard-gx': '/assets/images/Charizard_GX.webp', ... }
  const [imgMap] = useState(() => {
    const base = getProducts();
    const m = {};
    base.forEach(p => {
      m[p.id] = p.img;
    });
    return m;
  });

  // Función que carga las cartas.
  // Primero intenta desde el backend.
  // Si el backend no trae nada, usamos el MOCK local.
  const cargarCartas = useCallback(async () => {
    try {
      setLoading(true);

      // 1) Pedimos datos al backend (Mongo)
      const cartasBackend = await obtenerCartas();
      let base = Array.isArray(cartasBackend) ? cartasBackend : [];

      // 2) Si no hay datos desde el backend, usamos el MOCK
      if (base.length === 0) {
        base = getProducts();
      }

      // 3) Mezclamos datos con las rutas de imagen
      //    y aseguramos que cada carta tenga un "id"
      //    (si viene de Mongo con "_id", lo usamos).
      const cartasConImg = base.map(c => {
        const id = c.id || c._id;   // clave para rutas y detalle
        return {
          ...c,
          id,                       // guardamos el id normalizado
          img: c.img || imgMap[id] || c.img
        };
      });

      setCartas(cartasConImg);
      setError(null);
    } catch (err) {
      // Si algo falla, mostramos un mensaje de error
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [imgMap]);

  // useEffect: se ejecuta una vez al montar el componente
  useEffect(() => {
    cargarCartas();
  }, [cargarCartas]);

  // Lista completa (si aún no hay datos, usamos arreglo vacío).
  // La envolvemos en useMemo para que no cambie en cada render
  // y así evitar el warning del hook.
  const all = useMemo(() => allData ?? [], [allData]);

  // Función que aplica todos los filtros al listado
  const apply = useCallback((items) => {
    let out = [...items];

    // Buscar por nombre
    if (filters.q) {
      const q = filters.q.toLowerCase();
      out = out.filter(p => p.name.toLowerCase().includes(q));
    }

    // Filtrar por categoría
    if (filters.category) out = out.filter(p => p.category === filters.category);

    // Filtrar por rareza
    if (filters.rarity)   out = out.filter(p => p.rarity === filters.rarity);

    // Filtrar por rango de precios
    const min = filters.min !== '' ? Number(filters.min) : -Infinity;
    const max = filters.max !== '' ? Number(filters.max) :  Infinity;
    out = out.filter(p => p.price >= min && p.price <= max);

    // Ordenar según opción seleccionada
    if (filters.sort === 'price_asc')  out.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price_desc') out.sort((a, b) => b.price - a.price);
    if (filters.sort === 'name_asc')   out.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    if (filters.sort === 'name_desc')  out.sort((a, b) => b.name.localeCompare(a.name, 'es'));

    return out;
  }, [filters]);

  // Cuando cambian los filtros, reiniciamos la página a la 1
  const handleFiltersChange = useCallback((f) => {
    setFilters(f);
    setPage(1);
  }, []);

  // Lista filtrada según filtros actuales
  const filtered = useMemo(() => apply(all), [all, apply]);

  // Cálculo de paginación
  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.pageSize));
  const pageClamp = Math.min(page, totalPages);
  const start = (pageClamp - 1) * filters.pageSize;
  const current = filtered.slice(start, start + filters.pageSize);

  // Mensajes de carga y error
  if (loading) return <div className='text-center'>Cargando...</div>;
  if (error)   return <div className='alert alert-danger'>{error}</div>;

  return (
    <div className="catalogo-page container my-4">
      <h2 className="mb-3">Catálogo</h2>

      {/* Barra de filtros */}
      <FiltersBar source={all} onChange={handleFiltersChange} />

      {/* Grilla de productos */}
      <div className="row g-3">
        {current.map(p => (
          <div className="col-12 col-sm-6 col-md-3" key={p.id}>
            <ProductCard producto={p} onAdd={add} />
          </div>
        ))}

        {current.length === 0 && (
          <p className="text-muted">Sin resultados.</p>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pageClamp === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Anterior
              </button>
            </li>

            {Array.from({ length: totalPages }).map((_, i) => (
              <li
                className={`page-item ${pageClamp === i + 1 ? 'active' : ''}`}
                key={i}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${pageClamp === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
