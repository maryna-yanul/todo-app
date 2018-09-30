import { Injectable } from '@angular/core';
import { DatabaseService } from './firebase/database.service';
import { StorageService } from './firebase/storage.service';
import { SignService } from './firebase/sign.service';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private database: DatabaseService,
    private storage: StorageService,
    private auth: SignService
  ) {
  }

  create(todo, todoImages) {
    const { uid } = this.auth.user;
    const userTodoPath = `todo/${uid}`;

    return this.database.createWithId(userTodoPath, todo)
      .then(async ref => {
        try {
          const urls = await this.storage.uploadImages(todoImages);

          ref.update({ images: urls });
        } catch (err) {
          return { err, ref };
        }
      });
  }

  getTodoByStatus(status) {
    const { uid } = this.auth.user;
    const userTodoPath = `todo/${uid}`;

    return this.database.getDataByKeyAndValue(userTodoPath, 'status', status);
  }

  getBacklogTodo() {
    return this.getTodoByStatus('backlog');
  }

  getInProgressTodo() {
    return this.getTodoByStatus('in_progress');
  }

  getTodoTodo() {
    return this.getTodoByStatus('todo');
  }

  getCompletedTodo() {
    return this.getTodoByStatus('completed');
  }

  async getAllTodo() {
    const backlog = Object.values(((await this.getBacklogTodo().once('value')).val()) || {});
    const inProgress = Object.values(((await this.getInProgressTodo().once('value')).val() || {}));
    const todos = Object.values(((await this.getTodoTodo().once('value')).val() || {}));
    const completed = Object.values(((await this.getCompletedTodo().once('value')).val() || {}));

    return { backlog, inProgress, todos, completed };
  }

  async update(id = '', { todo, images }) {
    const { uid } = this.auth.user;
    const userTodoPath = `todo/${uid}/${id}`;
    const urls = images.length && (await this.storage.uploadImages(images)) || [];
    todo.images = [...(todo.images || []), ...urls];

    return this.database.update(userTodoPath, todo);
  }

  async getTodo(id) {
    const { uid } = this.auth.user;
    const path = `todo/${uid}/${id}`;
    const ref = this.database.default.ref(path);
    const todo = (await ref.once('value')).val();

    return todo;
  }

  delete(id) {
    const { uid } = this.auth.user;

    return this.database.delete(`todo/${uid}/${id}`);
  }

  changeStatus(id, status) {
    const { uid } = this.auth.user;

    return this.database.update(`todo/${uid}/${id}`, { status });
  }
}
