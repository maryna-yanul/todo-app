import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignService } from '../services/firebase/sign.service';

@Injectable({
  providedIn: 'root'
})
export class FetchUserGuard implements CanActivate {
  constructor(
    private auth: SignService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.auth.default().onAuthStateChanged(user => {
        const hasUser = Boolean(user);
        if (hasUser) {
          resolve(hasUser);
        } else {
          this.router.navigate(['/sign/in']);
          reject(hasUser);
        }
      });
    });
  }
}
