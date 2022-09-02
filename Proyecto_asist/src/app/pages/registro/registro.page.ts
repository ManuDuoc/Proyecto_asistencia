import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  email: string;
  Password: string;
  Password2: string;

  Estudiante= "anib.perezm@duocuc.cl";
  contra = "asdasd123123";

  Profesor ="man.collao@duocuc.cl";
  contrasena= "asdasd123123";
  
  constructor(private menu: MenuController,public router: Router, public toastController: ToastController, public menuController : MenuController) {
    this.menu.enable(false);
  }
  registrar(){
    if(this.Password == this.Password2 && this.Password !=null){
      let navigationExtras: NavigationExtras = {
        state: { textoEnviado: this.email}
      }
      this.router.navigate(['/home'], navigationExtras);}

    else{
      this.presentToast("Las contraseñas deben ser iguales");
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
