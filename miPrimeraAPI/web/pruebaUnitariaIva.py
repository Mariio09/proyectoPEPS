import unittest
from rutas_iva import calculariva

class PruebaCalcularIVA(unittest.TestCase):

    def test_calculate_iva(self):
        self.assertAlmostEqual(calculariva(100), 21)

if __name__ == '__main__':
    unittest.main()
