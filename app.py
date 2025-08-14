from flask import Flask
from controllers.landing import landing
from controllers.Registro_Acceso import reg_acc
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

# Registro de Controladores a la Aplicacion
app.register_blueprint(landing)
app.register_blueprint(reg_acc)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)