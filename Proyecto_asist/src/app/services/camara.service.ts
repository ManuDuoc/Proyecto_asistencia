import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
  foto= new BehaviorSubject([]);
  constructor(private camera: Camera) { }
  base64Image:any;
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    this.foto.next(this.base64Image);
    }, (err) => {
     // Handle error
    });
  }

  regresarfoto(): Observable<any>{
    return this.foto.asObservable();
  }

}
