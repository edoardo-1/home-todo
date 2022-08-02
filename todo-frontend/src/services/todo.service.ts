import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todo } from 'src/models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private httpClient: HttpClient) {
    this.getTodos.subscribe((data) => this.todos$.next(data));
  }

  //refactor later to get data from api
  public getTodos: Observable<Todo[]> = of([
    {
      id: 2,
      content: 'todo1',
      isCompleted: false,
    },
    {
      id: 3,
      content: 'todo1',
      isCompleted: true,
    },
  ]);

  addNewTodo(newContent: string): void {
    let newId: number = ~~(Math.random() * 100000);
    this.todos$.next([
      ...this.todos$.getValue(),
      { id: newId, content: newContent, isCompleted: false },
    ]);
  }

  completeAll(): void {
    let updatedTodos: Todo[] = this.todos$.getValue().map((todo) => {
      return { ...todo, isCompleted: true };
    });
    this.todos$.next(updatedTodos);
  }

  clearCompleted(): void {
    let updatedTodos: Todo[] = this.todos$
      .getValue()
      .filter((todo) => !todo.isCompleted);
    this.todos$.next(updatedTodos);
  }

  deleteTodo(todoToDelete: Todo): void {
    let updatedTodos: Todo[] = this.todos$
      .getValue()
      .filter((todo) => todo !== todoToDelete);
    this.todos$.next(updatedTodos);
  }
}
