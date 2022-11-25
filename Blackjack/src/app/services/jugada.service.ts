import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Jugada } from '../Interfaces/jugada';

@Injectable()
export class JugadaService {
  //http://localhost:5170/api/
  api_url = environment.api_url;

  constructor(private http: HttpClient) {}

  nuevaPartida(id_usuario: number, id_jugada: number): Observable<any> {
    const url = `${this.api_url}partida/nuevaPartida/${id_usuario}+${id_jugada}`;

    const headers = { 'content-type': 'application/json' };

    return this.http.post(url, null, { headers: headers });
  }

  actualizarPartida(
    id_partida: number,
    id_jugada: number,
    id_usuario: number,
    puntosCroupier: number,
    puntosJugador: number,
    estado: number,
    resultado: string
  ): Observable<any> {
    const actPartida = {
      idJugada: id_jugada,
      puntosCroupier: puntosCroupier,
      puntosJugador: puntosJugador,
      estado: estado,
      resultado: resultado,
    };
    const url = `${this.api_url}partida/plantarse/${id_usuario}+${id_partida}+${id_jugada}`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(actPartida);

    return this.http.put(url, body, { headers: headers });
  }

  getPartida(id_jugada: number, id_usuario: number): Observable<any> {
    return this.http.get<any>(
      `${this.api_url}jugada/continuarJugada/${id_jugada}+${id_usuario}`
    );
  }

  getUltPartida(id_jugada: number, id_usuario: number): Observable<any> {
    return this.http.get<any>(
      `${this.api_url}jugada/buscarPartida/${id_jugada}+${id_usuario}`
    );
  }

  getJugadas(id_usuario: number): Observable<Jugada[]> {
    return this.http.get<Jugada[]>(
      `${this.api_url}jugada/listaJugada/${id_usuario}`
    );
  }

  nuevaJugada(id_usuario: number): Observable<any> {
    const nuevaJugada = {
      idUsuario: id_usuario,
    };
    const url = `${this.api_url}jugada/nuevaJugada/${id_usuario}`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(nuevaJugada);

    return this.http.post(url, body, { headers: headers });
  }

  finalizarJugada(id_jugada: number, id_usuario: number): Observable<any> {
    return this.http.put(
      `${this.api_url}jugada/terminar/${id_jugada}+${id_usuario}`,
      null
    );
  }

  getPartidas(id_usuario: number): Observable<any> {
    return this.http.get<any>(
      `${this.api_url}partidas/listadoPartidas/${id_usuario}`
    );
  }

  getTodasJugadas(id_usuario: number): Observable<any> {
    return this.http.get<any>(`${this.api_url}jugada/getJugadas/${id_usuario}`);
  }
}
