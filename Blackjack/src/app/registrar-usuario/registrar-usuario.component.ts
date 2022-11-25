import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { UsuarioLogin } from '../Interfaces/usuario-login';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  private suscripcion = new Subscription();
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      usuario: ['', Validators.minLength(3)],
      clave: ['', Validators.minLength(4)],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  registrarUsuario() {
    const usuario = this.formulario.value.usuario;
    const clave = this.formulario.value.clave;

    if (usuario === '' || clave === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Los campos son obligatorios',
      });
      return;
    }

    const user = {
      usuario: usuario,
      clave: clave,
    };

    if (this.formulario.valid) {
      this.suscripcion.add(
        this.usuarioService
          .registrarUsuario(user.usuario, user.clave)
          .subscribe({
            next: (u: UsuarioLogin) => {
              Swal.fire({
                icon: 'success',
                text: '¡Usuario creado correctamente!',
              });

              this.router.navigate(['/dashboard/' + u.id]);
            },
            error: () => {},
          })
      );
    } else {
      alert('error carga de formulario');
    }
  }
}
