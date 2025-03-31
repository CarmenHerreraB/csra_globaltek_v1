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
import { ActivosComponent } from './components/activos/activos.component';
import { ModalAgregarActivoComponent } from './components/modal-agregar-activo/modal-agregar-activo.component';
import { RegistrousuariosComponent } from './components/registrousuarios/registrousuarios.component';

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
    RegistrousuariosComponent
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
