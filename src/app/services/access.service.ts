import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appseting } from '../setting/appseting';
import { Usuario } from '../interfaces/Usuario';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseAccess } from '../interfaces/ResponseAccess';
import { Login } from '../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private http=inject(HttpClient)
  private baseUrl:string = appseting.apiURL;


  constructor() { }

  registrarse(object:Usuario): Observable<ResponseAccess>{
    return this.http.post<ResponseAccess>(`${this.baseUrl}usuarios/`, object)
  }

  login(object:Login): Observable<ResponseAccess>{
    return this.http.post<ResponseAccess>(`${this.baseUrl}login`, object)
  }

  validateToken(): Observable<boolean>{
    const token = localStorage.getItem('token')
    if(token){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<boolean>(`${this.baseUrl}validate-token?token=${token}`).pipe( map(response => response), catchError(() => of(false))
    );
    } else{
      return of(false);
    }
  }

  isAuthenticated(): boolean { 
    const token = localStorage.getItem('token'); 
    return token != null; 
  }
}
