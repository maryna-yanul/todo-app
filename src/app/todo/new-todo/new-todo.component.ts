import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../shared/class/todo';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {
  todo: Todo = {
    title: '',
    description: '',
    deadline: new Date(),
    status: 'backlog'
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

  create() {
    const todo = {
      ...this.todo
    };

    todo.deadline = typeof this.todo.deadline === 'number' ? this.todo.deadline : this.todo.deadline.getTime();

    this.todoService.create(this.todo, this.images)
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
