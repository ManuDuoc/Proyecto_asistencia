import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { CamaraService } from 'src/app/services/camara.service';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  usuario: any[] = [];
  id_rol:number;

  nombre_p: any;
  id_p: number;
  token: any;
  perfil: any[] = [];
  id_perfil: number; 
  id_usuario: number;
  nombre: any;
  apellido: any; 
  edad: number;
  imagen : any;
  numero : number;
  correo : any;
  ciudad: any;
  provincia: any;

  imageData: any;
  constructor(private c: CamaraService,private menu: MenuController,public nativeStorage:NativeStorage,private alertController: AlertController,private router : Router ,private activedRouter: ActivatedRoute,private servicio:DbService) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.id_p = this.router.getCurrentNavigation().extras.state.idEnviado;
        this.nombre_p = this.router.getCurrentNavigation().extras.state.nombreEnviado;
        this.id_rol = this.router.getCurrentNavigation().extras.state.rolEnviado;
        console.log(this.id_p)
      }
    })
  }
  ti(){
    let navigationExtras: NavigationExtras = {
      state: {
        id_Perfil_Enviado: this.id_p,
        id_rolEnviado: this.id_rol
        
      }
    }

    this.router.navigate(['/perfil'], navigationExtras);
  }
    
  tomarF(){
    this.c.takePicture();
  }

  ngOnInit(){
    this.c.regresarfoto().subscribe((res)=>{
      if (res) {
      this.imageData = res;
      this.servicio.registrarFotoPerfil(this.imageData,this.id_p);
      this.servicio.buscarPerfiles();
      }
    })
    this.servicio.dbState().subscribe((res) => {
      if (res) {
        this.servicio.fetchPerfiles().subscribe(async item => {
          this.perfil = item;
        })
      }
      this.token=localStorage.getItem('perfil')
      console.log("Bienvenido " + this.token)
      for (let i = 0; i < this.perfil.length; i++) {
      if(this.perfil[i].id_perfil == this.token ){
        this.id_usuario = this.perfil[i].id_usuario
        this.nombre = this.perfil[i].nombre
        this.apellido = this.perfil[i].apellido
        this.edad = this.perfil[i].edad
        this.imagen = this.perfil[i].imagen
        this.numero = this.perfil[i].numero
        this.correo = this.perfil[i].correo
        this.ciudad = this.perfil[i].ciudad
        this.provincia = this.perfil[i].provincia
      }
      }
    })
  
  }
}

