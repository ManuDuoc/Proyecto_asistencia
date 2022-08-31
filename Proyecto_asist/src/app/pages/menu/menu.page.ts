import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

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
