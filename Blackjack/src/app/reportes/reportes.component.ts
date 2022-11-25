import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { style } from '@angular/animations';
import { ChartData, ChartEvent } from 'chart.js';
import { Subscription } from 'rxjs';
import { JugadaService } from '../services/jugada.service';
import { Usuario } from '../Interfaces/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { Partida } from '../Interfaces/partida';
import { S } from 'chart.js/dist/chunks/helpers.core';
import { Jugada } from '../Interfaces/jugada';
import { JuegoComponent } from '../juego/juego.component';
import { UsuarioService } from '../services/usuario.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  usuario = {} as Usuario;

  cantidadJuegosTotal: ChartData<'pie'>;
  listadoJugadasTotal: any[] = [];
  private mensajeTotal: string[] = [`Total de juegos`];

  cantidadJuegosSinTerminar: ChartData<'pie'>;
  listadoJugadas: any[] = [];
  private mensaje: string[] = [`Total de juegos en línea sin terminar`];

  partidasCroupier: ChartData<'pie'>;
  listadoVictoriasCroupier: any[] = [];
  private mensajeVictoriasCroupier: string[] = ['Victorias del Croupier'];

  cantidadPartidas21: ChartData<'pie'>;
  listadoPartidas21: any[] = [];
  private mensajePartidas21: string[] = [
    `Cantidad de blackjack del jugador`,
    `Cantidad de blackjack del croupier`,
    `Promedio de blackjack del jugador`,
    `Promedio de blackjack del croupier`,
  ];

  cantidadJugadores: ChartData<'pie'>;
  listadoJugadores: any[] = [];
  private mensajeJugadores: string[] = [`Cantidad de Jugadores`];

  @ViewChild(JuegoComponent) child: any;

  constructor(
    private jugadaService: JugadaService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.usuario.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getJugadoresAll();
    this.cantidadJuegoTot();
    this.cantidadJuegoSinTerminar();
    this.cantidadVictoriasCroupier();
    this.cantidadPromedio21();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getJugadoresAll() {
    this.suscripcion.add(
      this.usuarioService.getUsuarios().subscribe({
        next: (respuesta: any) => {
          this.listadoJugadores = respuesta.listadoUsuarios;
          this.cantidadJugadores = {
            labels: this.mensajeJugadores,
            datasets: [
              {
                data: [
                  this.listadoJugadores.filter((u) => (u.id = this.usuario.id))
                    .length,
                ],
                backgroundColor: ['#3eab53'],
              },
            ],
          };
        },
        error: () => alert('ERROR this.jugadaService.getPartidas'),
      })
    );
  }

  cantidadJuegoTot() {
    this.suscripcion.add(
      this.jugadaService.getTodasJugadas(this.usuario.id).subscribe({
        next: (respuesta: any) => {
          this.listadoJugadas = respuesta.listaJugadas;

          this.cantidadJuegosTotal = {
            labels: this.mensajeTotal,
            datasets: [
              {
                data: [this.listadoJugadas.length],
                backgroundColor: ['#fa6bd5'],
              },
            ],
          };
        },
        error: () => {
          alert('ERROR jugadaService.getJugadas()');
        },
      })
    );
  }

  cantidadJuegoSinTerminar() {
    this.suscripcion.add(
      this.jugadaService.getJugadas(this.usuario.id).subscribe({
        next: (respuesta: any) => {
          this.listadoJugadas = respuesta.listaJugadas;

          this.cantidadJuegosSinTerminar = {
            labels: this.mensaje,
            datasets: [
              {
                data: [this.listadoJugadas.length],
                backgroundColor: ['#f53927'],
              },
            ],
          };
        },
        error: () => {
          alert('ERROR jugadaService.getJugadas()');
        },
      })
    );
  }

  cantidadVictoriasCroupier() {
    this.suscripcion.add(
      this.jugadaService.getPartidas(this.usuario.id).subscribe({
        next: (respuesta: any) => {
          this.listadoVictoriasCroupier = respuesta.listaPartida;
          this.partidasCroupier = {
            labels: this.mensajeVictoriasCroupier,
            datasets: [
              {
                data: [
                  this.listadoVictoriasCroupier.filter(
                    (p) => p.resultado === 'Perdiste!'
                  ).length,
                ],
                backgroundColor: ['#796edb'],
              },
            ],
          };
        },
        error: () => alert('ERROR this.jugadaService.getPartidas'),
      })
    );
  }

  cantidadPromedio21() {
    this.suscripcion.add(
      this.jugadaService.getTodasJugadas(this.usuario.id).subscribe({
        next: (respuesta: any) => {
          this.listadoJugadas = respuesta.listaJugadas;

          this.suscripcion.add(
            this.jugadaService.getPartidas(this.usuario.id).subscribe({
              next: (respuesta: any) => {
                this.listadoPartidas21 = respuesta.listaPartida;
                console.log(this.listadoPartidas21);

                this.cantidadPartidas21 = {
                  labels: this.mensajePartidas21,
                  datasets: [
                    {
                      data: [
                        this.listadoPartidas21.filter(
                          (p) => p.resultado === '¡Blackjack del jugador!'
                        ).length,
                        this.listadoPartidas21.filter(
                          (p) => p.resultado === '¡Blackjack del croupier!'
                        ).length,
                        this.listadoPartidas21.filter(
                          (p) => p.resultado === '¡Blackjack del jugador!'
                        ).length / this.listadoJugadas.length,
                        this.listadoPartidas21.filter(
                          (p) => p.resultado === '¡Blackjack del croupier!'
                        ).length / this.listadoJugadas.length,
                      ],
                      backgroundColor: [
                        '#d62020',
                        '#4732fc',
                        '#FF5A4A',
                        '#988CFF',
                      ],
                    },
                  ],
                };
              },
              error: () => alert('ERROR this.jugadaService.getPartidas'),
            })
          );
        },
        error: () => {
          alert('ERROR jugadaService.getJugadas()');
        },
      })
    );
  }

  volver() {
    this.router.navigate(['/dashboard/' + this.usuario.id]);
  }
}
