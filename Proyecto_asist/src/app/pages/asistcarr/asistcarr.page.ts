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
  constructor(private menu: MenuController,public nativeStorage:NativeStorage,private alertController : AlertController,private router : Router ,private activedRouter: ActivatedRoute,private servicio:DbService) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.id = this.router.getCurrentNavigation().extras.state.idEnviado;
        this.nombre_p = this.router.getCurrentNavigation().extras.state.nombreEnviado;
        this.id_rol = this.router.getCurrentNavigation().extras.state.rolEnviado;
        console.log(this.id)
      }
    })
  }
  
  
  ngOnInit() {
  this.servicio.dbState().subscribe((res)=>{
    if(res){
      this.servicio.fetchsecc().subscribe((item)=>{
        this.seccion = item;
      })
    }
  })
  }

}
