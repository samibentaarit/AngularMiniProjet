import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth1Service } from 'src/app/services/auth1.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrUserGuard implements CanActivate {
  constructor(private authService: Auth1Service) {
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.getRole('ADMIN') || this.authService.getRole('USER')) {
        return true; // User is authenticated and has either 'ADMIN' or 'USER' role
      }
  
      this.authService.logout();
      return false;
  }
}
