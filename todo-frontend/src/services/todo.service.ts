import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todo } from 'src/models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos$ = new BehaviorSubject({});

  constructor(private httpClient: HttpClient) {
    this.todos$.next(this.getTodos);
  }

  //refactor later to get data from api
  public getTodos: Observable<Todo> = of({
    id: 2,
    content: 'todo1',
    isCompleted: false,
  });
}
