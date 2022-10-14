import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {
  claveUsuario= "";
  nombreUsuario="";
  rolUsuario="";
  idUsuario="";
  constructor(private router: Router, private servicio: DbService) { }

  ngOnInit() {
  }

  agregar(){
    this.servicio.registrarUsuario(this.idUsuario,this.claveUsuario,this.nombreUsuario,this.rolUsuario);
    this.servicio.presentAlert("Usuario Registrado");
    this.router.navigate(['/home']);
  }

}
