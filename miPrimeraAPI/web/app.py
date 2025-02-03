import os
from flask import Flask

app = Flask(__name__)

app.config.from_pyfile('settings.py')
  
import rutas_inicio

import rutas_upload

import rutas_verfichero

import rutas_coches

import rutas_iva

if __name__ == '__main__':
    port = int(os.environ.get('PORT'))
    host = os.environ.get('HOST')
    app.run(host=host, port=port)