import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { MenuAlumnoPage } from './menu-alumno.page';

describe('MenuAlumnoPage', () => {
  let component: MenuAlumnoPage;
  let fixture: ComponentFixture<MenuAlumnoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[SQLite, NativeStorage],
      declarations: [ MenuAlumnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
