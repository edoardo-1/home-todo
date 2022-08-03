import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todo } from 'src/models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private url: string = 'https://localhost:3000';

  constructor(private httpClient: HttpClient) {
    const _this = this;
    this.getTodosFromApi().subscribe({
      next(data) {
        _this.todos$.next(data);
      },
      error(err) {
        throw new HttpErrorResponse(err);
      },
    });
  }

  private getTodosFromApi(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.url + '/api/todos');
  }

  getAllTodos(): void {
    this.getTodosFromApi().subscribe((data) => this.todos$.next(data));
  }

  displayUncompletedTodos(): void {
    this.getAllTodos();
    let updatedTodos = this.todos$
      .getValue()
      .filter((todo) => !todo.isCompleted);
    this.todos$.next(updatedTodos);
  }

  displayCompletedTodos(): void {
    this.getAllTodos();
    let updatedTodos = this.todos$
      .getValue()
      .filter((todo) => todo.isCompleted);
    this.todos$.next(updatedTodos);
  }

  addNewTodo(newContent: string): void {
    let newId: number = ~~(Math.random() * 100000);
    let newTodo: Todo = { id: newId, content: newContent, isCompleted: false };
    this.httpClient.post(this.url + '/api/todo', newTodo).subscribe({
      error(err) {
        throw new HttpErrorResponse(err);
      },
    });
    this.todos$.next([...this.todos$.getValue(), newTodo]);
  }

  completeAll(): void {
    let updatedTodos: Todo[] = this.todos$.getValue().map((todo) => {
      return { ...todo, isCompleted: true };
    });
    this.httpClient.put(this.url + '/api/todos/complete', null).subscribe({
      error(err) {
        throw new HttpErrorResponse(err);
      },
    });
    this.todos$.next(updatedTodos);
  }

  clearCompleted(): void {
    let updatedTodos: Todo[] = this.todos$
      .getValue()
      .filter((todo) => !todo.isCompleted);
    this.httpClient.delete(this.url + '/api/todos/completed').subscribe({
      error(err) {
        throw new HttpErrorResponse(err);
      },
    });
    this.todos$.next(updatedTodos);
  }

  deleteTodo(todoToDelete: Todo): void {
    let updatedTodos: Todo[] = this.todos$
      .getValue()
      .filter((todo) => todo !== todoToDelete);
    this.httpClient
      .delete(this.url + '/api/todo/' + todoToDelete.id)
      .subscribe({
        error(err) {
          throw new Error(err.message);
        },
      });
    this.todos$.next(updatedTodos);
  }

  countUncompletedTasks(): number {
    return (
      this.todos$.getValue().filter((task) => !task.isCompleted).length || 0
    );
  }

  private switchCompleted(todo: Todo): void {
    todo.isCompleted = !todo.isCompleted;
  }

  completeTodo(todoToComplete: Todo): void {
    this.todos$
      .getValue()
      .map((todo) =>
        todo === todoToComplete ? this.switchCompleted(todo) : todo
      );
    this.httpClient
      .put(this.url + '/api/todo/complete/' + todoToComplete.id, null)
      .subscribe({
        error(err) {
          throw new Error(err.message);
        },
      });
  }
}
