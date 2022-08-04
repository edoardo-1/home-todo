import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, combineLatest, filter, Observable, of, map } from 'rxjs';
import { Todo } from 'src/models/todo';
import { ToDisplay } from 'src/models/toDisplay';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl: string = 'https://localhost:3000';
  private allTodos$ = new BehaviorSubject<Todo[]>([]);
  public filteredTodos$ = new Observable<Todo[]>;
  public toDisplay$ = new BehaviorSubject<ToDisplay>(ToDisplay.all);

  constructor(private httpClient: HttpClient) {
    this.updateAllTodos();
    console.warn('hello from construcotr');
    this.filteredTodos$ = combineLatest(
      this.allTodos$,
      this.toDisplay$
    ).pipe(
      map(([todos, filter]: [Todo[], ToDisplay]) => {
        if (filter === ToDisplay.uncompleted) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === ToDisplay.completed) {
          return todos.filter(todo => todo.isCompleted)
        }
        return todos;
      })
    )
  }

  private getTodosFromApi(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.apiUrl + '/api/todos');
  }

  private updateAllTodos(): void {
    let _this = this;
    this.getTodosFromApi().subscribe({
      next(data) {
        _this.allTodos$.next(data);
      },
      error(err) {
        throw new HttpErrorResponse(err);
      },
    });
  }

  switchFilter(filter : ToDisplay) : void {
    this.toDisplay$.next(filter);
  }

  //refactor later without id
  addNewTodo(newContent: string): void {
    let newId: number = ~~(Math.random() * 100000);
    let newTodo: Todo = { id: newId, content: newContent, isCompleted: false };
    let _this = this;
    this.httpClient.post(this.apiUrl + '/api/todo', newTodo).subscribe({
      next() {
        _this.updateAllTodos();
      },
      error(err) {
        throw new HttpErrorResponse(err);
      },
    });
  }

  completeAll(): void {
    let _this = this;
    this.httpClient.put(this.apiUrl + '/api/todos/complete', null).subscribe({
      next() {
        _this.updateAllTodos();
      },
      error(err) {
        throw new HttpErrorResponse(err);
      },
    });
  }

  clearCompleted(): void {
    let _this = this;
    this.httpClient.delete(this.apiUrl + '/api/todos/completed').subscribe({
      next() {
        _this.updateAllTodos();
      },
      error(err) {
        throw new HttpErrorResponse(err);
      },
    });
  }

  deleteTodo(todoToDelete: Todo): void {
    let _this = this;
    this.httpClient
      .delete(this.apiUrl + '/api/todo/' + todoToDelete.id)
      .subscribe({
        next() {
          _this.updateAllTodos();
        },
        error(err) {
          throw new HttpErrorResponse(err);
        },
      });
  }

  countUncompletedTasks(): number {
    return (
      this.allTodos$.getValue().filter((task) => !task.isCompleted).length || 0
    );
  }

  completeTodo(todoToComplete: Todo): void {
    let _this = this;
    this.httpClient
      .put(this.apiUrl + '/api/todo/complete/' + todoToComplete.id, null)
      .subscribe({
        next() {
          _this.updateAllTodos();
        },
        error(err) {
          throw new Error(err.message);
        },
      });
  }
}
