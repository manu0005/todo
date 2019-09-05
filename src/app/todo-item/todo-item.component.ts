import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TodoItem} from '../definitions';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoItem;
  @ViewChild('newTextInput', {static: true}) newTextInput: ElementRef<HTMLInputElement>;
  private pisEditing = false;

  get isEditing() {
    return this.pisEditing;
  }
  set isEditing(isEditing: boolean) {
    this.pisEditing = isEditing;
    if (isEditing) {
      requestAnimationFrame(() => this.newTextInput.nativeElement.focus());
    }
  }

  get label(): string {
    return this.item.label;
  }

  constructor(private tds: TodoService) { }

  ngOnInit() {
  }

  destroy() {
    this.tds.remove(this.item);
  }

  updateIsDone(isDone: boolean) {
    this.tds.updateIsDone(isDone, this.item);
  }

  updateLabel(label: string) {
    if (this.isEditing) {
      this.isEditing = false;
      this.tds.updateLabel(label, this.item);
    }
  }
}
