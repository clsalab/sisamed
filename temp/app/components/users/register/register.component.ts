import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from './../../../services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formulario: FormGroup;

  constructor(private usersService: UsersService) {
    this.formulario = new FormGroup({
      username: new FormControl(),
      useremail: new FormControl(),
      userpassword: new FormControl()
    });
    
  }

  async onSubmit() {
    const response = await this.usersService.register(this.formulario.value);
    console.log(response);
  }
}
