import { Component, OnInit } from '@angular/core';
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

  constructor(private todoService: TodoService) {
    this.todos$ = todoService.todos$;
  }

  showTasksLeft() : string {
    let todosLength =  this.todoService.countUncompletedTasks();
    switch (todosLength) {
      case 0:
        return `No tasks left`
      case 1:
        return `${todosLength} task left`;
      default:
        return `${todosLength} tasks left`;
    }
  }
}
