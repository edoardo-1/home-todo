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
    const _this = this;
    this.getTodos().subscribe({
      next(data) {
        _this.todos$.next(data);
      },
      error() {
        throw new Error('Unable to get data from api !!!');
      },
    });
  }

  //refactor later to get data from api
  // public getTodos: Observable<Todo[]> = of([
  //   {
  //     id: 2,
  //     content: 'todo1',
  //     isCompleted: false,
  //   },
  //   {
  //     id: 3,
  //     content: 'todo1',
  //     isCompleted: true,
  //   },
  // ]);

  private getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('https://localhost:3000/api/getTodos');
  }

  getAllTodos(): void {
    this.getTodos().subscribe((data) => this.todos$.next(data));
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
  }
}
