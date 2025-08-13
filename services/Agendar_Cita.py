from db.table import Servicio, Cita, db
from datetime import datetime, timedelta

class Servicio_Citas:
    # Método Agendar
    @staticmethod
    def agendar(id_servicio, fecha, hora, estatus, empleado, forma_pago):
        # Obtencion de un servicio
        servicio = Servicio.query.get(id_servicio)

        # Formateo de Fecha y Hora a objetos de tiempo
        fecha_obj = datetime.strptime(fecha, '%Y-%m-%d').date()
        hora_obj = datetime.strptime(hora, '%H:%M').time()

        # Consultar citas existentes el mismo día
        citas_dia = Cita.query.filter_by(fecha=fecha_obj, empleado_asignado=empleado).all()

        inicio_nueva = datetime.combine(fecha_obj, hora_obj)
        fin_nueva = inicio_nueva + timedelta(minutes=servicio.duracion)

        for cita in citas_dia:
            # Obtener duración del servicio de la cita existente
            duracion_existente = cita.servicio.duracion

            inicio_existente = datetime.combine(cita.fecha, cita.hora)
            fin_existente = inicio_existente + timedelta(minutes=duracion_existente)

            # Verificar si hay solapamiento
            if inicio_nueva < fin_existente and inicio_existente < fin_nueva:
                return f"Cita se cruza con otra agendada de {inicio_existente.time()} a {fin_existente.time()}"

        # Creación del nuevo objeto Cita
        nueva_cita = Cita(
            fecha=fecha_obj,
            hora=hora_obj,
            estatus=estatus,
            empleado_asignado=empleado,
            forma_pago=forma_pago,
            id_servicio=servicio.id_servicio
        )
        
        # Guardar en la base de datos
        db.session.add(nueva_cita)
        db.session.commit()

        # Devuelve el nuevo objeto de la cita indicando que el registro fue exitoso
        return nueva_cita