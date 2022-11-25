import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartaService } from './services/carta.service';
import { JugadaService } from './services/jugada.service';
import { UsuarioService } from './services/usuario.service';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JuegoComponent } from './juego/juego.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PartidaComponent } from './partida/partida.component';
import { ReportesComponent } from './reportes/reportes.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginUsuarioComponent,
    RegistrarUsuarioComponent,
    JuegoComponent,
    DashboardComponent,
    PartidaComponent,
    ReportesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  providers: [UsuarioService, CartaService, JugadaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
