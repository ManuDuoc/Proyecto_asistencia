import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQRPage implements OnInit, OnDestroy {

  scannedResult: any;
  content_visibility = 'hidden';
  myDate: String = new Date().toLocaleString();
  ramo :  any[] = [];
  seccion :  any[] = [];
  nombre: any;
  secc: any;

  qrCodeString = this.myDate;
  isDisplay = true;
  toggleDisplay(){
    this.isDisplay= !this.isDisplay;
    console.log(this.nombre);
    console.log(this.secc);
    this.servicio.registroClases(this.secc,this.nombre,1,this.myDate);
  }

  constructor(private servicio:DbService) {
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

  ngOnInit() {
    this.servicio.dbState().subscribe((res)=>{
      if(res){
        this.servicio.fetchRamos().subscribe((item)=>{
          this.ramo = item;
        })
      }
    })

    this.servicio.dbState().subscribe((res)=>{
      if(res){
        this.servicio.fetchSecciones().subscribe((item)=>{
          this.seccion = item;
        })
      }
    })
  }

}
