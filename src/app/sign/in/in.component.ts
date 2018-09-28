import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private toast: ToastrService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.sign.in(this.user)
      .then(() => this.route.navigateByUrl('todo/list'))
      .catch(err => this.toast.error(err.message, 'Error', { disableTimeOut: true }));
  }
}
