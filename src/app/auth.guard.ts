import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const token = localStorage.getItem('token');
      if (token) {
        // User is logged in, allow access to the route
        return true;
      } else {
        // Redirect to login page if no token is found
        this.router.navigate(['/login']);
        return false;
      }
  }
}
