# 📘 Preguntas sobre Reactividad en Vue

## 1️⃣ Vue no detecta cambios dentro de objetos reactivos de la forma que esperarías. ¿Cómo podrías observar un cambio en una propiedad anidada?

Vue 3 no detecta automáticamente cambios en propiedades dentro de un objeto reactivo porque `reactive()` no realiza un seguimiento profundo de los cambios en propiedades anidadas.  

Para observar cambios en una propiedad específica dentro de un objeto, se debe usar `watch()` con una función que acceda a la propiedad en cuestión.

```js
import { reactive, watch } from "vue";

const producto = reactive({
  nombre: "Camisa",
  detalles: { stock: 5 }
});

watch(() => producto.detalles.stock, (nuevoValor, viejoValor) => {
  console.log(`El stock cambió de ${viejoValor} a ${nuevoValor}`);
});

## 2️⃣ `watch()` permite escuchar cambios en propiedades específicas dentro de `reactive()`, explica cómo funciona.

El método `watch()` permite reaccionar a cambios en una propiedad específica de un objeto reactivo.  
Se usa pasando una función que devuelve la propiedad que queremos observar y un callback que recibe el valor antiguo y el nuevo.

```js
import { reactive, watch } from "vue";

const producto = reactive({
  nombre: "Pantalón",
  stock: 5
});

watch(() => producto.stock, (nuevoValor, viejoValor) => {
  console.log(`El stock cambió de ${viejoValor} a ${nuevoValor}`);
});

## 3️⃣ ¿Cómo harías que un `watch()` detecte cambios en `stock` dentro de un array de productos?

Cuando trabajamos con listas de objetos reactivos, Vue no detecta cambios directamente en las propiedades de los objetos dentro del array.  
Para solucionar esto, podemos usar `watch()` observando una lista de stocks mapeada desde el array.

```js
import { reactive, watch } from "vue";

const productos = reactive([
  { nombre: "Camisa", stock: 5 },
  { nombre: "Pantalón", stock: 2 },
  { nombre: "Zapatos", stock: 0 }
]);

watch(
  () => productos.map(p => p.stock), // Observar cambios en la lista de stocks
  (nuevosStocks, antiguosStocks) => {
    nuevosStocks.forEach((nuevoStock, index) => {
      console.log(`El stock de ${productos[index].nombre} cambió de ${antiguosStocks[index]} a ${nuevoStock}`);
    });
  }
);


