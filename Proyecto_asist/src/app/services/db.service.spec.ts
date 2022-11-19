import { TestBed } from '@angular/core/testing';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { DbService } from './db.service';

describe('DbService', () => {
  let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[SQLite, NativeStorage],
    });
    service = TestBed.inject(DbService);
  });

 
});
