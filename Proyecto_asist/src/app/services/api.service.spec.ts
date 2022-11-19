import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = new ApiService(httpClient);
  });

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('nombre de usuario', () => {
    it('obtener nombre de usuario', () => {
      service.getPost().subscribe((x) => {
        expect(x).toEqual({ datos: { id: 1,
          sigla: "PGY4237",
          nombre: "Programación de Base de Datos" }, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos/ramos/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: { id: 1,
        sigla: "PGY4237",
        nombre: "Programación de Base de Datos" },
        
      });
      httpTestingController.verify();
    });
  });
});



