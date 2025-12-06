// Página para crear una cuenta de usuario.
// Envía nombre, email y password al backend, que a su vez guarda en MongoDB.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function RegisterPage() {
  // useNavigate permite cambiar de ruta (por ejemplo ir a /login).
  const navigate = useNavigate();

  // Estados para guardar lo que escribe el usuario en el formulario.
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // Estados para mostrar mensajes al usuario.
  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");

  // Esta función se ejecuta cuando se envía el formulario.
  const handleSubmit = async (e) => {
    // Evitamos que el navegador recargue la página.
    e.preventDefault();

    // Limpiamos mensajes anteriores.
    setError("");
    setOkMsg("");

    // Validaciones básicas del lado del front.
    if (!nombre || !email || !password || !password2) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Llamamos al servicio que habla con el backend.
      const data = await registerUser({ nombre, email, password });

      // Mostramos el mensaje que viene del backend.
      // Por ejemplo: "Usuario creado".
      setOkMsg(data.msg || "Usuario creado correctamente");

      // Después de un momento, redirigimos a la página de login.
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      // Si el backend devolvió error (correo repetido, por ejemplo),
      // mostramos el mensaje en pantalla.
      setError(err.message);
    }
  };

  return (
    <div className="contenedor-form">
      <h1>Crear cuenta</h1>

      {/* onSubmit indica qué función se ejecuta cuando se envía el formulario */}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            value={nombre} // lo que ve el usuario en el input
            onChange={(e) => setNombre(e.target.value)} // actualiza el estado al escribir
          />
        </label>

        <label>
          Correo
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Repite contraseña
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>

        {/* Si hay error, lo mostramos en rojo. */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Si todo salió bien, mostramos mensaje en verde. */}
        {okMsg && <p style={{ color: "green" }}>{okMsg}</p>}

        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}

export default RegisterPage;
