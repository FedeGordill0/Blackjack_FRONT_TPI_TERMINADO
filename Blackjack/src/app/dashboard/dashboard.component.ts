import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Jugada } from '../Interfaces/jugada';
import { Partida } from '../Interfaces/partida';
import { Usuario } from '../Interfaces/usuario';

import { JugadaService } from '../services/jugada.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  id_usuario: number = 0;
  usuario = {} as Usuario;
  jugada = {} as Jugada;
  id_partida: number = 0;
  id_jugada: number = 0;
  cPartidaUsuario: number = 0;

  constructor(
    private router: Router,
    private jugadaService: JugadaService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.id_usuario = this.activatedRoute.snapshot.params['id'];

    this.suscripcion.add(
      this.usuarioService.getUsuarioID(this.id_usuario).subscribe({
        next: (u: Usuario) => {
          this.usuario.id = u.id;
          this.usuario.usuario = u.usuario;
        },
        error: (err) => {
          console.log('ERROR usuarioService.getUsuarioID ', err);
        },
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  nuevaPartida() {
    this.cPartidaUsuario++;

    this.suscripcion.add(
      this.jugadaService.nuevaJugada(this.usuario.id).subscribe({
        next: (j: Jugada) => {
          this.id_jugada = j.id_jugada;
          this.jugada = j;

          this.jugadaService
            .nuevaPartida(this.usuario.id, this.id_jugada)
            .subscribe({
              next: (part: Partida) => {
                this.id_partida = part.idPartida;

                this.router.navigate([
                  'juego/' +
                    j.id_jugada +
                    '/' +
                    this.usuario.id +
                    '/' +
                    this.id_partida,
                ]);
              },
              error: (err) => {
                console.log('ERROR jugadaService.nuevaPartida', err);
              },
            });
        },
        error: (err) => {
          console.log('ERROR jugadaService.nuevaJugada', err);
        },
      })
    );
  }

  listadoPartidas() {
    this.router.navigate(['/lista/' + this.id_usuario]);
  }

  reportes() {
    this.router.navigate(['/reportes/' + this.id_usuario]);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
