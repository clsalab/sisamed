export class Cita {
    _id?: string;
    citNumDocPaciente: number;
    citNombrePaciente: string;
    citEPSPaciente: string;
    citMedico: string;
    citEspecialidad: string;
    citFecha: string;
    citHora: string;
    citColsultorio: string;
    citEstado: string;
    citObservacion: string;
    citNumAprobaion: number;

    constructor(
    _id = "",
    citNumDocPaciente = 0,
    citNombrePaciente = "",
    citEPSPaciente = "",
    citMedico = "",
    citEspecialidad = "",
    citFecha = "",
    citHora = "",
    citColsultorio = "",
    citEstado = "",
    citObservacion = "",
    citNumAprobaion = 0
    ) {
    this._id = _id;
    this.citNumDocPaciente = citNumDocPaciente;
    this.citNombrePaciente = citNombrePaciente;
    this.citEPSPaciente = citEPSPaciente;
    this.citMedico = citMedico;
    this.citEspecialidad = citEspecialidad;
    this.citFecha = citFecha;
    this.citHora = citHora;
    this.citColsultorio = citColsultorio;
    this.citEstado = citEstado;
    this.citObservacion = citObservacion;
    this.citNumAprobaion = citNumAprobaion;
    }
}