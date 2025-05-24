import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
