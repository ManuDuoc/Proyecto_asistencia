import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { IonicModule } from '@ionic/angular';

import { AsistcarrPage } from './asistcarr.page';

describe('AsistcarrPage', () => {
  let component: AsistcarrPage;
  let fixture: ComponentFixture<AsistcarrPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[NativeStorage, ActivatedRoute],
      declarations: [ AsistcarrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistcarrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
});
