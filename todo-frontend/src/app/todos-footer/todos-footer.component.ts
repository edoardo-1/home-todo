import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from 'src/models/todo';
import { TodoService } from 'src/services/todo.service';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './todos-footer.component.html',
  styleUrls: ['./todos-footer.component.scss'],
})
export class TodosFooterComponent {
  todos$: BehaviorSubject<Todo[]>;
  allFilter: string = 'selected';
  uncompletedFilter: string = '';
  completedFilter: string = '';

  constructor(private todoService: TodoService) {
    this.todos$ = todoService.todos$;
  }

  getAllTodos(): void {
    this.allFilter = 'selected';
    this.completedFilter = '';
    this.uncompletedFilter = '';
    this.todoService.getAllTodos();
  }

  displayUncompletedTodos(): void {
    this.allFilter = '';
    this.completedFilter = '';
    this.uncompletedFilter = 'selected';
    this.todoService.displayUncompletedTodos();
  }

  displayCompletedTodos() {
    this.allFilter = '';
    this.completedFilter = 'selected';
    this.uncompletedFilter = '';
    this.todoService.displayCompletedTodos();
  }

  showTasksLeft(): string {
    let todosLength = this.todoService.countUncompletedTasks();
    switch (todosLength) {
      case 0:
        return `No tasks left`;
      case 1:
        return `${todosLength} task left`;
      default:
        return `${todosLength} tasks left`;
    }
  }
}
