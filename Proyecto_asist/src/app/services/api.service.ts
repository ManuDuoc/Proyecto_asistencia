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
  // Se declara la variable http de tipo HttpClient
    constructor(private http:HttpClient) { }

getPosts():Observable<any>{
    return this.http.get(this.apiURL+'/users/').pipe(
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