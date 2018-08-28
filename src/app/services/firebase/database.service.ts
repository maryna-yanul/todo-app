import { Injectable } from '@angular/core';
import { database } from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  default = database()

  constructor() {
  }

  async createOrUpdate(parent, child, value) {
    const ref = this.default.ref(`${parent}/${child}`);
    const exist = (await ref.once('value')).exists();

    if (exist) {
      ref.update(value);
    } else {
      const todo = await this.default.ref(parent).push(value);
      const id = todo.key;
      todo.update({ id });
    }
  }

  async createWithId(name, value) {
    const ref = this.default.ref(name)
    const todo = await ref.push(value);
    const id = todo.key;
    todo.update({ id });

    return todo
  }

  delete(path) {
    return this.default.ref(path).set(null);
  }

  getDataByKeyAndValue(path, key, value) {
    return this.default.ref(path).orderByChild(key).equalTo(value);
  }

  update(path, values) {
    return this.default.ref(path).update(values)
  }
}
