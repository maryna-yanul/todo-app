import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { DatabaseService } from '../../services/firebase/database.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  backlog: object[] = [{}];
  inProgress: object[] = [{}];
  todos: object[] = [{}];
  completed: object[] = [{}];

  state = {
    backlog: 0,
    in_progress: 0,
    todo: 0,
    completed: 0
  }

  isMobile = false

  constructor(
    private todoService: TodoService,
    private database: DatabaseService
  ) {
  }

  async ngOnInit() {
    this.isMobile = document.body.offsetWidth < 768

    Object.assign(this, await this.todoService.getAllTodo())

    this.state.backlog = this.backlog.length;
    this.state.in_progress = this.inProgress.length;
    this.state.todo = this.todos.length;
    this.state.completed = this.completed.length;
  }

  newType(currentStatus) {
    const newState = {
      backlog: this.backlog.length,
      in_progress: this.inProgress.length,
      todo: this.todos.length,
      completed: this.completed.length
    };

    for(const status in newState) {
      if (status !== currentStatus && newState[status] !== this.state[status]) {
        this.state = newState;
        return status;
      }
    }

    return '';
  }

  async todoMoved(todo: any, list: any[]) {
    const { id, status } = todo;

    list.splice(list.indexOf(todo), 1);

    const type = this.newType(status);

    if (type) {
      await this.todoService.changeStatus(id, type);
    }

    Object.assign(this, await this.todoService.getAllTodo());
  }

  async deleteTodo(id) {
    await this.todoService.delete(id);
    Object.assign(this, await this.todoService.getAllTodo());
  }
}
