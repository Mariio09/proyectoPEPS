from flask import request, session
import json
import decimal
from __main__ import app
import miPrimeraAPI.web.controlador_coches as controlador_coches

class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal): return float(obj)

@app.route("/juegos",methods=["GET"])
def juegos():
    juegos,code= controlador_coches.obtener_juegos()
    return json.dumps(juegos, cls = Encoder),code

@app.route("/juego/<id>",methods=["GET"])
def juego_por_id(id):
    juego,code = controlador_coches.obtener_juego_por_id(id)
    return json.dumps(juego, cls = Encoder),code

@app.route("/juegos",methods=["POST"])
def guardar_juego():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        juego_json = request.json
        ret,code=controlador_coches.insertar_juego(juego_json["nombre"], juego_json["descripcion"], float(juego_json["precio"]), juego_json["foto"])
    else:
        ret={"status":"Bad request"}
        code=401
    return json.dumps(ret), code

@app.route("/juegos/<id>", methods=["DELETE"])
def eliminar_juego(id):
    ret,code=controlador_coches.eliminar_juego(id)
    return json.dumps(ret), code

@app.route("/juegos", methods=["PUT"])
def actualizar_juego():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        juego_json = request.json
        ret,code=controlador_coches.actualizar_juego(juego_json["id"],juego_json["nombre"], juego_json["descripcion"], float(juego_json["precio"]),juego_json["foto"])
    else:
        ret={"status":"Bad request"}
        code=401
    return json.dumps(ret), code