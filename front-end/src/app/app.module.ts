import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginaprincipalComponent } from './components/paginaprincipal/paginaprincipal.component';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { RegistrousuariosComponent } from './components/registrousuarios/registrousuarios.component';

//Componentes de activos 
import { ActivosComponent } from './components/activos-components/activos/activos.component';
import { ModalAgregarActivoComponent } from './components/activos-components/modal-agregar-activo/modal-agregar-activo.component';
import { ModaleditaractivoComponent } from './components/activos-components/modaleditaractivo/modaleditaractivo.component';
import { ConfiguracionActivosComponent } from './components/activos-components/configuracion-activos/configuracion-activos.component';
import { GapComponent } from './components/GAP-components/gap/gap.component';
import { ConfigTablasComponent } from './components/activos-components/config-tablas/config-tablas.component';
import { ConfigCalculadoraComponent } from './components/activos-components/config-calculadora/config-calculadora.component';

//Componentes de GAP
import { TablaPreguntasComponent } from './components/GAP-components/tabla-preguntas/tabla-preguntas.component';
import { GraficasComponent } from './components/GAP-components/graficas/graficas.component';
import { TablaMadurezComponent } from './components/GAP-components/tabla-madurez/tabla-madurez.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactenosComponent,
    NavbarComponent,
    PaginaprincipalComponent,
    CambiarContrasenaComponent,
    ActivosComponent,
    ModalAgregarActivoComponent,
    RegistrousuariosComponent,
    ModaleditaractivoComponent,
    ConfiguracionActivosComponent,
    GapComponent,
    ConfigTablasComponent,
    ConfigCalculadoraComponent,
    TablaPreguntasComponent,
    GraficasComponent,
    TablaMadurezComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Importar Reactive Form Module para  trabajar los fomularios
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
