import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

// Este componente muestra el formulario para iniciar sesión.
// El usuario escribe su correo y contraseña, y el sistema valida los datos
// llamando al backend, que revisa si existe en MongoDB.
export default function Login() {

  // Obtenemos la función login del AuthContext,
  // que es la encargada de hablar con el backend.
  const { login } = useAuth();

  // Estados para guardar lo que escribe el usuario.
  const [email, setEmail] = useState(""); // correo ingresado
  const [pw, setPw] = useState("");       // contraseña
  const [err, setErr] = useState("");     // mensaje de error si falla el login

  // useNavigate sirve para enviar al usuario a otra página si inicia sesión correctamente.
  const nav = useNavigate();

  // Función que se ejecuta cuando el usuario presiona "Entrar".
  const submit = async (e) => {
    e.preventDefault(); // evita que el formulario recargue la página
    setErr("");         // limpiamos errores anteriores

    try {
      // Llamamos a login(), que envía email y password al backend.
      // Si los datos son correctos, el backend devuelve el usuario y lo guardamos.
      await login({ email, password: pw });

      // Si todo sale bien, redirigimos al inicio o catálogo.
      nav("/");

    } catch (ex) {
      // Si ocurre un error (usuario no existe, pass incorrecta, etc.),
      // mostramos el mensaje en pantalla.
      setErr(ex.message);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 420 }}>
      <h2 className="mb-3">Iniciar sesión</h2>

      {/* Si hay un error (correo o clave incorrectos), se muestra aquí */}
      {err && <div className="alert alert-danger">{err}</div>}

      {/* Formulario de login */}
      <form onSubmit={submit}>

        {/* Campo para escribir el correo */}
        <div className="mb-3">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Campo para escribir la contraseña */}
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </div>

        {/* Botón para enviar los datos */}
        <button className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}
