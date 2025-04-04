import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (!loginService.isAuthenticated()) {
    router.navigate(['/login']); // Redirige al login si no está autenticado
    return false;
  }

  return true;
};