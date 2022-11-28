import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.page.html',
  styleUrls: ['./lista-alumnos.page.scss'],
})
export class ListaAlumnosPage implements OnInit {
  seccion:any[] = [];
  usuario: any[] = [];
  id: number;
  nombre_p: any;
  clave: any;
  id_rol: number;
  nombreD: any;
  nombres: any;
  separar: any[] = [];
  seccion1: any;
  seccion2: any;
  seccion3: any;
  seccion4: any;
  seccion5: any;
  seccion6: any;
  seccion7: any;

  token:any;
  sigla: any;
  sec : any;
  id_estudiante : any;
  id_asigsecci : any;
  clases : any;
  nombre : any;
  constructor(private menu: MenuController,public nativeStorage:NativeStorage,private alertController : AlertController,private router : Router ,private activedRouter: ActivatedRoute,private servicio:DbService) { 
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.nombres = this.router.getCurrentNavigation().extras.state.seccionEnviada;
        this.separar = this.nombres.split(" ");
        this.seccion1 = this.separar[0];
        this.seccion2 = this.separar[1];
        this.seccion3 = this.separar[2];
        this.seccion4 = this.separar[3];
        this.seccion5 = this.separar[4];
        this.seccion6 = this.separar[5];
        this.seccion7 = this.separar[6];
        console.log(this.nombres,this.seccion1,this.seccion2,this.seccion3 )
      }
    })
  }

  ngOnInit() {
    this.servicio.dbState().subscribe((res)=>{
      if(res){
        this.servicio.buscarsec()
        this.servicio.fetchsecc().subscribe((item)=>{
          this.seccion = item;
        })
      }
      for (let i = 0; i < this.seccion.length; i++) {
        if(this.seccion[i].id_estudiante == 2){
          this.sigla = this.seccion[i].sigla
          this.sec = this.seccion[i].seccion
          this.nombre = this.seccion[i].nombre
          this.id_estudiante = this.seccion[i].id_estudiante
          this.id_asigsecci = this.seccion[i].id_asigsecci
          this.clases = this.seccion[i].clases
          console.log(this.sigla,this.sec,this.nombre,this.id_estudiante,this.id_asigsecci,this.clases)
        }
        }
    })
  
    this.servicio.dbState().subscribe((res) => {
      if (res) {
        this.servicio.fetchUsuarios().subscribe(async item => {
          this.usuario = item;
        })
  
      }
      this.token=localStorage.getItem('logeado')
      console.log("Bienvenido " + this.token)
      for (let i = 0; i < this.usuario.length; i++) {
      if(this.usuario[i].nombre == this.token){
        this.id = this.usuario[i].id
        this.nombre_p = this.usuario[i].nombre
        this.clave = this.usuario[i].clave
        this.id_rol = this.usuario[i].id_rol
      }
      }
  })
  }
  async ingresar(){
  console.log(this.nombreD)
  }
}
