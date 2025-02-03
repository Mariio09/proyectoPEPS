import unittest
from rutas_iva import calcIva

class PruebaCalcularIVA(unittest.TestCase):

    def test_calculate_iva(self):
        self.assertAlmostEqual(calcIva(100), 21)  # Calcula 100 * 0.21

if __name__ == '__main__':
    unittest.main()