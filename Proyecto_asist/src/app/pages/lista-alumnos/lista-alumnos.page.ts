import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.page.html',
  styleUrls: ['./lista-alumnos.page.scss'],
})
export class ListaAlumnosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  hora:any[]=[
    {id:1,nivel:"08:30 - 10:20"},
    {id:2,nivel:"08:30 - 10:20"},
    {id:3,nivel:"08:30 - 10:20"},
    {id:4,nivel:"08:30 - 10:20"},
    {id:5,nivel:"08:30 - 10:20"},
    {id:6,nivel:"08:30 - 10:20"}
  ]
}
