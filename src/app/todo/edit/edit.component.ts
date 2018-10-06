import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../shared/class/todo';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
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

  update() {
    this.todoService.update(this.todo.id, { todo: this.todo, images: this.newImages })
      .then(() => this.toast.success('', 'Updated'))
      .catch(err => {
        console.error(err);
        this.toast.error('Something went wrong', 'Error');
      });
  }

  openBrowser(event) {
    event.preventDefault();

    document.getElementById('fileInput').click();
  }

  fileChange(images: File[]) {
    if (images.length > 0) {
      this.newImages = [...new Set([...this.newImages, ...images])];

      this.preImagesView(this.newImages);
    }
  }

  preImagesView(images) {
    Promise.all(images.map(this.getImageSrc))
      .then(img => {
        this.imagesPreUpload = img;
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
