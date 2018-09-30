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
    this.hasUser = Boolean(this.sign.user);
  }

  signOut() {
    this.sign.out();
  }
}
