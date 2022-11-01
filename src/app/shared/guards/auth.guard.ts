import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '@ferias-e-co/identity';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  isUserLogged: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async canActivate(): Promise<boolean> {

    const accessToken: string = localStorage.getItem('access_token');

    if (!accessToken) {
      this.goToLogin();
      return false;
    }

    try {
      this.isUserLogged = await this.authService.isUserLoggedIn();
    } catch (error) {
      this.isUserLogged = false;
    }

    if (!this.isUserLogged) {
      this.goToLogin();
    }

    return this.isUserLogged;
  }

  private goToLogin() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
