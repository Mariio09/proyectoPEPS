def calcularlista(lista):
    for x in lista:
        x["precio"] = calcIva(x["precio"])
    return lista

def calcIva(precio):
    precio = float(precio)
    return precio * 1.21