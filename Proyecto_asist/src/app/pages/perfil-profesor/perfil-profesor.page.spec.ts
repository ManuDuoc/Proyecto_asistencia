import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { PerfilProfesorPage } from './perfil-profesor.page';

describe('PerfilProfesorPage', () => {
  let component: PerfilProfesorPage;
  let fixture: ComponentFixture<PerfilProfesorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[Camera, HttpClient, HttpHandler, SQLite, NativeStorage],
      declarations: [ PerfilProfesorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
});
