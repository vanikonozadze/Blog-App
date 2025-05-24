import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';

  public login(): void {
    sessionStorage.setItem(this.AUTH_KEY, 'true');
  }

  public logout(): void {
    sessionStorage.removeItem(this.AUTH_KEY);
  }

  public isAuthenticated(): boolean {
    return sessionStorage.getItem(this.AUTH_KEY) === 'true';
  }
}
