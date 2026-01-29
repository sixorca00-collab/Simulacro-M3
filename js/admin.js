/* =====================================================
   GUARD DE SEGURIDAD
   - Si no hay sesión → login
   - Si no es admin → login
   ===================================================== */

const isAuth = localStorage.getItem("isAuth");
const role = localStorage.getItem("role");

if (!isAuth || role !== "admin") {
  window.location.href = "../index.html";
}

/* =====================================================
   CONFIGURACIÓN GENERAL
   ===================================================== */

const API_URL = "http://localhost:3000";

/* =====================================================
   ELEMENTOS DEL DOM (MÉTRICAS)
   ===================================================== */

const totalOrdersEl = document.getElementById("totalOrders");
const pendingOrdersEl = document.getElementById("pendingOrders");
const totalRevenueEl = document.getElementById("totalRevenue");
const ordersTable = document.getElementById("ordersTable");

/* =====================================================
   ELEMENTOS DEL DOM (PRODUCTOS)
   ===================================================== */

const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const addProductBtn = document.getElementById("addProduct");
const productsList = document.getElementById("productsList");

/* =====================================================
   INICIALIZACIÓN DEL DASHBOARD
   ===================================================== */

loadDashboard();
loadProducts();

/* =====================================================
   DASHBOARD / MÉTRICAS
   ===================================================== */

async function loadDashboard() {
  // Traemos todas las órdenes
  const res = await fetch(`${API_URL}/orders`);
  const orders = await res.json();

  // 1️⃣ Total de órdenes
  totalOrdersEl.textContent = orders.length;

  // 2️⃣ Órdenes pendientes
  const pendingOrders = orders.filter(o => o.status === "pending");
  pendingOrdersEl.textContent = pendingOrders.length;

  // 3️⃣ Total de dinero del día
  const today = new Date().toISOString().split("T")[0];

  const totalToday = orders
    .filter(o => o.date === today)
    .reduce((sum, order) => sum + order.total, 0);

  totalRevenueEl.textContent = `$${totalToday}`;

  // 4️⃣ Renderizar tabla de órdenes
  renderOrders(orders);
}

/* =====================================================
   RENDER DE ÓRDENES
   ===================================================== */

function renderOrders(orders) {
  ordersTable.innerHTML = "";

  orders.forEach(order => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${order.id}</td>
      <td>User ${order.userId}</td>
      <td>${order.status}</td>
      <td>$${order.total}</td>
      <td>
        <select class="form-select form-select-sm" data-id="${order.id}">
          <option value="pending" ${order.status === "pending" ? "selected" : ""}>pending</option>
          <option value="preparing" ${order.status === "preparing" ? "selected" : ""}>preparing</option>
          <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>delivered</option>
          <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>cancelled</option>
        </select>
      </td>
    `;

    ordersTable.appendChild(tr);
  });

  // Detectar cambio de estado
  document.querySelectorAll("select[data-id]").forEach(select => {
    select.addEventListener("change", updateOrderStatus);
  });
}

/* =====================================================
   CAMBIAR ESTADO DE ORDEN (PATCH)
   ===================================================== */

async function updateOrderStatus(e) {
  const orderId = e.target.dataset.id;
  const newStatus = e.target.value;

  await fetch(`${API_URL}/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: newStatus })
  });

  // Recargamos métricas
  loadDashboard();
}

/* =====================================================
   PRODUCTOS
   ===================================================== */

async function loadProducts() {
  const res = await fetch(`${API_URL}/products`);
  const products = await res.json();

  productsList.innerHTML = "";

  products.forEach(product => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${product.name} - $${product.price}`;
    productsList.appendChild(li);
  });
}

/* =====================================================
   CREAR PRODUCTO
   ===================================================== */

addProductBtn.addEventListener("click", async () => {
  const name = productNameInput.value;
  const price = productPriceInput.value;

  if (!name || !price) {
    alert("Fill all fields");
    return;
  }

  await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      price: Number(price)
    })
  });

  // Limpiar inputs
  productNameInput.value = "";
  productPriceInput.value = "";

  // Recargar lista
  loadProducts();
});
