# 🧠 Backend Tienda Online – Flask + GraphQL

Este proyecto implementa el **backend** de una tienda online utilizando **Flask** y **GraphQL**, como segunda parte de la práctica.  
Se conecta al frontend desarrollado previamente en Vue, y permite consultar y modificar el inventario, manteniendo la lógica de disponibilidad sincronizada según el stock.

---

## 🛠 Tecnologías utilizadas

- Python 3.10+
- Flask 2.2.5
- Graphene 3.3
- GraphQL Core 3.2.6
- GraphQL Server 3.0.0b7

---

## 📦 Instalación y ejecución

### 1️⃣ Clonar el repositorio y acceder a la carpeta del backend

```bash
cd tienda-vue/backend
```

### 2️⃣ Crear y activar entorno virtual

```bash
python -m venv venv
venv\Scripts\activate
```

### 3️⃣ Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4️⃣ Ejecutar el servidor

```bash
python app.py
```

Accede a la interfaz gráfica de GraphQL en:

```
http://localhost:5000/graphql
```

---

## 🔍 Consultas y mutaciones de prueba

### 🟢 Consulta de productos

```graphql
query {
  productos {
    id
    nombre
    precio
    stock
    disponible
  }
}
```

### 🛠 Modificación de stock

```graphql
mutation {
  modificarStock(id: 1, cantidad: -1) {
    producto {
      id
      stock
      disponible
    }
  }
}
```

---

## ⚙️ Lógica implementada

- Cuando el `stock` de un producto llega a `0`, el campo `disponible` pasa a `false`.
- Cuando el `stock` se incrementa desde `0`, `disponible` vuelve a ser `true`.
- Esta lógica se ejecuta **exclusivamente en el backend**, cumpliendo el enunciado.

---

## 🧪 Pruebas automáticas

Se incluye un archivo `test.py` con pruebas básicas:

```bash
python test.py
```

✔️ Verifica que la API responde correctamente a queries y mutaciones.

---

## 📂 Estructura del proyecto

```
backend/
├── app.py              # Servidor Flask con GraphQLView
├── schema.py           # Esquema GraphQL con tipos, queries y mutaciones
├── data.py             # Lista de productos en memoria
├── test.py             # Pruebas mínimas de API
├── requirements.txt    # Dependencias del backend
└── Respuestas.md       # Respuestas a las preguntas del enunciado
```