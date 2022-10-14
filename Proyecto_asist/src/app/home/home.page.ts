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

  Profesor ="man.collao@duocuc.cl";
  contrasena= "asdasd123123";
  
  constructor(private menu: MenuController,public router: Router, public toastController: ToastController, public menuController : MenuController,private api:ApiService,private servicio :DbService) {
    this.menu.enable(false);
  }
  ingresar(){
    if(this.email == this.Estudiante && this.Password == this.contra){
      let navigationExtras: NavigationExtras = {
        state: { textoEnviado: this.email}
      }
      this.router.navigate(['/menu-alumno'], navigationExtras);}

    else if(this.email == this.Profesor && this.Password == this.contrasena){
      let NavigationExtras: NavigationExtras ={
        state:{ textoEnviado: this.email}
      }
      this.router.navigate(['/menu'])
    }

    else{
      this.presentToast("Correo o Contraseña Incorrecta");
    }
  }
  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration:2000
      }
    );
    toast.present();
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
