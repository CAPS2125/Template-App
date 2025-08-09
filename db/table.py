from db import db

# Link this class to the database as a table
class Cliente(db.Model):
    # Nombre de la Tabla en la Base de Datos.
    __tablename__ = 'Cliente'