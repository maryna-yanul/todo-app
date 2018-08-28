import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpComponent } from './sign/up/up.component';
import { InComponent } from './sign/in/in.component';
import { NewTodoComponent } from './todo/new-todo/new-todo.component';
import { FetchUserGuard } from './sign/fetch-user.guard';
import { ListComponent } from './todo/list/list.component';

const routes: Routes = [
  { path: 'sign/up', component: UpComponent },
  { path: 'sign/in', component: InComponent },
  { path: 'todo/new', component: NewTodoComponent, canActivate: [FetchUserGuard] },
  { path: 'todo/list', component: ListComponent, canActivate: [FetchUserGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
