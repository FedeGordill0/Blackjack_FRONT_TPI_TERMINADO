import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { UsuarioLogin } from '../Interfaces/usuario-login';
@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css'],
})
export class LoginUsuarioComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  private suscripcion = new Subscription();
  usuario: UsuarioLogin;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private fb: FormBuilder
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

  login() {
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

    {
      this.usuarioService.loginUsuario(user.usuario, user.clave).subscribe({
        next: (data: any) => {
          Swal.fire({
            icon: 'success',
            text: `¡Bienvenido ${user.usuario}!`,
            showConfirmButton: false,
            timer: 1500,
          });

          localStorage.setItem('token', data);
          this.router.navigate(['/dashboard/' + data.id]);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrectos',
          });
        },
      });
    }
  }
}
