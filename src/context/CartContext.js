import React, {createContext, useContext, useEffect, useMemo, useState} from "react";

const CartContext = createContext();

export function CartProvider({children}){
  const [cart, setCart] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem("tk_cart")) || []; }catch{ return []; }
  });
  useEffect(()=>localStorage.setItem("tk_cart", JSON.stringify(cart)), [cart]);

  const add = (item, qty=1)=>{
    setCart(prev=>{
      const i = prev.findIndex(x=>x.id===item.id);
      if(i>=0){
        const next=[...prev]; next[i]={...next[i], qty: next[i].qty+qty}; return next;
      }
      return [...prev, {...item, qty}];
    });
  };
  const sub = (id)=> setCart(prev=>{
    const i = prev.findIndex(x=>x.id===id);
    if(i<0) return prev;
    const next=[...prev]; const q=next[i].qty-1;
    if(q<=0){ next.splice(i,1); return next; }
    next[i]={...next[i], qty:q}; return next;
  });
  const remove = (id)=> setCart(prev=>prev.filter(x=>x.id!==id));
  const clear  = ()=> setCart([]);

  const total = useMemo(()=>cart.reduce((s,i)=>s+i.price*i.qty,0), [cart]);
  const count = useMemo(()=>cart.reduce((s,i)=>s+i.qty,0), [cart]);

  return (
    <CartContext.Provider value={{cart, add, sub, remove, clear, total, count}}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = ()=> useContext(CartContext);
