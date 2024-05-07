export class User {
    _id?: string;
    username: string;
    useremail: string;
    userpassword: string;
    userestado: string;
    userroles: string;

    constructor(
      username:string, 
      useremail: string, 
      userpassword: string, 
      userestado: string, 
      userroles: string){

      this.username = username;
      this.useremail = useremail;
      this.userpassword = userpassword;
      this.userestado =  userestado;
      this.userroles =  userroles;
    }
  }
  