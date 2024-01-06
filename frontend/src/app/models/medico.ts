export class Medico {
    _id?: string;
    medTipoDoc: string;
    medNumDoc: number;
    medNombres: string;
    medApellidos: string;
    medEspecialidad: string;
    medFechaNacimiento: string;
    medSexo: string;
    medTelefono: Number;
    medCorreo: string;
    medEstado: string;
    userroles: string;
  
    constructor(
      _id = "",
      medTipoDoc = "",
      medNumDoc = 0,
      medNombres = "",
      medApellidos = "",
      medEspecialidad = "",
      medFechaNacimiento = "",
      medSexo = "",
      medTelefono = 0,
      medCorreo = "",
      medEstado = "",
      userroles = ""
    ) {
      this._id = _id;
      this.medTipoDoc = medTipoDoc;
      this.medNumDoc = medNumDoc;
      this.medNombres = medNombres;
      this.medApellidos = medApellidos;
      this.medEspecialidad = medEspecialidad;
      this.medFechaNacimiento = medFechaNacimiento;
      this.medSexo = medSexo;
      this.medTelefono = medTelefono;
      this.medCorreo = medCorreo;
      this.medEstado = medEstado;
      this.userroles = userroles;
    }
  }
  