import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../shared/class/todo';
import { ImgWithSrc } from 'src/app/shared/class/image';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, AfterViewInit, OnDestroy {
  todo: Todo = {
    title: '',
    description: '',
    deadline: new Date,
    status: '',
    id: ''
  };

  statuses = [
    { value: 'backlog', text: 'Backlog'},
    { value: 'todo', text: 'Todo'},
    { value: 'in_progress', text: 'In Progress'},
    { value: 'completed', text: 'Completed'}
  ];

  newImages: File[] = [];
  imagesPreUpload = [];
  images: string[] = [];

  isFullScreen = false;
  fullScreenImage = '';

  fileObserver: Subscription;

  isSended = true; // HACK

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private toast: ToastrService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.todo = await this.todoService.getTodo(id);

    this.todo.deadline = new Date(this.todo.deadline);
    this.images = this.todo.images || [];
  }

  ngAfterViewInit() {
    const inputFile = document.querySelector('#fileInput');

    this.fileObserver = fromEvent(inputFile, 'change')
      .pluck('target')
      .pluck('files')
      .map((files: any) => files[files.length - 1])
      .filter(file => file)
      .mergeMap(image => new Promise((resolve, reject) => {
        this.newImages.push(image);
        const reader = new FileReader();

        reader.onload = event => {
          // @ts-ignore
          resolve({ src: event.target.result });
        };

        reader.onerror = error => {
          reject(error);
        };

        reader.readAsDataURL(image);
      }))
      .filter((image: ImgWithSrc) => {
        const hasSameImage = this.imagesPreUpload.find(img => img.src === image.src);

        if (hasSameImage) {
          this.newImages.pop();
        }

        return !hasSameImage;
      })
      .map((image: ImgWithSrc) => [...this.imagesPreUpload, image])
      .subscribe((images: ImgWithSrc[]) => {
        this.imagesPreUpload = images;
      });
  }

  ngOnDestroy() {
    this.fileObserver.unsubscribe();
  }

  preImagesView(images) {
    Promise.all(images.map(this.getImageSrc))
      .then(imgs => {
        this.imagesPreUpload = imgs;
      });
  }

  getImageSrc(image, index) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = event => {
        // @ts-ignore
        resolve({ src: event.target.result, index });
      };

      reader.onerror = error => {
        reject(error);
      };

      reader.readAsDataURL(image);
    });
  }

  update() {
    if (!this.isSended) {
      return;
    }

    this.isSended = false;

    this.todoService.update(this.todo.id, { todo: this.todo, images: this.newImages })
      .then(async () => {
        this.todo = await this.todoService.getTodo(this.todo.id);

        this.todo.deadline = new Date(this.todo.deadline);
        this.images = this.todo.images || [];

        this.isSended = true;
        this.newImages = [];
        this.imagesPreUpload = [];
        this.toast.success('', 'Updated');
      })
      .catch(err => {
        console.error(err);
        this.toast.error('Something went wrong', 'Error');
        this.isSended = true;
      });
  }

  openBrowser(event) {
    event.preventDefault();

    document.getElementById('fileInput').click();
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }

  showFull(image) {
    this.fullScreenImage = image;
    this.toggleFullScreen();
  }

  closeFullScreen() {
    this.fullScreenImage = '';
    this.toggleFullScreen();
  }

  prevImage() {
    const currentIndex = this.images.indexOf(this.fullScreenImage);
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;

    this.fullScreenImage = this.images[nextIndex];
  }

  nextImage() {
    const currentIndex = this.images.indexOf(this.fullScreenImage);
    const nextIndex = currentIndex < this.images.length - 1 ? currentIndex + 1 : currentIndex;

    this.fullScreenImage = this.images[nextIndex];
  }

  deleteImage(image) {
    const imgIndex = this.images.indexOf(image);

    this.images.splice(imgIndex, 1);
  }

  deleteNewImage(index) {
    this.newImages.splice(index, 1);

    this.preImagesView(this.newImages);
  }
}
