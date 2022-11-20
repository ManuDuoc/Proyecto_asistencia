import { Component, OnInit } from '@angular/core';
import { CamaraService } from 'src/app/services/camara.service';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common'
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfile: any = {
    nombre:'',
    apellido:'',
    email:'',
    numero:''
  };
  usuario: any[] = [];
  id: number;
  id_p: number;
  nombre_p: any;
  nombre: any;
  clave: any;
  id_rol: number;

  token: any;
  perfil: any[] = [];
  id_perfil: number; 
  id_usuario: number;
  nombrea: any;
  apellido: any; 
  edad: number;
  imagen : any;
  numero : number;
  correo : any;
  ciudad: any;
  provincia: any;

  imageData: any;
  constructor(private c: CamaraService,private menu: MenuController,public nativeStorage:NativeStorage,private alertController: AlertController,private router : Router ,private activedRouter: ActivatedRoute,private servicio:DbService,private location: Location) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.id_p = this.router.getCurrentNavigation().extras.state.id_Perfil_Enviado;
        this.id_rol = this.router.getCurrentNavigation().extras.state.id_rolEnviado;
      }
    })
  }


  async ingresar(){
    await this.servicio.registrarPerfil(this.perfile.nombre,this.perfile.apellido,this.perfile.numero, this.perfile.email,this.id_p)
    this.servicio.buscarPerfiles()
    let navigationExtras: NavigationExtras = {
      state: {
        nombrePEnviado: this.id,
        apellidoEnviado: this.nombre,
        numeroEnviado: this.id_rol,
        emailEnviado: this.id_rol
      }
    }
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
        this.nombrea = this.perfil[i].nombre
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
    if (this.id_rol == 1) {
      this.router.navigate(['/menu'],navigationExtras);
    }
    if (this.id_rol == 2) {
      this.router.navigate(['/menu-alumno'],navigationExtras);
    }
  }
  tomarF(){
    this.c.takePicture();
  }

  ngOnInit(){
    this.c.regresarfoto().subscribe((res)=>{
      this.imageData = res;
    })
  }
}