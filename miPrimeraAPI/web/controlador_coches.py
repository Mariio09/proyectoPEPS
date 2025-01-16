from __future__ import print_function
from bd import obtener_conexion
import sys

def insertar_coche(matricula, marca, modelo, descripcion, precio,foto):
    try:
        conexion = obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("INSERT INTO coches(matricula, marca, modelo, descripcion, precio,foto) VALUES (%s, %s, %s, %s, %s, %s)",
                       (matricula, marca, modelo, descripcion, precio,foto))
            if cursor.rowcount == 1:
                ret={"status": "OK" }
            else:
                ret = {"status": "Failure" }
        code=200
        conexion.commit()
        conexion.close()
    except:
        print("Excepcion al insertar un coche", file=sys.stdout)
        ret = {"status": "Failure" }
        code=500
    return ret,code

def convertir_coche_a_json(coche):
    d = {}
    d['id'] = coche[0]
    d['matricula'] = coche[1]
    d['marca'] = coche[2]
    d['modelo'] = coche[3]
    d['descripcion'] = coche[4]
    d['precio'] = coche[5]
    d['foto'] = coche[6]
    return d

def obtener_coches():
    try:
        conexion = obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("SELECT * FROM coches")
            coches = cursor.fetchall()
            cochesjson=[]
            if coches:
                for coche in coches:
                    cochesjson.append(convertir_coche_a_json(coche))
        conexion.close()
        code=200
    except:
        print("Excepcion al obtener los coches", file=sys.stdout)
        cochesjson=[]
        code=500
    return cochesjson,code

def obtener_coche_por_id(id):
    cochejson = {}
    try:
        conexion = obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("SELECT * FROM coches WHERE id =" + id)
            coche = cursor.fetchone()
            if coche is not None:
                cochejson = convertir_coche_a_json(coche)
        conexion.close()
        code=200
    except:
        print("Excepcion al recuperar un coche", file=sys.stdout)
        code=500
    return cochejson,code


def eliminar_coche(id):
    try:
        conexion = obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("DELETE FROM coches WHERE id = %s", (id,))
            if cursor.rowcount == 1:
                ret={"status": "OK" }
            else:
                ret={"status": "Failure" }
        conexion.commit()
        conexion.close()
        code=200
    except:
        print("Excepcion al eliminar un coche", file=sys.stdout)
        ret = {"status": "Failure" }
        code=500
    return ret,code

def actualizar_coche(id, matricula, marca, modelo, descripcion, precio, foto):
    try:
        conexion = obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("UPDATE coches SET matricula = %s, marca = %s, modelo = %s, descripcion = %s, precio = %s, foto=%s WHERE id = %s",
                       (matricula, marca, modelo, descripcion, precio, foto,id))
            if cursor.rowcount == 1:
                ret={"status": "OK" }
            else:
                ret={"status": "Failure" }
        conexion.commit()
        conexion.close()
        code=200
    except:
        print("Excepcion al eliminar un coche", file=sys.stdout)
        ret = {"status": "Failure" }
        code=500
    return ret,code
