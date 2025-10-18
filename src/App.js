import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import CartSidebar from './components/CartSidebar';

import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function ProtectedCheckout({ canAccess, children }) {
  // Si no viene habilitado desde el carrito, redirige al Home
  if (!canAccess) return <Navigate to="/" replace />;
  return children;
}

function Shell(){
  const [openCart, setOpenCart] = React.useState(false);
  const [canAccessCheckout, setCanAccessCheckout] = React.useState(false);
  const nav = useNavigate();

  const handleCheckoutFromCart = () => {
    setCanAccessCheckout(true);  // habilita acceso a /checkout
    setOpenCart(false);          // cierra sidebar
    nav('/checkout');            // navega
  };

  return (
    <>
      <Header onOpenCart={()=>setOpenCart(true)} />
      <CartSidebar
        open={openCart}
        onClose={()=>setOpenCart(false)}
        onCheckout={handleCheckoutFromCart}
      />

      <main className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route
            path="/checkout"
            element={
              <ProtectedCheckout canAccess={canAccessCheckout}>
                <Checkout onDone={() => setCanAccessCheckout(false)} />
              </ProtectedCheckout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* nada de link a /checkout en otra parte */}
        </Routes>
      </main>

      <footer className="py-4 text-center text-muted border-top">
        <small>© {new Date().getFullYear()} TodOKartas</small>
      </footer>
    </>
  );
}

export default function App(){
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Shell />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
