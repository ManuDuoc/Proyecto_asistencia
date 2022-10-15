import { Component, OnInit } from '@angular/core';
import { CamaraService } from 'src/app/services/camara.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.page.html',
  styleUrls: ['./perfil-profesor.page.scss'],
})
export class PerfilProfesorPage implements OnInit {
  imageData: any;
  constructor(private c: CamaraService) {}

  tomarF(){
    this.c.takePicture();
  }

  ngOnInit(){
    this.c.regresarfoto().subscribe((res)=>{
      this.imageData = res;
    })

  }
}
