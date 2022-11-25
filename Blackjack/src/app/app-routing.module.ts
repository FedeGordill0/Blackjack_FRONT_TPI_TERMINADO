import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JuegoComponent } from './juego/juego.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { PartidaComponent } from './partida/partida.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { ReportesComponent } from './reportes/reportes.component';
import { AuthGuard } from './services/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'registrar', component: RegistrarUsuarioComponent },
  { path: 'login', component: LoginUsuarioComponent },
  {
    path: 'dashboard/:id',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'juego/:id/:id_usuario/:id_partida', component: JuegoComponent },
  { path: 'lista/:id_usuario', component: PartidaComponent },
  { path: 'reportes/:id', component: ReportesComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
