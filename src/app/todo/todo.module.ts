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

import { NewTodoComponent } from './new-todo/new-todo.component';

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
    FormsModule
  ],
  declarations: [
    NewTodoComponent
  ]
})
export class TodoModule { }
