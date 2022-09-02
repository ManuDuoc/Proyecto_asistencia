import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistcarrPageRoutingModule } from './asistcarr-routing.module';

import { AsistcarrPage } from './asistcarr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistcarrPageRoutingModule
  ],
  declarations: [AsistcarrPage]
})
export class AsistcarrPageModule {}
