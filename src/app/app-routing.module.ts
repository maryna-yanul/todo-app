import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpComponent } from './sign/up/up.component';
import { InComponent } from './sign/in/in.component';

const routes: Routes = [
  { path: 'sign/up', component: UpComponent },
  { path: 'sign/in', component: InComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
