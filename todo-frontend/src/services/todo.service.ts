import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, combineLatest, filter, Observable, of, map, tap } from 'rxjs';
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
    this.filteredTodos$ = 
    combineLatest([this.allTodos$,this.toDisplay$])
    .pipe(
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

  private updateAllTodos() : void {
    this.httpClient.get<Todo[]>(this.apiUrl + '/api/todos')
    .pipe(
      tap(response => {
        this.allTodos$.next(response);
    }))
    .subscribe();
  }

  switchFilter(filter : ToDisplay) : void {
    this.toDisplay$.next(filter);
  }

  addNewTodo(content: string): void {
    this.httpClient.post(this.apiUrl + '/api/todo', { content })
    .pipe(tap(() => {this.updateAllTodos()}))
    .subscribe();
  }

  completeAll(): void {
    this.httpClient.put(this.apiUrl + '/api/todos/complete', null)
    .pipe(tap(() => {this.updateAllTodos()}))
    .subscribe();
  }

  clearCompleted(): void {
    this.httpClient.delete(this.apiUrl + '/api/todos/completed')
    .pipe(tap(() => {this.updateAllTodos()}))
    .subscribe();
  }

  deleteTodo(todoToDelete: Todo): void {
    this.httpClient
      .delete(this.apiUrl + '/api/todo/' + todoToDelete.id)
      .pipe(tap(() => {this.updateAllTodos()}))
      .subscribe();
  }

  completeTodo(todoToComplete: Todo): void {
    this.httpClient
      .put(this.apiUrl + '/api/todo/complete/' + todoToComplete.id, null)
      .pipe(tap(() => {this.updateAllTodos()}))
      .subscribe();
  }

  countUncompletedTasks(): number {
    return (
      this.allTodos$.getValue().filter((task) => !task.isCompleted).length || 0
    );
  }
}
