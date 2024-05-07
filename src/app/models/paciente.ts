export class Paciente {
  _id?: string;
  pacTipoDoc: string;
  pacNumDoc: number;
  pacNombres: string;
  pacApellidos: string;
  pacFechaNacimiento: string;
  pacSexo: string;
  pacTelefono: Number;
  pacCorreo: string;
  pacEPS: string;
  pacEstado: string;
  userroles: string;

  constructor(
    _id = "",
    pacTipoDoc = "",
    pacNumDoc = 0,
    pacNombres = "",
    pacApellidos = "",
    pacFechaNacimiento = "",
    pacSexo = "",
    pacTelefono = 0,
    pacCorreo = "",
    pacEPS = "",
    pacEstado = "",
    userroles = ""
  ) {
    this._id = _id;
    this.pacTipoDoc = pacTipoDoc;
    this.pacNumDoc = pacNumDoc;
    this.pacNombres = pacNombres;
    this.pacApellidos = pacApellidos;
    this.pacFechaNacimiento = pacFechaNacimiento;
    this.pacSexo = pacSexo;
    this.pacTelefono = pacTelefono;
    this.pacCorreo = pacCorreo;
    this.pacEPS = pacEPS;
    this.pacEstado = pacEstado;
    this.userroles = userroles;
  }
}
