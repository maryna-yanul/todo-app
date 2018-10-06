import { Injectable } from '@angular/core';
import { storage } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  default = storage();

  constructor() {
  }

  private uniqueName = name => `${new Date().getTime()}_${name}`;

  private uploadImage = async image => {
    const newName = this.uniqueName(image.name);
    const ref =  this.default.ref('images').child(newName);

    await ref.put(image);
    return await ref.getDownloadURL();
  }

  uploadImages(files) {
    return Promise.all(files.map(this.uploadImage));
  }
}
