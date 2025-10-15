import React from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import CheckoutForm from "../components/CheckoutForm";

function Checkout() {
  return (
    <>
      <Banner />
      <Navbar />
      <div className="container py-4">
        <h1 className="mb-4">Checkout</h1>
        <CheckoutForm />
      </div>
    </>
  );
}

export default Checkout;

