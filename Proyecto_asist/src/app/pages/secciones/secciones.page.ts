import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.page.html',
  styleUrls: ['./secciones.page.scss'],
})
export class SeccionesPage implements OnInit {
  seccion:any[] = [];
  usuario: any[] = [];
  id: number;
  nombre_p: any;
  clave: any;
  id_rol: number;

  nombres: any;

  token:any;
  sigla: any;
  sec : any;
  id_estudiante : any;
  id_asigsecci : any;
  clases : any;
  nombre : any;
  constructor(private menu: MenuController,public nativeStorage:NativeStorage,private alertController : AlertController,private router : Router ,private activedRouter: ActivatedRoute,private servicio:DbService) { }
  et(){
    let navigationExtras: NavigationExtras = {
      state: {
        seccionEnviada: this.nombres
      }
    }
    console.log(this.nombres)
    this.router.navigate(['/lista-alumnos'], navigationExtras);
  }
  ngOnInit() {
    this.servicio.dbState().subscribe((res)=>{
      if(res){
        this.servicio.listasramo()
        this.servicio.fetchRamoss().subscribe((item)=>{
        this.seccion = item;
        })
      }
    })
  }

}
