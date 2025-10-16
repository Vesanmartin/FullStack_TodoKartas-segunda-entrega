import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartSidebar({ open, onClose, onCheckout }) {
  const { cart, add, sub, remove, total } = useCart();

  return (
    <>
      <div className={`cart-backdrop ${open?'open':''}`} onClick={onClose} />
      <aside className={`cart-panel ${open?'open':''}`}>
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
          <h5 className="m-0 fw-800">Tu carrito</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>✕</button>
        </div>

        <div className="p-3" style={{overflowY:'auto'}}>
          {cart.length===0 && <p className="text-muted">Aún no agregas productos.</p>}
          {cart.map(i=>(
            <div key={i.id} className="cart-line">
              <img src={i.img} alt={i.name} className="cart-thumb"/>
              <div className="flex-grow-1">
                <div className="fw-600">{i.name}</div>
                <small className="text-muted">${i.price?.toLocaleString('es-CL')}</small>
                <div className="d-flex align-items-center gap-2 mt-1">
                  <button className="btn btn-sm btn-outline-secondary qty-btn" onClick={()=>sub(i.id)}>-</button>
                  <span className="px-2">{i.qty}</span>
                  <button className="btn btn-sm btn-outline-secondary qty-btn" onClick={()=>add(i,1)}>+</button>
                  <button className="btn btn-sm btn-outline-danger ms-auto" onClick={()=>remove(i.id)}>Quitar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto p-3 border-top">
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-600">Total</span>
            <span className="fw-800">${total.toLocaleString('es-CL')}</span>
          </div>
          <button
            className="btn btn-primary w-100"
            disabled={!cart.length}
            onClick={onCheckout}  // <- delega en App la navegación y la “habilitación”
          >
            Finalizar compra
          </button>
        </div>
      </aside>
    </>
  );
}
