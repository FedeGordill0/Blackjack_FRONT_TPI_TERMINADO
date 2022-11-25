import { Usuario } from './usuario';

export interface Jugada {
  id_jugada: number;
  usuario: Usuario;
  estado: number;
}
