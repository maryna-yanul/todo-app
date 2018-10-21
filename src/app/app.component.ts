import { Component } from '@angular/core';
import { SignService } from './services/firebase/sign.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  hasUser = false;

  constructor(
    private sign: SignService
  ) {
    this.sign.default().onAuthStateChanged(user => this.hasUser = Boolean(user));
  }

  signOut() {
    this.sign.out();
  }
}
