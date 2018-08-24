import { Injectable } from '@angular/core';
import { DatabaseService } from './firebase/database.service';
import { StorageService } from './firebase/storage.service';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private database: DatabaseService,
    private storage: StorageService
  ) { }

  create(todo, todoImages) {
    this.database.createWithId('todo', todo)
      .then(async ref => {
        const urls = await this.storage.uploadImages(todoImages)

        ref.update({ images: urls })
      })
      .catch(error => console.error(error))
  }
}
