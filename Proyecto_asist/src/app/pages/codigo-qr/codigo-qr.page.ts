import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQRPage implements OnInit, OnDestroy {

  scannedResult: any;
  content_visibility = 'hidden';
  myDate: String = new Date().toLocaleString();
  qrCodeString = 'Has quedado presente el dia:' + this.myDate;
  isDisplay = true;
  toggleDisplay(){
    this.isDisplay= !this.isDisplay;
  }

  constructor() {
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
  }
  Dia:any[]=[
    {dia:1,Dia:"Lunes  08:31 a 09:50"},
    {dia:2,Dia:"Lunes  10:01 a 12:50"},
    {dia:3,Dia:"Martes 10:41 a 12:50"},
    {dia:4,Dia:"Martes 11:31 a 12:50"},
    {dia:5,Dia:"Martes 11:51 a 13:00"},
    {dia:6,Dia:"Miercoles 11:51 a 13:00"},
    {dia:7,Dia:"Miercoles 10:41 a 12:50"},
    {dia:8,Dia:"Viernes 11:31 a 12:50"},
    {dia:9,Dia:"Viernes 11:51 a 13:00"},
    {dia:10,Dia:"Viernes 13:01 a 13:40"},
  ]
  Seccion:any[]=[
    {seccion:1,Seccion:"PGY4121-002D"},
    {seccion:2,Seccion:"PGY4121-003D"},
    {seccion:3,Seccion:"PGY4121-006D"},
    {seccion:4,Seccion:"PGY4121-009D"},
    {seccion:5,Seccion:"PGY4121-012D"},
    {seccion:6,Seccion:"PGY4121-002D"},
    {seccion:7,Seccion:"PGY4121-003D"},
    {seccion:8,Seccion:"PGY4121-006D"},
    {seccion:9,Seccion:"PGY4121-009D"},
    {seccion:10,Seccion:"PGY4121-012D"},
  ]

}
