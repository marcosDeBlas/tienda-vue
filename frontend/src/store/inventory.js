import { reactive } from "vue";

export class Inventory {
  constructor() {
    this.products = reactive([]);
  }

  async fetchProducts() {
    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              productos {
                id
                nombre
                precio
                stock
                disponible
                }
                }
                `
        })
      });

      const result= await response.json();
      this.products.splice(0, this.products.length, ...result.data.productos);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  }

  async modifyStock(id, cantidad) {
    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation{
              modificarStock(id: ${id}, cantidad: ${cantidad}) {
               producto {
                id
                stock
                disponible
                }
                }
                }
                `
        })
      });

      const result= await response.json();
      const updatedProduct = result.data.modicarStock.producto;
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1){
        this.products[index].stock = updatedProduct.stock;
        this.products[index].disponible = updatedProduct.disponible;
      }
    } catch (error) {
      console.error("Error modificando stock:", error);
    }
  }

  async reduceStock(index) {
    const product = this.products[index];
    if (product.stock > 0) {
      await this.modifyStock(product.id, -1);
    }
  }

  async increaseStock(index) {
    const product = this.products[index];

      await this.modifyStock(product.id, 1);
  }



  // // Método para actualizar disponibilidad
  // updateAvailability() {
  //   this.products.forEach((product) => {
  //     product.disponible = product.stock > 0;
  //   });
  // }

  // // Método para reducir stock
  // reduceStock(index) {
  //   if (this.products[index].stock > 0) {
  //     this.products[index].stock--;
  //     this.updateAvailability();
  //   }
  // }

  // // Método para aumentar stock
  // increaseStock(index) {
  //   this.products[index].stock++;
  //   this.updateAvailability();
  // }
}
