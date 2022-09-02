import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-asistcarr',
  templateUrl: './asistcarr.page.html',
  styleUrls: ['./asistcarr.page.scss'],
})
export class AsistcarrPage implements OnInit {

  constructor(private menu:MenuController) {this.menu.enable(false)}

  ngOnInit() {
  }

}
