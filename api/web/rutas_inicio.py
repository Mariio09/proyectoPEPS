from __future__ import print_function
from __main__ import app
from flask import request,session
from bd import obtener_conexion
import json
import os
import hashlib
from auxvars import sanitize_input

@app.route("/api/login",methods=['POST'])
def login():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        usuario_json = request.json
        username = sanitize_input(usuario_json['username'])
        password = sanitize_input(usuario_json['password'])
        password = os.environ.get('SALT') + password
        password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        try:
            conexion = obtener_conexion()
            with conexion.cursor() as cursor:
                 #cursor.execute("SELECT perfil FROM usuarios WHERE usuario = %s and clave= %s",(username,password))
                 cursor.execute("SELECT perfil FROM usuarios WHERE usuario = %s and clave= %s",(username, password))
                 usuario = cursor.fetchone()
            conexion.close()
            if usuario is None:
                ret = {"status": "ERROR","mensaje":"Usuario/clave erroneo" }
            else:
                ret = {"status": "OK", "type":usuario[0], "username":username }
                app.logger.info("Usuario iniciado con exito %s", username);
                session["usuario"]=username
                session["perfil"]=usuario[0]
            code=200
        except:
            print("Excepcion al validar al usuario")   
            ret={"status":"ERROR"}
            code=500
    else:
        ret={"status":"Bad request"}
        code=401
    return ret, code

@app.route("/api/registro",methods=['POST'])
def registro():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        usuario_json = request.json
        username = sanitize_input(usuario_json['username'])
        password = sanitize_input(usuario_json['password'])
        password = os.environ.get('SALT') + password
        password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        perfil = "normal"
        try:
            conexion = obtener_conexion()
            with conexion.cursor() as cursor:
                 #cursor.execute("SELECT perfil FROM usuarios WHERE usuario = %s and clave= %s",(username,password))
                 cursor.execute("SELECT perfil FROM usuarios WHERE usuario = %s",(username))
                 usuario = cursor.fetchone()
                 if usuario is None:
                     cursor.execute("INSERT INTO usuarios(usuario,clave,perfil) VALUES(%s,%s,%s)",(username,password,perfil)) 
                     if cursor.rowcount == 1:
                         conexion.commit()
                         ret={"status": "OK" }
                         app.logger.info("Usuario registrado con exito %s", username);
                         code=200
                     else:
                         ret={"status": "ERROR" }
                         code=500
                 else:
                   ret = {"status": "ERROR","mensaje":"Usuario/clave erroneo" }
                   code=200
            conexion.close()
        except:
            print("Excepcion al registrar al usuario")   
            ret={"status":"ERROR"}
            code=500
    else:
        ret={"status":"Bad request"}
        code=401
    return json.dumps(ret), code


@app.route("/api/logout",methods=['GET'])
def logout():
    session.clear()
    app.logger.info("Usuario salido con exito");
    return json.dumps({"status":"OK"}),200
