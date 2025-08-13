from flask import Flask
from middlewares.autenticacion_middleware import require_login_middleware
from config import Config
from db import db

app = Flask(__name__)

# Cargar la configuracion desde la clase Config
app.config.from_object(Config)

# Inicializacion de la Base de Datos
db.init_app(app)

# Crea las todas las Tablas si no existen
with app.app_context():
    db.create_all()

# Configurar middleware de autenticación
require_login_middleware(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)