import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  usuario: any[] = [];
  clases: any[] = [];
  id: number;
  nombre: any;
  clave: any;
  id_rol: number;

  token: any;
  id_clase: number;
  fecha: any;
  id_ramo: number;
  id_seccion: number
  constructor(private menu: MenuController,private servicio:DbService,private router : Router) {
    this.menu.enable(true);
  }

  ti(){
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: this.id,
        nombreEnviado: this.nombre,
        rolEnviado: this.id_rol
      }
    }
    this.servicio.buscarPerfil(this.id);
    this.router.navigate(['/perfil-profesor'], navigationExtras);
  }

  ngOnInit() {
    this.servicio.buscarsec();
    this.servicio.dbState().subscribe((res) => {
      if (res) {
        this.servicio.fetchUsuarios().subscribe(async item => {
          this.usuario = item;
        })

      }

      

      this.token=localStorage.getItem('logeado')
      console.log("Bienvenido " + this.token)
      for (let i = 0; i < this.usuario.length; i++) {
      if(this.usuario[i].nombre == this.token){
        this.id = this.usuario[i].id
        this.nombre = this.usuario[i].nombre
        this.clave = this.usuario[i].clave
        this.id_rol = this.usuario[i].id_rol
        this.servicio.registrarIdPerfil(this.usuario[i].id,this.usuario[i].id);
        this.servicio.buscarPerfil(this.usuario[i].id);

      }
      }
  })
  }

  option = {
    slidesPerView: 1.5,
    centeredSlides:true,
    loop: true,
    spaceBetween: 50,
    autoplay:true,
  }
}
