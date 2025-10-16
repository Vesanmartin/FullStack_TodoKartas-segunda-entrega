import React, { useEffect, useMemo, useState } from "react";

/**
 * Barra de búsqueda y filtros reutilizable.
 *
 * Props:
 * - source: Array de productos (para extraer opciones dinámicas)
 * - onChange: callback({ q, category, rarity, min, max, sort, pageSize })
 *
 * No maneja datos ni paginación: solo emite el estado de filtros al padre.
 */
export default function FiltersBar({ source = [], onChange }) {
  // Opciones dinámicas a partir de source
  const categories = useMemo(
    () => Array.from(new Set(source.map((p) => p.category).filter(Boolean))),
    [source]
  );
  const rarities = useMemo(
    () => Array.from(new Set(source.map((p) => p.rarity).filter(Boolean))),
    [source]
  );

  // Estado local de filtros
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [rarity, setRarity] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("relevance"); // price_asc | price_desc | name_asc | name_desc
  const [pageSize, setPageSize] = useState(12);

  // Emitir cambios al padre
  useEffect(() => {
    onChange?.({ q, category, rarity, min, max, sort, pageSize });
  }, [q, category, rarity, min, max, sort, pageSize, onChange]);

  // Reset
  const clear = () => {
    setQ("");
    setCategory("");
    setRarity("");
    setMin("");
    setMax("");
    setSort("relevance");
    setPageSize(12);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row g-2 align-items-end">

          <div className="col-12 col-md-4">
            <label className="form-label">Buscar</label>
            <input
              className="form-control"
              placeholder="Nombre del producto…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Todas</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label">Rareza</label>
            <select
              className="form-select"
              value={rarity}
              onChange={(e) => setRarity(e.target.value)}
            >
              <option value="">Todas</option>
              {rarities.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label">Precio mínimo</label>
            <input
              type="number"
              className="form-control"
              placeholder="0"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              min="0"
            />
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label">Precio máximo</label>
            <input
              type="number"
              className="form-control"
              placeholder="∞"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              min="0"
            />
          </div>

          <div className="col-6 col-md-3">
            <label className="form-label">Ordenar por</label>
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="relevance">Relevancia</option>
              <option value="price_asc">Precio ↑</option>
              <option value="price_desc">Precio ↓</option>
              <option value="name_asc">Nombre A–Z</option>
              <option value="name_desc">Nombre Z–A</option>
            </select>
          </div>

          <div className="col-6 col-md-3">
            <label className="form-label">Por página</label>
            <select
              className="form-select"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[6, 12, 24, 48].map((n) => (
                <option key={n} value={n}>Ver {n}</option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-3 ms-auto">
            <button className="btn btn-outline-secondary w-100 mt-2 mt-md-0" onClick={clear}>
              Limpiar filtros
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
