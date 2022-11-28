import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  seccion:any[] = [];
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
  clases : any;
  nombre : any;
  constructor(private menu: MenuController,public nativeStorage:NativeStorage,private alertController : AlertController,private router : Router ,private activedRouter: ActivatedRoute,private servicio:DbService) { }

  ngOnInit() {
    this.servicio.dbState().subscribe((res)=>{
      if(res){
        this.servicio.buscarsec()
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

}
