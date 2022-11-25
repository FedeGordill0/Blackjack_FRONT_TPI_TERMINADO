import { Carta } from './carta';
import { Partida } from './partida';

export interface CartaJugada {
  id: number;
  cartaJ: Carta;
  jugador: string;
  partida: Partida;
}
