import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpComponent } from './sign/up/up.component';
import { InComponent } from './sign/in/in.component';
import { NewTodoComponent } from './todo/new-todo/new-todo.component';
import { FetchUserGuard } from './sign/fetch-user.guard';
import { ListComponent } from './todo/list/list.component';
import { EditComponent } from './todo/edit/edit.component';
import { ViewComponent } from './todo/view/view.component';

const routes: Routes = [
  { path: 'sign/up', component: UpComponent },
  { path: 'sign/in', component: InComponent },
  { path: 'todo/new', component: NewTodoComponent, canActivate: [FetchUserGuard] },
  { path: '', component: ListComponent, canActivate: [FetchUserGuard] },
  { path: 'todo/edit/:id', component: EditComponent, canActivate: [FetchUserGuard] },
  { path: 'todo/view/:id', component: ViewComponent, canActivate: [FetchUserGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
