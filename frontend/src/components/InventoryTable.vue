<script setup>
import { onMounted } from "vue";
import { Inventory } from "../store/inventory";
import InventoryItem from "./InventoryItem.vue";

const inventory = new Inventory();

const reduceStock = async (index) => {
  await inventory.reduceStock(index);
};

const increaseStock = async (index) => {
  await inventory.increaseStock(index);
};

onMounted(async () => {
  await inventory.fetchProducts();
});
</script>

<template>
  <div class="container">
    <h1 class="title">📦 Gestión de Inventario</h1>
    <p class="subtitle">Administra tu stock en tiempo real</p>

    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio (€)</th>
          <th>Stock</th>
          <th>Disponibilidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <InventoryItem
          v-for="(producto, index) in inventory.products"
          :key="producto.id"
          :producto="producto"
          :index="index"
          :reduceStock="reduceStock"
          :increaseStock="increaseStock"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Fondo de la página */
body {
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Contenedor principal más grande */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  font-family: "Arial", sans-serif;
}

/* Título principal */
.title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

/* Subtítulo */
.subtitle {
  font-size: 20px;
  color: #666;
  margin-bottom: 25px;
}

/* Tabla grande */
table {
  width: 100%;
  border-collapse: collapse;
  background: #f8f9fa;
  border-radius: 5px;
  overflow: hidden;
  font-size: 18px;
}

/* Encabezados de tabla */
th {
  background-color: #007bff;
  color: white;
  padding: 15px;
  font-size: 20px;
  text-transform: uppercase;
}

/* Celdas */
td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  color: #333;
}

/* Mensaje cuando no hay productos */
.empty-message {
  font-style: italic;
  color: #888;
  text-align: center;
  padding: 15px;
  font-size: 20px;
}
</style>
