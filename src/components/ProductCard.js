import React from 'react';
import { Link } from 'react-router-dom';

// Tarjeta de producto que se usa en Home y Catálogo.
export default function ProductCard({ producto, onAdd }) {
  // Si no viene producto, no mostramos nada.
  if (!producto) return null;

  // Aseguramos un id válido:
  // - si existe producto.id lo usamos
  // - si no, usamos producto._id (como viene desde Mongo)
  const safeId = producto.id ?? producto._id;

  // Desestructuramos los campos que usamos.
  const {
    name,
    price,
    category,
    rarity,
    stock,
    img,
    desc
  } = producto;

  // URL de detalle del producto: /producto/<id>
  // Si por alguna razón no hay id, dejamos '#' para que no rompa.
  const detalleUrl = safeId ? `/producto/${safeId}` : '#';

  return (
    <div className="card h-100 shadow-sm">
      {/* Al hacer click en la imagen vamos al detalle */}
      <Link to={detalleUrl} className="text-decoration-none text-dark">
        <img
          src={img}
          alt={name}
          className="card-img-top"
          style={{ objectFit: 'cover', height: '220px' }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        {/* También el título lleva al detalle */}
        <Link to={detalleUrl} className="text-decoration-none text-dark">
          <h5 className="card-title mb-1">{name}</h5>
        </Link>

        <p className="card-text text-muted small mb-1">
          {category} · {rarity}
        </p>

        {desc && (
          <p className="card-text small text-muted mb-2">
            {desc}
          </p>
        )}

        {/* Parte inferior: precio + botón agregar */}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold">${price}</span>

          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => onAdd(producto)}
          >
            Agregar
          </button>
        </div>

        <p className="small text-muted mt-1">Stock: {stock}</p>
      </div>
    </div>
  );
}
