import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { User } from '../../shared/class/user';

@Injectable({
  providedIn: 'root'
})
export class SignService {
  private auth = auth;
  user;

  constructor() {
    this.auth().onAuthStateChanged(user => {
      console.log('change: ', user);
      this.user = user;
    });
  }

  up(userInfo: User) {
    return this.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(result => {
        const { currentUser } = this.auth();

        currentUser.updateProfile({
          displayName: userInfo.name
        })
        .then(() => console.log('ok'))
        .catch(err => console.error('Err: ', err));
      });
  }

  in(userInfo) {
    return this.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password);
  }

  out() {
    return this.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }
}
