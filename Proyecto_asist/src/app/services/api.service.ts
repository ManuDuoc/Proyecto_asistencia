import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from'@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';

export class User {
  nombre = ''
  clave = ''
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    })
  }
  // Se establece la base url del API a consumir
  apiURL = 'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos';
  apiURL2 = 'https://my-json-server.typicode.com/victorrosendo/repoSeccionAsigSeccion';
  apiURL3 = 'https://my-json-server.typicode.com/victorrosendo/repoListadoAutos';
  // Se declara la variable http de tipo HttpClient
    constructor(private http:HttpClient) { }

getPosts():Observable<any>{
    return this.http.get(this.apiURL+'/users/').pipe(
        retry(3), catchError(this.handleError)
    );
  }

  getPost():Observable<any>{
    return this.http.get(this.apiURL+'/ramos/').pipe(
        retry(3), catchError(this.handleError)
    );
  }

  getPost2():Observable<any>{
    return this.http.get(this.apiURL2+'/seccion/').pipe(
        retry(3), catchError(this.handleError)
    );
  }

  getPost3():Observable<any>{
    return this.http.get(this.apiURL2+'/asigsecci/').pipe(
        retry(3), catchError(this.handleError)
    );
  }

  getPost4():Observable<any>{
    return this.http.get(this.apiURL3+'/listado/').pipe(
        retry(3), catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      
      console.error('An error occurred:', error.error);
    } else {
      
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    
    return throwError(
      'Something bad happened; please try again later.');
  }
}