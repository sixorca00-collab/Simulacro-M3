// URL BASE DEL SERVIDOR
const API_URL = "http://localhost:3000";

// INPUTS Y btn de logout
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productImageInput = document.getElementById("productImage");
const addProductBtn = document.getElementById("addProduct");
const productsList = document.getElementById("productsList");
const logoutBtn = document.getElementById("logoutBtn");


// CARGAR PRODUCTOS AL ENTRAR
document.addEventListener("DOMContentLoaded", loadProducts);

// FUNCIÓN PARA CARGAR PRODUCTOS
async function loadProducts() {
  productsList.innerHTML = "";

  const res = await fetch(`${API_URL}/products`);
  const products = await res.json();

  products.forEach(product => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center";

    li.innerHTML = `
      <img src="${product.image}" width="60" height="60" class="me-3 rounded" style="object-fit:cover">
      <div class="flex-grow-1">
        <strong>${product.name}</strong><br>
        $${product.price}
      </div>
      <button class="btn btn-danger btn-sm">Delete</button>
    `;

    // ELIMINAR PRODUCTO
    li.querySelector("button").addEventListener("click", async () => {
      await fetch(`${API_URL}/products/${product.id}`, {
        method: "DELETE"
      });
      loadProducts();
    });

    productsList.appendChild(li);
  });
}

// CREAR PRODUCTO
addProductBtn.addEventListener("click", async () => {
  const name = productNameInput.value;
  const price = productPriceInput.value;
  const image = productImageInput.value;

  if (!name || !price || !image) {
    alert("Fill all fields");
    return;
  }

  await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      price: Number(price),
      image
    })
  });

  productNameInput.value = "";
  productPriceInput.value = "";
  productImageInput.value = "";

  loadProducts();
});
logoutBtn.addEventListener("click", () => {
  // Eliminar sesión
  localStorage.removeItem("isAuth");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");

  // Redirigir al login
  window.location.href = "../index.html";
});

