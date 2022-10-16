import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: any;
  password: any;

  email: string;
  Password: string;

  Estudiante= "anib.perezm@duocuc.cl";
  contra = "asdasd123123";

  rol = 1;
  rol_2 = 2;
  
  Profesor ="v.rosendo";
  contrasena= "J.12mm8";
  
  login: any = {
    nombre:'',
    clave:''
  };

  constructor(private menu: MenuController,public router: Router, public toastController: ToastController, public menuController : MenuController,private api:ApiService,private servicio :DbService) {
    this.menu.enable(false);
  }
  User(){
    let navigationExtras: NavigationExtras = {
      state:{log0: this.login.nombre, log1:this.login.clave}
    }
    this.router.navigate(['/menu'], navigationExtras)
  }

  User2(){
    let navigationExtras: NavigationExtras = {
      state:{log0: this.login.nombre, log1:this.login.clave}
    }
    this.router.navigate(['/menu-alumno'], navigationExtras)
  }

  async ingresar(){
    const response = await this.servicio.inicoSesion(this.login.nombre, this.login.clave)
    response ? this.User(): this.servicio.presentAlert("Credenciales incorrectar Compruebe su nombre y/o contraseña")
    const response2 = await this.servicio.inicoSesion2(this.login.nombre, this.login.clave)
    response2 ? this.User2(): this.login.nombre
    
  }

  ngOnInit(){
    this.api.getPosts().subscribe((user2)=> {

      this.user= user2;
      for(var i = 0; i < user2.length; i++){
        
          this.servicio.registrarUsuario(this.user[i].id,this.user[i].nombre,this.user[i].clave,this.user[i].id_rol);
          this.servicio.presentAlert("Usuario Registrado");
      }

    },(error)=>{
      console.log(error);
    })
  }
}
