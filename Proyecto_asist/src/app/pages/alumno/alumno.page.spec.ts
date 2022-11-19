import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';

import { AlumnoPage } from './alumno.page';

describe('AlumnoPage', () => {
  let component: AlumnoPage;
  let fixture: ComponentFixture<AlumnoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[Camera, NativeStorage, ActivatedRoute],
      declarations: [ AlumnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

 
});
