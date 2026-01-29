/*********************************************************
 * USER PANEL LOGIC
 * - Carga productos desde JSON Server
 * - Muestra nombre, precio e imagen
 * - Permite crear pedidos (orders)
 * - Maneja sesión y logout
 *********************************************************/

// URL base de JSON Server
const API_URL = "http://localhost:3000";

// ELEMENTOS DEL DOM
const productsList = document.getElementById("productsList");
const logoutBtn = document.getElementById("logoutBtn");

/*********************************************************
 * GUARDIÁN DE RUTA (SOLO USUARIOS)
 *********************************************************/
const isAuth = localStorage.getItem("isAuth");
const role = localStorage.getItem("role");

if (!isAuth || role !== "user") {
  // Si no está autenticado o no es user, vuelve al login
  window.location.href = "../index.html";
}

/*********************************************************
 * LOGOUT
 *********************************************************/
logoutBtn.addEventListener("click", () => {
  // Limpiamos toda la sesión
  localStorage.removeItem("isAuth");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");

  // Redirigimos al login
  window.location.href = "../index.html";
});

/*********************************************************
 * CARGA DE PRODUCTOS AL ENTRAR
 *********************************************************/
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

/*********************************************************
 * FUNCIÓN PARA CARGAR Y MOSTRAR PRODUCTOS
 *********************************************************/
async function loadProducts() {
  try {
    // Petición GET a productos
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();

    // Limpiamos la lista
    productsList.innerHTML = "";

    // Recorremos los productos
    products.forEach(product => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex align-items-center";

      li.innerHTML = `
        <!-- Imagen del producto -->
        <img
          src="${product.image}"
          alt="${product.name}"
          width="60"
          height="60"
          class="me-3 rounded"
          style="object-fit:cover"
          onerror="this.src='https://via.placeholder.com/60'"
        >

        <!-- Información del producto -->
        <div class="flex-grow-1">
          <strong>${product.name}</strong><br>
          $${product.price}
        </div>

        <!-- Botón de pedido -->
        <button class="btn btn-primary btn-sm">
          Order
        </button>
      `;

      /*********************************************************
       * CREAR ORDER (PEDIDO REAL)
       *********************************************************/
      li.querySelector("button").addEventListener("click", async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          alert("You must be logged in");
          return;
        }

        // Objeto order (relación user - product)
        const order = {
          userId: Number(userId),
          productId: product.id,
          productName: product.name,
          price: product.price,
          date: new Date().toLocaleDateString()
        };

        // Guardamos el pedido en JSON Server
        await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order)
        });

        alert("Order placed successfully");
      });

      // Agregamos el producto al DOM
      productsList.appendChild(li);
    });

  } catch (error) {
    console.error("Error loading products:", error);
  }
}
