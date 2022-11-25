import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { Carta } from '../Interfaces/carta';
import { CartaJugada } from '../Interfaces/carta-jugada';
import { Partida } from '../Interfaces/partida';
import { Usuario } from '../Interfaces/usuario';
import { CartaService } from '../services/carta.service';
import { JugadaService } from '../services/jugada.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  id_partida: number = 0;
  id_jugada: number = 0;
  carta: any;
  puntosCroupier: number = 0;
  puntosJugador: number = 0;
  cartasCroupier: Carta[] = [];
  cartasJugador: Carta[] = [];
  resultado: string = '';
  resultado2: string = '';
  cartasJugadas: Carta[] = [];
  cartaJ = {} as CartaJugada;
  disponibles: Carta[] = [];
  ases: Carta[] = [];
  mazo: Carta[] = [];
  usuario = {} as Usuario;
  estado: number = 0;
  asChanged = false;
  jugador: string = '';
  cantidadCartas = 0;
  cVictoriaCroupier: number = 0;
  contadorTotal21: number = 0;
  @ViewChild('btnPedir') btnPedir: ElementRef;
  @ViewChild('btnQuedarse') btnQuedarse: ElementRef;

  constructor(
    private cartaService: CartaService,
    private jugadaService: JugadaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id_jugada = this.activatedRoute.snapshot.params['id'];
    this.usuario.id = this.activatedRoute.snapshot.params['id_usuario'];
    this.id_partida = this.activatedRoute.snapshot.params['id_partida'];
    this.cartaService.getCartas().subscribe((res) => {
      this.mazo = res.mazo as Carta[];
      this.cantidadCartas = this.mazo.length;
      this.ases = this.mazo.filter((element) => element.isAs === 1);
      this.disponibles = this.mazo;
    });

    this.jugadaService.getPartida(this.id_jugada, this.usuario.id).subscribe({
      next: (p: any) => {
        this.cartasJugador = p.cartasJugadas;
        this.puntosJugador = p.puntosJugador;
        this.puntosCroupier = p.puntosCroupier;
      },
      error: (err) => {
        console.log('ERROR jugadaService.getPartida', err);
      },
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  obtenerCarta(jugador: string) {
    let cartaT = this.disponibles.splice(
      Math.floor(Math.random() * this.cantidadCartas),
      1
    )[0];

    if (jugador === 'croupier') {
      this.cartasCroupier.push(cartaT);
      let valorCarta: number = this.obtenerPuntos(
        cartaT as Carta,
        this.jugador
      );
      this.puntosCroupier += valorCarta;
    } else {
      this.cartasJugador.push(cartaT);
      let valorCarta: number = this.obtenerPuntos(
        cartaT as Carta,
        this.jugador
      );
      this.puntosJugador += valorCarta;

      if (this.puntosJugador > 21) {
        this.cartasJugador.forEach((e) => {
          if (
            this.ases.filter((item) => item.id == e.id).length > 0 &&
            !this.asChanged
          ) {
            this.asChanged = true;
            this.puntosJugador = this.puntosJugador - 10;
          }
        });
      }
    }
    this.cartasJugadas = this.cartasJugador.concat(this.cartasCroupier);
  }

  obtenerPuntos(carta: Carta, jugador: string) {
    let puntaje = 0;
    let valorCarta = 0;

    if (jugador === 'croupier') {
      puntaje = this.puntosCroupier;
    } else {
      puntaje = this.puntosJugador;
    }
    valorCarta = carta.valor;

    return valorCarta;
  }

  pedirCartaJugador(jugador: string) {
    this.obtenerCarta(jugador);

    if (this.puntosJugador === 21) {
      this.resultado = '¡Blackjack del jugador!';
      this.contadorTotal21++;
      this.guardarPartida();
      this.btnPedir.nativeElement.style.display = 'none';
      this.btnQuedarse.nativeElement.style.display = 'none';
    }
    if (this.puntosJugador > 21) {
      this.resultado = 'Perdiste!';
      this.resultado2 = 'Te pasaste de 21 puntos';
      this.guardarPartida();
      this.cVictoriaCroupier++;
      this.btnPedir.nativeElement.style.display = 'none';
      this.btnQuedarse.nativeElement.style.display = 'none';
    }

    this.puntosJugador = this.puntosJugador;

    this.cartasJugadas.forEach((carta) => {
      this.cartaJ.cartaJ = carta;
      this.cartaJ.jugador = jugador;
    });

    this.suscripcion.add(
      this.cartaService
        .postCartaJugada(
          this.id_jugada,
          this.id_partida,
          this.cartaJ.cartaJ.id,
          this.cartaJ.jugador
        )
        .subscribe({
          next: (cartaJugada: CartaJugada) => {
            console.log(cartaJugada);
          },
          error: (err: any) => {
            console.log('ERROR cartaService.postCartaJugada', err);
          },
        })
    );
  }

  plantarse() {
    while (this.puntosCroupier <= 17) {
      this.obtenerCarta('croupier');
      this.puntosCroupier = this.puntosCroupier;
    }
    if (this.puntosCroupier === 21) {
      this.resultado = '¡Blackjack del croupier!';
      this.contadorTotal21++;
      this.btnPedir.nativeElement.style.display = 'none';
      this.btnQuedarse.nativeElement.style.display = 'none';
    } else if (
      this.puntosCroupier < 22 &&
      this.puntosCroupier > this.puntosJugador
    ) {
      this.resultado = 'Perdiste!';

      this.cVictoriaCroupier++;
      this.btnPedir.nativeElement.style.display = 'none';
      this.btnQuedarse.nativeElement.style.display = 'none';
    } else if (
      this.puntosCroupier < 22 &&
      this.puntosCroupier < this.puntosJugador
    ) {
      this.resultado = 'Ganaste!';
      this.resultado2 = 'Mayoría de puntos';
      this.btnPedir.nativeElement.style.display = 'none';
      this.btnQuedarse.nativeElement.style.display = 'none';
    } else if (
      this.puntosCroupier < 22 &&
      this.puntosCroupier === this.puntosJugador
    ) {
      this.resultado = 'Empate';
      this.btnPedir.nativeElement.style.display = 'none';
      this.btnQuedarse.nativeElement.style.display = 'none';
    } else if (this.puntosCroupier > 21 && this.puntosJugador < 22) {
      this.resultado = 'Ganaste!';
      this.resultado2 = 'El croupier se pasó de 21 puntos';
      this.btnPedir.nativeElement.style.display = 'none';
      this.btnQuedarse.nativeElement.style.display = 'none';
    }

    this.guardarPartida();
  }

  guardarPartida() {
    this.jugadaService
      .actualizarPartida(
        this.id_partida,
        this.id_jugada,
        this.usuario.id,
        this.puntosCroupier,
        this.puntosJugador,
        0,
        this.resultado
      )
      .subscribe({
        next: () => {
          Swal.fire({
            position: 'top-end',
            title: 'Guardando...',
            showConfirmButton: false,
            timer: 500,
          });
        },
        error: (err) => {
          console.log('ERROR jugadaService.actualizarPartida', err);
        },
      });
  }

  terminarJugada() {
    this.suscripcion.add(
      this.jugadaService
        .finalizarJugada(this.id_jugada, this.usuario.id)
        .subscribe({
          next: () => {
            Swal.fire({
              position: 'top-end',
              title: 'Partida finalizada...',
              showConfirmButton: false,
              timer: 800,
            });
            this.router.navigate(['dashboard/' + this.usuario.id]);
          },
          error: (err) => {
            console.log('Error jugadaService.terminarJugada', err);
          },
        })
    );
  }

  siguienteRonda() {
    this.jugadaService.nuevaPartida(this.usuario.id, this.id_jugada).subscribe({
      next: (part: Partida) => {
        var id_partida = part.idPartida;
        this.router
          .navigate([
            'juego/' +
              this.id_jugada +
              '/' +
              this.usuario.id +
              '/' +
              id_partida,
          ])
          .then(() => {
            window.location.reload();
          });
      },
      error: (err) => {
        console.log('ERROR jugadaService.siguienteRonda', err);
      },
    });
  }
  salir() {
    this.jugadaService
      .actualizarPartida(
        this.id_partida,
        this.id_jugada,
        this.usuario.id,
        this.puntosCroupier,
        this.puntosJugador,
        0,
        this.resultado
      )
      .subscribe({
        next: () => {
          Swal.fire({
            position: 'top-end',
            title: 'Guardando...',
            showConfirmButton: false,
            timer: 500,
          });
        },
        error: (err: any) => {
          console.log('ERROR jugadaService.actualizarPartida', err);
        },
      });

    this.router.navigate(['/dashboard/' + this.usuario.id]);
  }
}
