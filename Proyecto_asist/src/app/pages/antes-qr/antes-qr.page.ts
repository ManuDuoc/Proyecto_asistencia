import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-antes-qr',
  templateUrl: './antes-qr.page.html',
  styleUrls: ['./antes-qr.page.scss'],
})
export class AntesQrPage implements OnInit {

  constructor() { }
  isDisplay = true;
  toggleDisplay(){
    this.isDisplay= !this.isDisplay;
  }
  ngOnInit() {
  }
  hora:any[]=[
    {id:1,hora:"08:30 - 10:20"},
    {id:2,nivel:"08:30 - 10:20"},
    {id:3,nivel:"08:30 - 10:20"},
    {id:4,nivel:"08:30 - 10:20"},
    {id:5,nivel:"08:30 - 10:20"},
    {id:6,nivel:"08:30 - 10:20"}
  ]
  

}
