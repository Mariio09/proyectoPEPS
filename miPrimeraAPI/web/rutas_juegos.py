from flask import request, session
import json
import decimal
from __main__ import app
import controlador_coches

class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal): return float(obj)

@app.route("/coches",methods=["GET"])
def coches():
    coches,code= controlador_coches.obtener_coches()
    return json.dumps(coches, cls = Encoder),code

@app.route("/coche/<id>",methods=["GET"])
def coche_por_id(id):
    coche,code = controlador_coches.obtener_coche_por_id(id)
    return json.dumps(coche, cls = Encoder),code

@app.route("/coches",methods=["POST"])
def guardar_coche():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        coche_json = request.json
        ret,code=controlador_coches.insertar_coche(coche_json["nombre"], coche_json["descripcion"], float(coche_json["precio"]), coche_json["foto"])
    else:
        ret={"status":"Bad request"}
        code=401
    return json.dumps(ret), code

@app.route("/coches/<id>", methods=["DELETE"])
def eliminar_coche(id):
    ret,code=controlador_coches.eliminar_coche(id)
    return json.dumps(ret), code

@app.route("/coches", methods=["PUT"])
def actualizar_coche():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        coche_json = request.json
        ret,code=controlador_coches.actualizar_coche(coche_json["id"],coche_json["nombre"], coche_json["descripcion"], float(coche_json["precio"]),coche_json["foto"])
    else:
        ret={"status":"Bad request"}
        code=401
    return json.dumps(ret), code