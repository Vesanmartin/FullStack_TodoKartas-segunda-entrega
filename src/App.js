import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import CartSidebar from './components/CartSidebar';

import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import BlogPage from './pages/BlogPage';
import Footer from './components/Footer';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';


function Shell(){
  const [openCart, setOpenCart] = React.useState(false);
  const nav = useNavigate();

  const handleCheckoutFromCart = () => {
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
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={ <Checkout/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:blogId" element={<BlogPage/>} />
        </Routes>
      </main>

      <Footer></Footer>
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
