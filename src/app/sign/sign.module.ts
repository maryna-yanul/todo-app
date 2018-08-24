import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InComponent } from './in/in.component';
import { UpComponent } from './up/up.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule  }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [
    InComponent,
    UpComponent
  ]
})
export class SignModule { }
