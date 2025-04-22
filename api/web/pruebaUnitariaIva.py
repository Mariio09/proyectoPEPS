import unittest
from miPrimeraAPI.web.CalcIva import calcIva

class PruebaCalcularIVA(unittest.TestCase):

    def test_calculate_iva(self):
        self.assertAlmostEqual(calcIva(100), 121)  # Calcula 100 * 1.21

if __name__ == '__main__':
    unittest.main()