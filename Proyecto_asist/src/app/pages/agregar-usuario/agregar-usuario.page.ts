import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {
  correoUsuario: "";
  claveUsuario= "";

  constructor(private router: Router, private servicio: DbService) { }

  ngOnInit() {
  }

  agregar(){
    this.servicio.registrarUsuario(this.correoUsuario,this.claveUsuario);
    this.servicio.presentAlert("Usuario Registrado");
    this.router.navigate(['/home']);
  }

}
