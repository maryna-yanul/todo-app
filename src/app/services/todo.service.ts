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
  ) { }

  create(todo, todoImages) {
    const { uid } = this.auth.user;

    return this.database.createWithId(`todo/${uid}`, todo)
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
