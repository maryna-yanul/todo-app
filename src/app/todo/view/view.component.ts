import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../shared/class/todo';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  todo: Todo = {
    title: '',
    description: '',
    deadline: new Date,
    status: '',
    id: ''
  };

  images: string[] = []

  isFullScreen = false;
  fullScreenImage = '';

  statusCss = '';
  deadline = '';

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.todoService.getTodo(id)
      .then(todo => {
        this.todo = todo;
        this.todo.deadline = new Date(this.todo.deadline)
        // TODO: use directive
        this.statusCss = this.todo.status
        this.todo.status = this.todo.status.replace(/_/g, ' ')
        this.images = this.todo.images || []
        this.deadline = moment(this.todo.deadline).format('DD MMM YYYY')
      });
  }

  ngOnInit() {
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen
  }

  showFull(image) {
    this.fullScreenImage = image
    this.toggleFullScreen()
  }

  closeFullScreen() {
    this.fullScreenImage = ''
    this.toggleFullScreen()
  }

  prevImage() {
    const currentIndex = this.images.indexOf(this.fullScreenImage)
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0

    this.fullScreenImage = this.images[nextIndex]
  }

  nextImage() {
    const currentIndex = this.images.indexOf(this.fullScreenImage)
    const nextIndex = currentIndex < this.images.length - 1 ? currentIndex + 1 : currentIndex

    this.fullScreenImage = this.images[nextIndex]
  }
}
