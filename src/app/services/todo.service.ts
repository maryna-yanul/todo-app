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
    return this.database.createWithId('todo', todo)
      .then(async ref => {
        try {
          const urls = await this.storage.uploadImages(todoImages)

          ref.update({ images: urls })
        } catch(err) {
          return { err, ref }
        }
      })
  }
}
