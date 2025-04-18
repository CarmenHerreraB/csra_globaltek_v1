import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

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
import { CalculadoraComponent } from './components/activos-components/calculadora/calculadora.component';
import { ConfigTablasComponent } from './components/activos-components/config-tablas/config-tablas.component';

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
    CalculadoraComponent,
    ConfigTablasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Importar Reactive Form Module para  trabajar los fomularios
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
