import { reactive } from "vue";

export class Inventory {
  constructor() {
    this.products = reactive([
      { nombre: "Camisa", precio: 20, stock: 5, disponible: true },
      { nombre: "Pantalón", precio: 35, stock: 2, disponible: true },
      { nombre: "Zapatos", precio: 50, stock: 0, disponible: false },
      { nombre: "Mochila", precio: 45, stock: 10, disponible: true },
      { nombre: "Gorra", precio: 15, stock: 3, disponible: true },
      { nombre: "Sudadera", precio: 55, stock: 1, disponible: true }
    ]);
  }

  // Método para actualizar disponibilidad
  updateAvailability() {
    this.products.forEach((product) => {
      product.disponible = product.stock > 0;
    });
  }

  // Método para reducir stock
  reduceStock(index) {
    if (this.products[index].stock > 0) {
      this.products[index].stock--;
      this.updateAvailability();
    }
  }

  // Método para aumentar stock
  increaseStock(index) {
    this.products[index].stock++;
    this.updateAvailability();
  }
}
