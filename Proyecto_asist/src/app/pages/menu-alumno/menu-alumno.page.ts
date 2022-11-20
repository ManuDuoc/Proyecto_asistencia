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
  id: number;
  nombre: any;
  clave: any;
  id_rol: number;

  token: any;

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
      this.servicio.registroAsistido(this.scannedResult, this.nombre);
      this.servicio.presentAlert('Asistencia Registrada')
      console.log(this.scannedResult, this.nombre)
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