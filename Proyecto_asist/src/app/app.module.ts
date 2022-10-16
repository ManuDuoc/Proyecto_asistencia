import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, QRCodeModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, SQLite, Camera, NativeStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
