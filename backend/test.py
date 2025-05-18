import unittest
from app import app
import json

class TestGraphQLAPI(unittest.TestCase):
    
    def setUp(self):
        self.client = app.test_client()

    def test_query_productos(self):
        query = '''
        query {
           productos {
               id
               nombre
               precio
               stock
               disponible
            }
        }
        '''

        response = self.client.post('/graphql', json={'query': query})
        data = json.loads(response.data)
        self.assertIn("productos", data["data"])
        self.assertTrue(len(data["data"]["productos"]) > 0)

    def test_modificar_stock(self):
        mutation = '''
        mutation {
           modificarStock(id: 1, cantidad: -1) {
               producto {
                   id
                   stock
                   disponible
                }
            }
        }
        '''

        response = self.client.post('/graphql', json={'query': mutation})
        data = json.loads(response.data)
        self.assertIn("modificarStock", data["data"])
        self.assertTrue(data["data"]["modificarStock"]["id"], 1)

    if __name__ == '__main__':
        unittest.main()