import { Jugada } from './jugada';

export interface Partida {
  idPartida: number;
  jugada: Jugada;
  puntosJugador: number;
  puntosCrupier: number;
  estado: number;
  resultado: string;
}
