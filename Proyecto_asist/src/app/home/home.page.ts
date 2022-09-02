import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  Password: string;

  Estudiante= "anib.perezm@duocuc.cl";
  contra = "asdasd123123";

  Profesor ="man.collao@duocuc.cl";
  contrasena= "asdasd123123";
  
  constructor(private menu: MenuController,public router: Router, public toastController: ToastController, public menuController : MenuController) {
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
}
