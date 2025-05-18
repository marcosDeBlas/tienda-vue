import graphene
from data import productos

class Producto(graphene.ObjectType):
    id = graphene.Int()
    nombre = graphene.String()
    precio = graphene.Float()
    stock = graphene.Int()
    disponible = graphene.Boolean()

def actualizar_disponibilidad(producto):
    producto["disponible"] = producto["stock"] > 0

class Query(graphene.ObjectType):
    productos = graphene.List(Producto)

    def resolve_productos(self, info):
        return productos
    
class ModificarStock(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        cantidad = graphene.Int(required=True)

    producto = graphene.Field(Producto)

    def mutate(self, info, id, cantidad):
        for p in productos:
            if p["id"] == id:
                p["stock"] += cantidad
                if p["stock"] < 0:
                    p["stock"] = 0
                actualizar_disponibilidad(p)
                return ModificarStock(producto=p)
        raise Exception("Producto no encontrado")
    
class Mutation(graphene.ObjectType):
    modificar_stock = ModificarStock.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)