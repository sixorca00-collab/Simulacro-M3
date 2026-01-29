// login.js
// Esta función valida el usuario contra JSON Server
// y guarda la sesión en localStorage

export async function loginUser() {
  const btn = document.getElementById("btnLogin");

  btn.addEventListener("click", async () => {
    const username = document.getElementById("lUser").value;
    const password = document.getElementById("lPass").value;

    // Validación básica
    if (!username || !password) {
      alert("Fill all fields");
      return;
    }

    // Petición al servidor simulando login real
    const res = await fetch(
      `http://localhost:3000/users?username=${username}&password=${password}`
    );

    const users = await res.json();

    // Si no hay coincidencias, login inválido
    if (users.length === 0) {
      alert("Invalid credentials");
      return;
    }

    // Usuario autenticado (JSON Server devuelve array)
    const user = users[0];

    // Guardamos sesión (JSON Server NO maneja sesiones)
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("currentUser", user.username);
    localStorage.setItem("role", user.role);
    localStorage.setItem("userId", user.id);

    // Redirección según rol (REQUISITO DEL SIMULACRO)
    if (user.role === "admin") {
      window.location.href = "./pages/admin.html";
    } else {
      window.location.href = "./pages/menu.html";
    }
  });
}
