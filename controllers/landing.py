from flask import Blueprint, render_template

landing = Blueprint('landing', __name__)

@landing.route('/', methods=["GET"])
def principal():
    return "Hola Web"