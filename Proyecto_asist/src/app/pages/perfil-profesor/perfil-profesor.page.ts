import { Component, OnInit } from '@angular/core';
import { CamaraService } from 'src/app/services/camara.service';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.page.html',
  styleUrls: ['./perfil-profesor.page.scss'],
})
export class PerfilProfesorPage implements OnInit {
  imageData: any;
  constructor(private c: CamaraService, public alertController: AlertController, private api:ApiService,private servicio :DbService){}
  

  tomarF(){
    this.c.takePicture();
  }

  ngOnInit(){
    this.c.regresarfoto().subscribe((res)=>{
      this.imageData = res;
    })

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Editar ',
      inputs: [
        {
          placeholder: 'Nombre',
        },
        {
          type: 'email',
          placeholder: 'Email',
          attributes: {
            maxlength: 25,
          },
        },
        {
          type: 'number',
          placeholder: 'Edad',
          min: 1,
          max: 100,
        },
        {
          type: 'number',
          placeholder: 'Telefono',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cambios eliminados')
          }
        },
        {  
          text: 'Guardar',
          handler: () => {
            console.log('Cambios Guardados')
          }
        }]
    });

    await alert.present();
  }
}