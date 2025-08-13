from db import db
from werkzeug.security import generate_password_hash, check_password_hash

# Enlace esta clase a la base de datos como una tabla.
class Usuario(db.Model):
    # Nombre de la Tabla en la Base de Datos.
    __tablename__ = 'Usuarios'

    # Identificador unico del usuario
    id_usuario = db.Column(db.Integer, primary_key=True)
    # Nombre del usuario, con posibilidad que se repita
    nombre = db.Column(db.String(50), unique=False, nullable=False)
    # Telefono unico, campo obligatorio
    telefono = db.Column(db.String(20), unique=True, nullable=False)
    # Email unico, capaz de estar nulo
    email = db.Column(db.String(50), unique=True, nullable=True)
    # Sexo (H, M, O), campo obligatorio
    sexo = db.Column(db.Enum('H', 'M', 'O', name='sexo_enum'), unique=False, nullable=False)
    # Contraseña unica, campo obligatorio
    contrasena_hash = db.Column(db.String(128), nullable=False)

    # Convierte la contraseña simple en una contraseña con hash para mayor seguridad
    def set_password(self, contrasena):
        self.contrasena_hash = generate_password_hash(contrasena)

    # Método para comparar la contraseña dada con la cifrada
    def check_password(self, contrasena):
        return check_password_hash(self.contrasena_hash, contrasena)

class Cita(db.Model):
    __tablename__ = 'Citas'

    # Identificador unico de la cita
    id_cita = db.Column(db.Integer, primary_key=True)
    # Fecha (D-M-Y), campo obligatorio
    fecha = db.Column(db.Date, unique=False, nullable=False)
    # Hora (HH:MM), campo obligatorio
    hora = db.Column(db.Time, unique=False, nullable=False)
    # Estatus (Confirmada, Completada, Cancelada), campo obligatorio
    estatus = db.Column(db.Enum('Confirmada', 'Completada', 'Cancelada', name='estatus_enum'), nullable=False)
    # Empleado Asignado, campo obligatorio
    empleado_asignado = db.Column(db.String(50), unique=False, nullable=False)
    # Formato de Pago (Efectivo, Tarjeta, Transferencia), campo obligatorio
    forma_pago = db.Column(db.Enum('Efectivo', 'Tarjeta', 'Transferencia', name='forma_pago_enum'), nullable=False)

    # Clave foránea a Servicio
    id_servicio = db.Column(db.Integer, db.ForeignKey('Servicios.id_servicio'), nullable=False)

    # Relación para acceder desde objeto Cita al servicio
    servicio = db.relationship('Servicio', backref='citas')

class Servicio(db.Model):
    __tablename__ = 'Servicios'

    # Identificador unico del servicio
    id_servicio = db.Column(db.Integer, primary_key=True)
    # Servicios unicos, campo obligatorio
    nombre_servicio = db.Column(db.String(30), unique=True, nullable=False)
    # Precio ($ MXN), campo obligatorio
    precio = db.Column(db.Integer, unique=False, nullable=False)
    # Duracion (Minutos), campo obligatorio
    duracion = db.Column(db.Integer, unique=False, nullable=False)
    # Activo (True/False), campo obligatorio
    activo = db.Column(db.Boolean, nullable=False, default=True)
