export class Consult {
    _id?: string;
    conNombre: string;
    conUbicacion: string;
    conEspecialidad: string;
    conEstado: string;
   

    constructor(
      _id:string,
      conNombre:string, 
      conUbicacion: string, 
      conEspecialidad: string, 
      conEstado: string,){

      this._id = _id;
      this.conNombre = conNombre;
      this.conUbicacion = conUbicacion;
      this.conEspecialidad = conEspecialidad;
      this.conEstado =  conEstado;
    }
  }
  