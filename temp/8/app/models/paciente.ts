export class Paciente {
  _id?: string;
  pacTipoDoc: string;
  pacNumDoc: number;
  pacNombres: string;
  pacApellidos: string;
  pacFechaNacimiento: string;
  pacSexo: string;
  pacTelefono: string;
  pacCorreo: string;
  pacEPS: string;
  pacEstado: string[];
  pacContrasena: string;
  userroles: string;

  constructor(
    _id = "",
    pacTipoDoc = "",
    pacNumDoc = 0,
    pacNombres = "",
    pacApellidos = "",
    pacFechaNacimiento = "",
    pacSexo = "",
    pacTelefono = "",
    pacCorreo = "",
    pacEPS = "",
    pacEstado = [""],
    pacContrasena = "",
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
    this.pacContrasena = pacContrasena;
    this.userroles = userroles;
  }
}
