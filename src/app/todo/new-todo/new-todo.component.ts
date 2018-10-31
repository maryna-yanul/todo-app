import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../shared/class/todo';

const emptyTodo = {
  title: '',
  description: '',
  deadline: new Date(),
  status: 'backlog'
};

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit, AfterViewInit {
  todo: Todo = {
    ...emptyTodo
  };

  statuses = [
    { value: 'backlog', text: 'Backlog'},
    { value: 'todo', text: 'Todo'},
    { value: 'in_progress', text: 'In Progress'},
    { value: 'completed', text: 'Completed'}
  ];

  images;

  constructor(
    private todoService: TodoService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const createBtn = document.querySelector('#create-btn');
    fromEvent(createBtn, 'submit')
      .debounceTime(500)
      .subscribe(
        () => this.create(),
        err => console.error(err),
        () => console.log('Complete observe for #create-btn')
      );
  }

  create() {
    const todo = Object.assign({}, this.todo);

    this.todo = {
      ...emptyTodo
    };

    todo.deadline = typeof this.todo.deadline === 'number' ? this.todo.deadline : this.todo.deadline.getTime();

    this.todoService.create(todo, this.images)
      .then(() => this.toast.success('', 'Created'))
      .catch(({ ref }) => {
        this.toast.error('Something went wrong', 'Error');

        ref.put(null);
      });
  }

  openBrowser(event) {
    event.preventDefault();

    document.getElementById('fileInput').click();
  }

  fileChange(images: File[]) {
    if (images.length > 0) {
      this.images = [... new Set(images)];
    }
  }
}
