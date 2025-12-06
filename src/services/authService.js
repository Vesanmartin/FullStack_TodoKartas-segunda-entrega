// Servicio de autenticación
// Aquí creamos funciones que usan "fetch" para llamar al backend
// y así registrar usuarios e iniciar sesión desde el frontend.


// Esta es la URL base donde está corriendo nuestro backend.
const API_URL = "http://localhost:3001/api/auth";


// FUNCIÓN: registerUser
// Se usa para CREAR un usuario nuevo en MongoDB a través del backend.
// Recibe un objeto con: { nombre, email, password }

export async function registerUser({ nombre, email, password }) {

  // Hacemos la petición POST al backend usando fetch.
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",      // tipo de petición
    headers: {
      "Content-Type": "application/json"  // avisamos que enviamos datos en JSON
    },
    // transformamos el objeto a texto JSON. Esto envía los 3 campos.
    body: JSON.stringify({ nombre, email, password }) 
  });

  // El backend siempre responde en JSON, así que lo convertimos.
  const data = await res.json();

  // Si hubo problema (status 400 o 500), lo manejamos acá.
  if (!res.ok) {
    throw new Error(data.msg || "Error al registrar usuario");
  }

  // Si NO hubo error, devolvemos los datos.
  return data;
}


// FUNCIÓN: loginUser

// Recibe { email, password } y hace un POST al backend.
export async function loginUser({ email, password }) {

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"  // enviamos JSON
    },
    body: JSON.stringify({ email, password }) // datos del formulario
  });

  const data = await res.json();  // convertimos la respuesta

  // Si el backend devuelve error (correo incorrecto, pass mal, etc.)
  if (!res.ok) {
    throw new Error(data.msg || "Error al iniciar sesión");
  }

  // Aquí devolvemos la respuesta completa
  return data;
}