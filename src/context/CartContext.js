import React, {createContext, useContext, useEffect, useMemo, useState} from "react";

/* Este archivo crea un contexto de carrito 
- Guarda productos añadidos
- Persiste el carrito en localStorage
- Expone funciones para agregar, restar, eliminar y limpiar productos
- Calcula totales usando useMemo
*/

const CartContext = createContext();

export function CartProvider({children}){

  /*Carga el carrito desde localStorage (si existía) al iniciar la app.
  Si no existe, empieza con un array vacío [].*/
  const [cart, setCart] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem("tk_cart")) || []; }catch{ return []; }
  });

  // Si cambia cart, se guarda en localStorage
  useEffect(()=>localStorage.setItem("tk_cart", JSON.stringify(cart)), [cart]);

  // Añadir item al carro
  const add = (item, qty=1)=>{
    // llama a la ultima version del carrito 
    setCart(prev=>{

      //busca el item añadido dentro de la ultima version del carrito
      const i = prev.findIndex(x=>x.id===item.id);
      if(i>=0){
        const next=[...prev]; next[i]={...next[i], qty: next[i].qty+qty}; return next;
      }
      //si está, actualiza la cantidad. Si no está, lo añade al final de la lista.
      return [...prev, {...item, qty}];
    });
  };

  //Restar producto
  const sub = (id)=> setCart(prev=>{
    const i = prev.findIndex(x=>x.id===id);
    //si el producto no está, no hace nada
    if(i<0) return prev;
    const next=[...prev]; const q=next[i].qty-1;
    //si llega a 0 o menos, lo elimina del carrito
    if(q<=0){ next.splice(i,1); return next; }
    //actualiza la cantidad
    next[i]={...next[i], qty:q}; return next;
  });

  //elimina el producto, sin importar la cantidad
  const remove = (id)=> setCart(prev=>prev.filter(x=>x.id!==id));
  
  //elimina todos los productos
  const clear  = ()=> setCart([]);

  //calcula el total
  const total = useMemo(()=>cart.reduce((s,i)=>s+i.price*i.qty,0), [cart]);
  
  // calcula la cantidad de items
  const count = useMemo(()=>cart.reduce((s,i)=>s+i.qty,0), [cart]);

  return (
    <CartContext.Provider value={{cart, add, sub, remove, clear, total, count}}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = ()=> useContext(CartContext);
