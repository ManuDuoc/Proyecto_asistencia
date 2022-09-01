import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AntesQrPageRoutingModule } from './antes-qr-routing.module';

import { AntesQrPage } from './antes-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AntesQrPageRoutingModule
  ],
  declarations: [AntesQrPage]
})
export class AntesQrPageModule {}
