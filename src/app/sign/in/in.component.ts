import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/firebase/sign.service';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.scss']
})
export class InComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private sign: SignService
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.sign.in(this.user);
  }
}
