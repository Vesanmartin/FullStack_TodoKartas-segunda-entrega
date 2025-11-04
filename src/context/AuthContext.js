import React, {createContext, useContext, useEffect, useState} from "react";

/*Este archivo crea un contexto de autenticación:
- Guarda usuarios registrados y el usuario autenticado actualmente
- Usa localStorage como base de datos local
- Expone funciones register, login y logout

*/

/* “BD” mínima en localStorage */
const KEY_USERS = "tk_users";
const KEY_AUTH  = "tk_auth";

const AuthContext = createContext();

//funcion que envuelve la aplicación 
export function AuthProvider({children}){

  //Inicializa estado users con:
  // usuarios guardados en localStorage
  const [users, setUsers] = useState(()=>{
    try{
      const u = JSON.parse(localStorage.getItem(KEY_USERS));
      if(u) return u;
    // si no hay, inventa uno
      const seed=[{email:"demo@demo.cl", password:"123456", name:"Demo"}];
      localStorage.setItem(KEY_USERS, JSON.stringify(seed));
      return seed;
    }catch{ return []; }
  });

  // Aquí se guarda el usuario logueado actualmente
  const [user, setUser] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem(KEY_AUTH)) || null; }catch{ return null; }
  });

  //Cuando cambia estado, se actualiza localStorage
  useEffect(()=>localStorage.setItem(KEY_USERS, JSON.stringify(users)), [users]);
  useEffect(()=>localStorage.setItem(KEY_AUTH, JSON.stringify(user)), [user]);

  //Registrar nuevo usuario
  const register = ({name, email, password})=>{
    //Verifica que no haya otroa usuario con el mismo email
    if(users.some(u=>u.email===email)) throw new Error("El correo ya está registrado.");
    //crea array con todos los users (...users) más el nuevo usuario
    const next=[...users, {name, email, password}];
    //actualiza lista de usuarios
    setUsers(next);
    //logea
    setUser({name, email});
    return true;
  };

    //Inicio de sesión
  const login = ({email, password})=>{
    //busca el email y password dentro de lista de usuarios
    const found = users.find(u=>u.email===email && u.password===password);
    if(!found) throw new Error("Credenciales inválidas.");
    //si no lo encuentra, da error, si lo encuentra, actualiza estado user (logea)
    setUser({name:found.name, email:found.email});
    return true;
  };

  //limpia user (log out)
  const logout = ()=> setUser(null);

  return (
    <AuthContext.Provider value={{user, users, register, login, logout}}>
      {children} 
    </AuthContext.Provider>
  );
}
export const useAuth = ()=> useContext(AuthContext);
