import { Injectable } from '@angular/core';
import {strToTdl, tdlToString, TodoItem, TodoList} from './definitions';
import {BehaviorSubject} from 'rxjs';
import {List} from 'immutable';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private current: TodoList = {label: 'MIAG', items: List([]) };
  private subj = new BehaviorSubject<TodoList>(this.current);
  readonly observable = this.subj.asObservable();
  private previous: TodoList[] = [];
  private futures: TodoList[] = [];

  constructor() {
    this.managePersistency();
    this.manageUndoRedo();
  }

  getCurrentTodoList(): TodoList {
    return this.subj.getValue();
  }

  allIsChecked(): boolean {
    const tdl = this.subj.getValue();
    return tdl.items.find( item => !item.isDone ) === undefined;
  }

  append(...labels: string[]) {
    const L: TodoList = this.subj.getValue();
    this.subj.next( {...L, items: L.items.push( ...labels.map( label => ({label, isDone: false}) ) ) } );
  }

  remove(...items: TodoItem[]) {
    const L = this.subj.getValue();
    const NL = {...L, items: L.items.filter(item => items.indexOf(item) === -1 ) };
    this.subj.next( NL );
  }

  updateLabel(label: string, ...items: TodoItem[] ) {
    if (label !== '') {
      const L = this.subj.getValue();
      const NL = {...L, items: L.items.map(item => items.indexOf(item) >= 0 ? {...item, label} : item ) };
      this.subj.next( NL );
    } else {
      this.remove(...items);
    }
  }

  updateIsDone(isDone: boolean, ...items: TodoItem[]) {
    const L = this.subj.getValue();
    const NL = {...L, items: L.items.map(item => items.indexOf(item) >= 0 ? {...item, isDone} : item ) };
    this.subj.next( NL );
  }

  undo() {
    if (this.previous.length > 0) {
      this.subj.next( this.previous[this.previous.length - 1] );
    }
  }

  redo() {
    if (this.futures.length > 0) {
      this.subj.next( this.futures[this.futures.length - 1] );
    }
  }

  private managePersistency() {
    const str = localStorage.getItem('TDL_L3_MIAGE');
    if (str && str !== tdlToString(this.current) ) {
      this.subj.next( strToTdl(str) );
    }
  }

  private manageUndoRedo() {
    this.observable.subscribe( tdl => {
      if (tdl !== this.current) {
        localStorage.setItem('TDL_L3_MIAGE', tdlToString(tdl));
        // Undo-redo
        const indexInPrevious = this.previous.indexOf(tdl);
        if (indexInPrevious >= 0) { // Is it a previous version of the list ?
          const L = this.previous.splice(indexInPrevious, this.previous.length);
          this.futures.push(this.current, ...L.reverse());
          this.futures.pop(); // On enlève la liste courante
        } else {
          const indexInFutures = this.futures.indexOf(tdl);
          if (indexInFutures >= 0) { // Is it a future version of the list ?
            const L = this.futures.splice(indexInFutures, this.futures.length);
            this.previous.push(this.current, ...L.reverse());
            this.previous.pop();
          } else {
            // This is a new version
            if (this.futures.length) {
              const L = [...this.futures, this.current];
              const RL = [...L].reverse().map(TDL => ({...TDL}));
              RL.pop();
              this.previous.push(...RL, ...L);
            } else {
              this.previous.push(this.current);
            }
            this.futures = [];
          }
        }
        this.current = tdl;
      }
    } );
  }
}
