import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Carta } from '../Interfaces/carta';
import { CartaJugada } from '../Interfaces/carta-jugada';

@Injectable()
export class CartaService {
  //http://localhost:5170/api/
  api_url = environment.api_url;

  constructor(private http: HttpClient) {}

  getCartas(): Observable<any> {
    return this.http.get<any>(this.api_url + 'mazo/cartas');
  }

  getCartaID(id: number): Observable<Carta> {
    return this.http.get<Carta>(this.api_url + 'mazo/getCartaID/' + id);
  }

  postCartaJugada(
    id_jugada: number,
    id_partida: number,
    id_carta: number,
    jugador: string
  ): Observable<CartaJugada> {
    const carta = {
      idCarta: id_carta,
      idPartida: id_partida,
      jugador: jugador,
    };
    const url = `${this.api_url}cartaJugada/nuevaCarta/${id_partida}+${id_jugada}`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(carta);

    return this.http.post<CartaJugada>(url, body, { headers: headers });
  }
}
