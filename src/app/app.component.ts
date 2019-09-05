import { Component } from '@angular/core';
import {TodoService} from './todo.service';
import {TodoItem, TodoList} from './definitions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private tds: TodoService) {
  }

  get todoListObs(): Observable<TodoList> {
    return this.tds.observable;
  }

  append(label: string) {
    this.tds.append(label);
  }

  remove(item: TodoItem) {
    this.tds.remove(item);
  }

  updateLabel(item: TodoItem, label: string) {
    this.tds.updateLabel(label, item);
  }

  updateIsDone(item: TodoItem, isDone: boolean) {
    this.tds.updateIsDone(isDone, item);
  }

}
