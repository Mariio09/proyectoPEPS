import os
from flask import Flask

app = Flask(__name__)

app.config.from_pyfile('settings.py')
from logging.config import dictConfig

import bleach

import auxvars

import rutas_inicio

import rutas_coches

import CalcIva

from auxvars import prepare_response_extra_headers



if __name__ == '__main__':
    port = int(os.environ.get('PORT'))
    host = os.environ.get('HOST')
    app.run(host=host, port=port)

extra_headers=prepare_response_extra_headers(True)


#Configuracion de los logs
dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
                "formatter": "default",
            },
            "file": {
                "class": "logging.FileHandler",
                "filename": "logs/flask.log",
                "formatter": "default",
            },
            "time-rotate": {
               "class": "logging.handlers.TimedRotatingFileHandler",
                "filename": "logs/flask.log",
                "when": "D",
                "interval": 10,
                "backupCount": 5,
                "formatter": "default",
            },
        },
        "root": {"level": "DEBUG", "handlers": ["console","time-rotate"]},
    }

)

@app.after_request
def afterRequest(response):
    response.headers['Server'] = 'API'
    app.logger.info(
        "path: %s | method: %s | status: %s | size: %s >>> %s",
        request.path,
        request.method,
        response.status,
        response.content_length,
        request.remote_addr,
    )
    response.headers.extend(extra_headers)
    return response