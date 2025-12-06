// ProductDetail.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// 1) Servicio que llama al backend
import { getProductById } from "../services/productsService";

// 2) MOCK local, por si el backend no encuentra la carta
import { getProducts } from "../services/products";

import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();          // toma el :id de la URL
  const { add } = useCart();
  const nav = useNavigate();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  // Carga del producto cuando cambia el id
  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        let fetched = await getProductById(id);  // 1) intenta backend

        // 2) Si el backend no lo encontró, buscamos en el MOCK
        if (!fetched) {
          const allMock = getProducts();
          fetched = allMock.find(p => (p.id ?? p._id) === id) || null;
        }

        setProducto(fetched);
      } catch (err) {
        console.error("Error cargando producto:", err);
        setProducto(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  // Estados de carga y error
  if (loading) {
    return <div className="container py-4">Cargando producto...</div>;
  }

  if (!producto) {
    return <div className="container py-4">Producto no encontrado.</div>;
  }

  // Render del detalle
  return (
    <div className="container py-4">
      {/* Botón Volver */}
      <button
        className="btn btn-outline-primary d-inline-flex align-items-center mb-4"
        onClick={() => nav(-1)}
        style={{
          borderRadius: "8px",
          fontWeight: 600,
          gap: "6px",
          padding: "0.4rem 0.9rem",
        }}
      >
        <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>←</span> Volver
      </button>

      <div className="row g-4 align-items-center">
        <div className="col-md-6 text-center">
          <div
            className="bg-white d-flex align-items-center justify-content-center rounded"
            style={{ height: 350, overflow: "hidden" }}
          >
            <img
              src={producto.img}
              alt={producto.name}
              className="img-fluid"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <h1 className="h4 fw-800 mb-2">{producto.name}</h1>

          <div className="text-muted mb-2">
            {producto.category} · {producto.rarity}
          </div>

          <div className="fs-4 fw-800 mb-3">
            $
            {producto.price != null
              ? producto.price.toLocaleString("es-CL")
              : ""}
          </div>

          <div className="d-flex align-items-center gap-2 mb-3">
            <label className="form-label mb-0">Cantidad</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) =>
                setQty(Math.max(1, Number(e.target.value || 1)))
              }
              className="form-control"
              style={{ maxWidth: 120 }}
            />
          </div>

          <button
            className="btn btn-primary me-2"
            onClick={() => add(producto, qty)}
          >
            Agregar al carrito
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => nav("/catalogo")}
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
