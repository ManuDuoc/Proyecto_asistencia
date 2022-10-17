import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-alumno',
  templateUrl: './menu-alumno.page.html',
  styleUrls: ['./menu-alumno.page.scss'],
})
export class MenuAlumnoPage implements OnInit {

  qrCodeString = 'HAZ QUEDADO PRESENTE';
  scannedResult: any;
  content_visibility = 'hidden';

  constructor(private menu: MenuController) {
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

  ngOnInit() {
  }

  option = {
    slidesPerView: 1.5,
    centeredSlides:true,
    loop: true,
    spaceBetween: 50,
    autoplay:true,
  }
}