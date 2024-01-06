import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit, OnDestroy{
  listUsers: User[] = [];

  userLoginOn: boolean = false;
 

 
  private userLoginOnSubscription?: Subscription;

  constructor(private _userService: UsersService, private toastr: ToastrService, private loginService: LoginService) {}

   


    ngOnDestroy(): void {
      if (this.userLoginOnSubscription) {
        this.userLoginOnSubscription.unsubscribe();
      }
    }
  
    ngOnInit(): void {
      this.obtenerUser();
      console.log('ngOnInit - listUsers:', this.listUsers);
      this.userLoginOnSubscription = this.loginService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      });
  
    }

    obtenerUser() {
      this._userService.getUsers().subscribe((data: User[]) => {
        console.log(data);
        this.listUsers = data;
      }, error => {
        console.log(error);
      })
    }
    
    eliminarUser(id:any) {
      this._userService.eliminarUser(id).subscribe(data => {
        this.toastr.error('El usuario fue eliminado con exito', 'Usuario eliminado');
        this.obtenerUser();
      }, error  => {
        this.toastr.error('No tienes permiso suficiente para eliminar un usuario', 'Error eliminar Usuario');
        console.log(error);
      })
    }

}
