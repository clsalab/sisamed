export class ConstantUri {
    public static readonly baseUrl = 'http://localhost:3001/api';
    public static readonly registerUserUrl = `${ConstantUri.baseUrl}/auth/register`;
    public static readonly loginUserUrl = `${ConstantUri.baseUrl}/auth/login`;
    public static readonly citaUrl = `${ConstantUri.baseUrl}/cita`;
    public static readonly consultUrl = `${ConstantUri.baseUrl}/consultorio`;
    public static readonly ipsUrl = `${ConstantUri.baseUrl}/ips`;
    public static readonly medicoUrl = `${ConstantUri.baseUrl}/medico`;
    public static readonly pacienteUrl = `${ConstantUri.baseUrl}/paciente`;
    public static readonly storageUrl = `${ConstantUri.baseUrl}/storage`;
    public static readonly usersUrl = `${ConstantUri.baseUrl}/users`;
  }
  