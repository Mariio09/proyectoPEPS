from __main__ import app
from flask import request

@app.route("/iva",methods=['POST'])
def calculariva(importe):
    return importe*0.21

print(calculariva(100))