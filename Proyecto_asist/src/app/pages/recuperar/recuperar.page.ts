import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {

  correo: string;

  Estudiante= "anib.perezm@duocuc.cl";

  Profesor ="man.collao@duocuc.cl";

  constructor(private menu: MenuController,public router: Router, public toastController: ToastController, public menuController : MenuController) {
    this.menu.enable(false);
  }
  enviar(){
    if(this.correo == 'anib.perezm@duocuc.cl'){
      let navigationExtras: NavigationExtras = {
        state: { textoEnviado: this.correo}
      }
      this.router.navigate(['/home'], navigationExtras);}

    
      this.presentToast("El correo se envio con exito.");
    
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
