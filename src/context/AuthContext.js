import React, {createContext, useContext, useEffect, useState} from "react";

/* “BD” mínima en localStorage */
const KEY_USERS = "tk_users";
const KEY_AUTH  = "tk_auth";

const AuthContext = createContext();

export function AuthProvider({children}){
  const [users, setUsers] = useState(()=>{
    try{
      const u = JSON.parse(localStorage.getItem(KEY_USERS));
      if(u) return u;
      const seed=[{email:"demo@demo.cl", password:"123456", name:"Demo"}];
      localStorage.setItem(KEY_USERS, JSON.stringify(seed));
      return seed;
    }catch{ return []; }
  });
  const [user, setUser] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem(KEY_AUTH)) || null; }catch{ return null; }
  });

  useEffect(()=>localStorage.setItem(KEY_USERS, JSON.stringify(users)), [users]);
  useEffect(()=>localStorage.setItem(KEY_AUTH, JSON.stringify(user)), [user]);

  const register = ({name, email, password})=>{
    if(users.some(u=>u.email===email)) throw new Error("El correo ya está registrado.");
    const next=[...users, {name, email, password}];
    setUsers(next);
    setUser({name, email});
    return true;
  };

  const login = ({email, password})=>{
    const found = users.find(u=>u.email===email && u.password===password);
    if(!found) throw new Error("Credenciales inválidas.");
    setUser({name:found.name, email:found.email});
    return true;
  };

  const logout = ()=> setUser(null);

  return (
    <AuthContext.Provider value={{user, users, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = ()=> useContext(AuthContext);
