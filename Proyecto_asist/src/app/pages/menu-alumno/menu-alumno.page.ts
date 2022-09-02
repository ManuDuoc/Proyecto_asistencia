import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-alumno',
  templateUrl: './menu-alumno.page.html',
  styleUrls: ['./menu-alumno.page.scss'],
})
export class MenuAlumnoPage implements OnInit {

  constructor(private menu: MenuController) {
    this.menu.enable(true);
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