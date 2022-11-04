import { TestBed } from '@angular/core/testing';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

import { CamaraService } from './camara.service';

describe('CamaraService', () => {
  let service: CamaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[Camera]
    });
    service = TestBed.inject(CamaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
