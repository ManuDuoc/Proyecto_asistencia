import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-menu-alumno',
  templateUrl: './menu-alumno.page.html',
  styleUrls: ['./menu-alumno.page.scss'],
})
export class MenuAlumnoPage implements OnInit {

  qrCodeString = 'HAZ QUEDADO PRESENTE';
  scannedResult: any;
  content_visibility = 'hidden';

  usuario: any[] = [];
  clases: any[] = [];
  id: number;
  nombre: any;
  clave: any;
  id_rol: number;

  separar: any[] = [];
  dia: any;
  horas: any;

  token: any;
  id_clase: number;
  fecha: any;
  id_ramo: number;
  id_seccion: number

  constructor(private menu: MenuController,private servicio:DbService,public nativeStorage:NativeStorage,private router : Router) {
    this.menu.enable(true);
    this.content_visibility = '';
  }

  async  checkPermission() {
    try{
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return true;
    } catch(e) {
      console.log(e);
    }
  }
  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if(result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  ti(){
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: this.id,
        nombreEnviado: this.nombre,
        rolEnviado: this.id_rol
      }
    }
    this.servicio.buscarPerfil(this.id);
    this.router.navigate(['/alumno'], navigationExtras);
  }

  et(){
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: this.id,
        nombreEnviado: this.nombre,
        rolEnviado: this.id_rol
      }
    }
    this.router.navigate(['/asistcarr'], navigationExtras);
  }

  ngOnInit() {
    this.servicio.buscarsec();
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
        this.nombre = this.usuario[i].nombre
        this.clave = this.usuario[i].clave
        this.id_rol = this.usuario[i].id_rol
        this.servicio.registrarIdPerfil(this.usuario[i].id,this.usuario[i].id);
        this.servicio.buscarPerfil(this.usuario[i].id);

      }
      }
  })
  
  }
  
  asistir() {
    if (this.scannedResult == "") {
      this.servicio.presentAlert('No as escaneado el Codigo Qr')
    } else {
      this.servicio.dbState().subscribe((res) => {
        if (res) {
          this.servicio.fetchClases().subscribe(async item => {
            this.clases = item;
          })
    
        }
        for (let i = 0; i < this.clases.length; i++) {
        if(this.clases[i].fecha == this.scannedResult){
          this.id_clase = this.clases[i].id_clase
          this.id_seccion = this.clases[i].id_seccion
          this.id_ramo = this.clases[i].id_ramo
          this.fecha = this.clases[i].fecha

        }
        }
    })
      this.separar = this.fecha.split(",");
      this.dia = this.separar[0];
      this.horas = this.separar[1];
      this.servicio.registroAsistido(this.scannedResult,this.horas,this.dia,this.id,this.id_seccion,this.id_ramo);
      console.log(this.scannedResult,this.id_seccion,this.id_ramo,this.fecha,this.horas,this.dia)
    }
  }

  option = {
    slidesPerView: 1.5,
    centeredSlides:true,
    loop: true,
    spaceBetween: 50,
    autoplay:true,
  }
}