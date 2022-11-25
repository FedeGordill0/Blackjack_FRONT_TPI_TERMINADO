import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { subscribeOn, Subscription } from 'rxjs';
import { Jugada } from '../Interfaces/jugada';
import { Usuario } from '../Interfaces/usuario';

import { JugadaService } from '../services/jugada.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css'],
})
export class PartidaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  id_usuario: number = 0;
  usuario = {} as Usuario;
  jugada = {} as Jugada;
  listaPartidas: any[] = [];
  id_partida: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jugadaService: JugadaService
  ) {
    this.id_usuario = this.activatedRoute.snapshot.params['id_usuario'];
  }

  ngOnInit(): void {
    this.suscripcion.add(
      this.jugadaService.getJugadas(this.id_usuario).subscribe({
        next: async (partida: any) => {
          this.listaPartidas = partida.listaJugadas;
        },
        error: (err: any) => {
          console.log('Error', err);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  continuar(id_jugada: number) {
    this.jugadaService.getPartida(id_jugada, this.id_usuario).subscribe({
      next: (p: any) => {
        this.id_partida = p.idJugada;
        this.router.navigate([
          `juego/${id_jugada}/${this.id_usuario}/${this.id_partida}`,
        ]);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  volver() {
    this.router.navigate(['/dashboard/' + this.id_usuario]);
  }
}
