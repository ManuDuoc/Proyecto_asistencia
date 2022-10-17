import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  ramos: any = [
    {
      id: '',
      sigla: '',
      nombre: ''
    }
  ]
  usuario: any[] = [];
  id: number;
  nombre: any;
  clave: any;
  id_rol: number;
  constructor(private menu: MenuController,public nativeStorage:NativeStorage,private alertController : AlertController,private router : Router ,private activedRouter: ActivatedRoute,private servicio:DbService) {

    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.id = this.router.getCurrentNavigation().extras.state.idEnviado;
        this.nombre = this.router.getCurrentNavigation().extras.state.nombreEnviado;
        this.clave= this.router.getCurrentNavigation().extras.state.claveEnviado;
        this.id_rol= this.router.getCurrentNavigation().extras.state.rolEnviado;
      }
    })
  }
  
  
  ngOnInit() {
    this.servicio.dbState().subscribe((res) => {
      if (res) {
        this.servicio.fetchUsuarios().subscribe(async item => {
          this.usuario = item;
        })


      }



    this.nativeStorage.getItem('logeado').then((data)=>{
      console.log("Bienvenido " + data)
      for (let i = 0; i < this.usuario.length; i++) {
      if(this.usuario[i].nombre == data){
        this.id = this.usuario[i].id
        this.nombre = this.usuario[i].nombre
        this.clave = this.usuario[i].clave
        this.id_rol = this.usuario[i].id_rol
      }
      }
    })
  });

  this.servicio.dbState().subscribe((res)=>{
    if(res){
      this.servicio.fetchRamos().subscribe((item)=>{
        this.ramos = item;
      })
    }
  })
  }

}