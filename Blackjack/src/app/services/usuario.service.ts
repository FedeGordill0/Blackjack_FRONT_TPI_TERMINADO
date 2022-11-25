import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UsuarioLogin } from '../Interfaces/usuario-login';

@Injectable()
export class UsuarioService {
  //http://localhost:5170/api/
  api_url = environment.api_url;

  constructor(private http: HttpClient) {}

  getUsuarioID(id: number): Observable<any> {
    const url = `${this.api_url}usuario/getUsuarioID/${id}`;
    const headers = { 'content-type': 'application/json' };

    return this.http.get(url, { headers: headers });
  }

  loginUsuario(usuario: string, clave: string): Observable<any> {
    const user = {
      usuario: usuario,
      clave: clave,
    };

    const url = `${this.api_url}usuario/login`;
    const body = JSON.stringify(user);
    const headers = { 'content-type': 'application/json' };

    return this.http.post(url, body, { headers: headers });
  }

  registrarUsuario(usuario: string, clave: string): Observable<UsuarioLogin> {
    const user = {
      usuario: usuario,
      clave: clave,
    };
    const url = `${this.api_url}usuario/registrar`;
    const body = JSON.stringify(user);
    const headers = { 'content-type': 'application/json' };

    return this.http.post<UsuarioLogin>(url, body, { headers: headers });
  }

  getUsuarios(): Observable<any> {
    const url = `${this.api_url}usuario/getUsuarios`;
    const headers = { 'content-type': 'application/json' };

    return this.http.get(url, { headers: headers });
  }
}
