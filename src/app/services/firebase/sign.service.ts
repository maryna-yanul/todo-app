import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { User } from '../../shared/class/user';

@Injectable({
  providedIn: 'root'
})
export class SignService {
  default = auth;
  user;

  constructor() {
    this.default().onAuthStateChanged(user => {
      this.user = user;
    });
  }

  up(userInfo: User) {
    return this.default().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(() => {
        const { currentUser } = this.default();

        currentUser.updateProfile({
          displayName: userInfo.name,
          photoURL: null // TODO: implemented photo for user
        })
      });
  }

  in(userInfo) {
    return this.default().signInWithEmailAndPassword(userInfo.email, userInfo.password);
  }

  out() {
    return this.default().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }
}
