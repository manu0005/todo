import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import {Observable} from 'rxjs';
import {TodoItem, TodoList} from '../definitions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  filter = FilterAllItems;
  get isFilterAll(): boolean {
    return this.filter === FilterAllItems;
  }
  get isFilterUndone(): boolean {
    return this.filter === FilterUndoneItems;
  }
  get isFilterDone(): boolean {
    return this.filter === FilterDoneItems;
  }

  constructor(private tds: TodoService) { }

  ngOnInit() {
  }

  append(label: string) {
    if (label) {
      this.tds.append(label);
    }
  }

  get todolistObs(): Observable<TodoList> {
    return this.tds.observable;
  }

  get allIsChecked(): boolean {
    return this.tds.allIsChecked();
  }

  toggleAllItems() {
    const isDone = !this.allIsChecked;
    this.tds.updateIsDone(isDone, ...this.tds.getCurrentTodoList().items);
  }

  filterAll() {
    this.filter = FilterAllItems;
  }
  filterUndone() {
    this.filter = FilterUndoneItems;
  }
  filterDone() {
    this.filter = FilterDoneItems;
  }

  get nbItemsRemaining(): number {
    return this.allItems.filter(item => !item.isDone).size;
  }

  deleteItemsDone() {
    const itemsToDelete = this.allItems.filter(FilterDoneItems);
    this.tds.remove(...itemsToDelete);
  }

  get displayDelete() {
    return this.allItems.findIndex(item => item.isDone) >= 0;
  }

  private get allItems() {
    return this.tds.getCurrentTodoList().items;
  }
}

type FctFilterItems = (item: TodoItem) => boolean;
const FilterAllItems: FctFilterItems = item => true;
const FilterDoneItems: FctFilterItems = item => item.isDone;
const FilterUndoneItems: FctFilterItems = item => !item.isDone;
