import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-asistcarr',
  templateUrl: './asistcarr.page.html',
  styleUrls: ['./asistcarr.page.scss'],
})
export class AsistcarrPage implements OnInit {
  ramos: any = [
    {
      id: '',
      sigla: '',
      nombre: ''
    }
  ]
  seccion:any[] = [];


  asistencia: any = [
    {
      id: '',
      id_ramo: '',
      id_seccion:'',
      id_profesor:''
    }
  ]

  listado: any = [
    {
      id: '',
      id_estudiante: '',
      id_asig:''
    }
  ]

  usuario: any[] = [];
  id: number;
  nombre_p: any;
  clave: any;
  id_rol: number;

  token:any;
  sigla: any;
  sec : any;
  id_estudiante : any;
  id_asigsecci : any;
  nombre : any;
  constructor(private menu: MenuController,public nativeStorage:NativeStorage,private alertController : AlertController,private router : Router ,private activedRouter: ActivatedRoute,private servicio:DbService) {
  }
  
  
  ngOnInit() {
  this.servicio.dbState().subscribe((res)=>{
    if(res){
      this.servicio.fetchsecc().subscribe((item)=>{
        this.seccion = item;
      })
    }
    for (let i = 0; i < this.seccion.length; i++) {
      if(this.seccion[i].id_estudiante == 2  ){
        this.sigla = this.seccion[i].sigla
        this.sec = this.seccion[i].seccion
        this.nombre = this.seccion[i].nombre
        this.id_estudiante = this.seccion[i].id_estudiante
        this.id_asigsecci = this.seccion[i].id_asigsecci
        console.log(this.sigla,this.sec,this.nombre,this.id_estudiante,this.id_asigsecci)
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

}
