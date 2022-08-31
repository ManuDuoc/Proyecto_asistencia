import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Usuario: string;
  Password: number;

  Estudiante= "Aaron";
  contra = 1234;

  Profesor ="Manuel";
  contrasena=4321;

  constructor(private menu: MenuController,public router: Router, public toastController: ToastController, public menuController : MenuController) {
    this.menu.enable(false);
  }
  ingresar(){
    if(this.Usuario == this.Estudiante && this.Password == this.contra){
      let navigationExtras: NavigationExtras = {
        state: { textoEnviado: this.Usuario}
      }
      this.router.navigate(['/alumno'], navigationExtras);}

    else if(this.Usuario == this.Profesor && this.Password == this.contrasena){
      let NavigationExtras: NavigationExtras ={
        state:{ textoEnviado: this.Usuario}
      }
      this.router.navigate(['/menu'])
    }

    else{
      this.presentToast("Usuario y/o Contraseña Incorrectos");
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
