import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  }   from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { DndListModule } from 'ngx-drag-and-drop-lists';

import { NewTodoComponent } from './new-todo/new-todo.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AppRoutingModule } from '../app-routing.module';
import { ViewComponent } from './view/view.component';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatIconModule
]

@NgModule({
  imports: [
    CommonModule,
    ...materialModules,
    FormsModule,
    DndListModule,
    AppRoutingModule
  ],
  declarations: [
    NewTodoComponent,
    ListComponent,
    EditComponent,
    ViewComponent
  ]
})
export class TodoModule { }
