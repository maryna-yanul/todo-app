import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/firebase/sign.service';
import { User } from '../../shared/class/user';

@Component({
  selector: 'app-up',
  templateUrl: './up.component.html',
  styleUrls: ['./up.component.scss']
})
export class UpComponent implements OnInit {

  user: User = {
    name: '',
    password: '',
    email: ''
  };

  constructor(
    private sign: SignService
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.sign.up(this.user);
  }

}
