import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
    private sign: SignService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.sign.in(this.user)
      .catch(err => this.toast.error(err.message, 'Error', { disableTimeOut: true }));
  }
}
