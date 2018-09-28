import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SignService } from '../services/firebase/sign.service';

@Injectable({
  providedIn: 'root'
})
export class FetchUserGuard implements CanActivate {
  constructor(
    private auth: SignService
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.auth.default().onAuthStateChanged(user => resolve(Boolean(user)));
    });
  }
}
