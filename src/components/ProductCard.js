import React from 'react';
import { Link } from 'react-router-dom';

// ProductCard: recibe `producto` ({ id, name, img, price }) y `onAdd` callback
export default function ProductCard({ producto, onAdd }) {
  if (!producto) return null;
  const { id, name, img, price } = producto;

  const formatPrice = (p) => {
    if (p == null) return '';
    // Formatea 12345 -> $12.345
    return `$${String(p).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  return (
    <div className="card h-100">
      <Link to={`/producto/${id}`} className="text-decoration-none text-dark">
        <img src={img} className="card-img-top" alt={name} />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text fw-bold mt-auto">{formatPrice(price)}</p>

        <div className="d-flex gap-2 mt-2">
          <Link to={`/producto/${id}`} className="btn btn-outline-secondary">Detalle</Link>
          <button className="btn btn-primary ms-auto" onClick={() => onAdd?.(producto)}>Agregar</button>
        </div>
      </div>
    </div>
  );
}