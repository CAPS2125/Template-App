from flask import session, redirect, url_for, request

def require_login_middleware(app):
    # Configurar el middleware para que se ejecute antes de cada solicitud
    @app.before_request
    def require_login():
        # Comprueba si el punto final actual no está en la lista de permitidos
        if request.endpoint not in ['landing.principal', 'static']:
            # Verificar si 'user_id' está en la sesión; si no, el usuario no ha iniciado sesión
            if 'user_id' not in session:
                # Redirigir a los usuarios no autenticados a la página de autenticación
                return redirect(url_for('landing.principal'))