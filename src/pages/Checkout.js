import React from "react";
import CheckoutForm from "../components/CheckoutForm";

function Checkout() {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Datos del Comprador</h1>
      <CheckoutForm />
    </div>
  );
}

export default Checkout;
