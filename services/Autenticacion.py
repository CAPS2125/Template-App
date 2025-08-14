from db.table import Usuario, db

class Servicio_Usuario:
    # Método Registro
    @staticmethod
    def registro(nombre, contrasena, telefono, email, sexo):
        # Comprueba si ya existe un usuario con el nombre de usuario indicado en la base de datos
        existe_usuario = Usuario.query.filter_by(nombre=nombre).first()
        if existe_usuario:
            # Si el usuario existe, devuelve None indicando un error de registro
            return None
        # Crea y configura un nuevo objeto Usuario con el nombre de usuario proporcionado
        nuevo_usuario = Usuario(nombre=nombre, telefono=telefono, email=email, sexo=sexo)
        # Crea un hash de la contraseña y la almacena de forma segura en el objeto de usuario
        nuevo_usuario.set_password(contrasena)
        # Agregue el nuevo objeto de usuario a la sesión de base de datos para guardarlo
        db.session.add(nuevo_usuario)
        # Confirmar la transacción para guardar el nuevo usuario en la base de datos
        db.session.commit()
        # Devuelve el nuevo objeto de usuario indicando que el registro fue exitoso
        return nuevo_usuario
    
    # Método Acceso
    @staticmethod
    def acceso(nombre, contrasena):
        # Recuperar la instancia de usuario usando su nombre de usuario
        user = Usuario.query.filter_by(nombre=nombre).first()
        # Utilizando el método check_password para comparar las contraseñas
        if user and user.check_password(contrasena):
            # Devuelve el objeto de usuario si el inicio de sesión es exitoso
            return user
        # Devolver None si el inicio de sesión falla debido a credenciales no válidas
        return None