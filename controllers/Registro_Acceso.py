from flask import Blueprint, render_template, redirect, url_for, flash, request, session
from services.Autenticacion import Servicio_Usuario

autenticacion = Servicio_Usuario()

reg_acc = Blueprint('sesiones', __name__)

@reg_acc.route('/Registro', methods=["POST"])
def registro():
    Datos_Registro = {
        "Nombre": request.form["Nombre"],
        "Telefono": request.form["Telefono"],
        "Email": request.form["Email"],
        "Sexo": request.form["Sexo"],
        "Contrasena": request.form["Contrasena"]
    }
    if Datos_Registro:
        autenticacion.registro(Datos=Datos_Registro)
        flash("Registro Exitoso", "success")
    return redirect(url_for('landing.principal'))

@reg_acc.route('/Acceso', methods=["POST"])
def acceso():
    nombre = request.form["Nombre"]
    contrasena = request.form["Contrasena"]
    if nombre and contrasena:
        autenticacion.acceso(nombre=nombre, contrasena=contrasena)
        session["user_id"] = f"{nombre}{len(nombre)}"
    else: 
        flash("Falta de Nombre y/o contraseña", "warning")
    return redirect(url_for('landing.principal'))