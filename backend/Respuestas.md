# Respuestas - Práctica Backend Flask + GraphQL

---

## 1. ¿Qué ventajas ofrece GraphQL sobre REST en este contexto?

GraphQL permite obtener exactamente los datos necesario en una única petición, evitando múltiples llamadas como en REST. En el contexto de esta tienda online, permite consultar solo los campos que el frontend necesita (por ejemplo, nombre y stock) y estructurar fácilmente mutaciones para actualizar productos. Esto mejora el rendimiento y la claridad de la comunicación entre frontend y backend.

---

## 2. ¿Cómo se definen los tipos y resolvers en una API con GraphQL?

Los tipos se definen utilizando clases que heredan de `graphene.ObjectType`, donde se declaran los campos con su tipo (`graphene.String()`, `graphene.Int()`, etc.).
Los resolvers son métodos que comienzan con `resolve_`y permiten procesar las consultas. En el caso de las mutaciones, se definen como clases que heredan de `graphene.Mutation`, incluyendo los argumentos de entrada y el método `mutate()`con la lógica.

---

## 3. ¿Por qué es importante que el backend también actualice disponible y no depender solo del frontend?

Porque el frontend puede ser modificado o manipulable por el usuario, mientras que el backend garantiza que la lógica de negocio se cumple siempre. Si la disponibilidad dependiera del frontend, los datos podrían volverse inconsistentes. El backend es el lugar correcto para validar reglas como "si stock es 0, disponible debe ser false".

---

## 4. ¿Cómo garantizas que la lógica de actualización de stock y disponibilidad sea coherente?

La lógica se centraliza en el backend, dentro del resolver de la mutación `modificarStock`. Allí, cada vez que se modifica el stock, se actualiza automáticamente el campo `disponible`mediante una función (`actualizar_disponibilidad`). De esta forma, la consistencia se mantiene sin depender del comportamiento del cliente.