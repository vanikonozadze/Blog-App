import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = false;

    if (!isAuthenticated) {
      this.router.navigate(['/start']);
      return false;
    }

    return true;
  }
}
