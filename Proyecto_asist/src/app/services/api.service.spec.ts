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

  describe('nombre de ramos', () => {
    it('obtener nombre de ramos', () => {
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

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
  
  describe('nombre de usuario', () => {
    it('obtener nombre de usuario', () => {
      service.getPosts().subscribe((x) => {
        expect(x).toEqual({ datos: { id: 1,
          nombre: "v.rosendo5",
          clave: "J.12mm5",
          id_rol: 1 }, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos/users/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: { id: 1,
        nombre: "v.rosendo5",
        clave: "J.12mm5",
        id_rol: 1},
        
      });
      httpTestingController.verify();
    });
  });

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
  
  describe('sigla de seccion', () => {
    it('obtener sigla de seccion', () => {
      service.getPost2().subscribe((x) => {
        expect(x).toEqual({ datos: { id: 1,
          sigla: "001D"}, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoSeccionAsigSeccion/seccion/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: { id: 1,
        sigla: "001D"},
        
      });
      httpTestingController.verify();
    });
  });

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
  
  describe('nombre de asignatura y seccion', () => {
    it('obtener nombre de asignatura y seccion', () => {
      service.getPost3().subscribe((x) => {
        expect(x).toEqual({ datos: { 
          id: 1,
          id_ramo: 2,
          id_seccion: 1,
          id_profesor: 1}, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoSeccionAsigSeccion/asigsecci/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: { 
          id: 1,
          id_ramo: 2,
          id_seccion: 1,
          id_profesor: 1},
        
      });
      httpTestingController.verify();
    });
  });

  it('exists', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
  
  describe('listado de estudiantes', () => {
    it('obtener listado de estudiantes', () => {
      service.getPost4().subscribe((x) => {
        expect(x).toEqual({ datos: { 
          id: 1,
          id_estudiante: 2,
          id_asigsecci: 1}, });
      });
      const req = httpTestingController.expectOne('https://my-json-server.typicode.com/victorrosendo/repoListadoAutos/listado/');
      expect(req.request.method).toEqual('GET');
      req.flush({
        datos: { 
          id: 1,
          id_estudiante: 2,
          id_asigsecci: 1},
        
      });
      httpTestingController.verify();
    });
  });

});



