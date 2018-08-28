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
import { DndListModule } from 'ngx-drag-and-drop-lists';

import { NewTodoComponent } from './new-todo/new-todo.component';
import { ListComponent } from './list/list.component';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
]

@NgModule({
  imports: [
    CommonModule,
    ...materialModules,
    FormsModule,
    DndListModule
  ],
  declarations: [
    NewTodoComponent,
    ListComponent
  ]
})
export class TodoModule { }
