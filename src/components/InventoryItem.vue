<script setup>
defineProps(["producto", "index", "reduceStock", "increaseStock"]);
</script>

<template>
  <tr>
    <td>{{ producto.nombre }}</td>
    <td>{{ producto.precio.toFixed(2) }}€</td>
    <td>{{ producto.stock }}</td>
    <td>
      <span :class="producto.disponible ? 'disponible' : 'agotado'">
        {{ producto.disponible ? "Disponible" : "Agotado" }}
      </span>
    </td>
    <td class="buttons">
      <button class="decrementar" @click="reduceStock(index)">-</button>
      <button class="incrementar" @click="increaseStock(index)">+</button>
    </td>
  </tr>
</template>

<style scoped>
/* Aumentar tamaño de texto en las celdas */
td {
  font-size: 18px;
  color: #333;
  text-align: center;
}

/* Disponibilidad */
.disponible {
  color: green;
  font-weight: bold;
  font-size: 18px;
}

.agotado {
  color: red;
  font-weight: bold;
  font-size: 18px;
}

/* Botones más grandes */
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

button {
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  transition: background 0.3s ease;
}

/* Botón + */
.incrementar {
  background-color: #28a745;
  color: white;
}

.incrementar:hover {
  background-color: #218838;
}

/* Botón - */
.decrementar {
  background-color: #dc3545;
  color: white;
}

.decrementar:hover {
  background-color: #c82333;
}
</style>
