import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginaprincipalComponent } from './components/paginaprincipal/paginaprincipal.component';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { ActivosComponent } from './components/activos-components/activos/activos.component';
import { RegistrousuariosComponent } from './components/registrousuarios/registrousuarios.component';
import { authGuard } from './guards/auth.guard';
import { ConfiguracionActivosComponent } from './components/activos-components/configuracion-activos/configuracion-activos.component';
import { GapComponent } from './components/GAP-components/gap/gap.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrousuariosComponent
  },
  {
    path: 'contact',
    component: ContactenosComponent
  },
  {
    path: 'changepassword',
    component: CambiarContrasenaComponent,
    canActivate: [authGuard]
  },
  {
    path: 'homepage',
    component: PaginaprincipalComponent,
    canActivate: [authGuard]
  },
  {
    path: 'assets',
    component: ActivosComponent,
    canActivate: [authGuard]
  },
  {
    path: 'configAssets',
    component: ConfiguracionActivosComponent,
    canActivate: [authGuard]
  },
  {
    path: 'gap',
    component: GapComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
