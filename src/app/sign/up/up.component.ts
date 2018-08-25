import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/firebase/sign.service';
import { User } from '../../shared/class/user';
import { ToastrService } from 'ngx-toastr';

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
    private sign: SignService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.sign.up(this.user)
      .catch(err => this.toast.error(err.message, 'Error', { disableTimeOut: true }));
  }

}
