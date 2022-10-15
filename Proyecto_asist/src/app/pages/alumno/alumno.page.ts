import { Component, OnInit } from '@angular/core';
import { CamaraService } from 'src/app/services/camara.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
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

