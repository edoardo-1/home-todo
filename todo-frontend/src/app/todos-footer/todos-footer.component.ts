import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDisplay } from 'src/models/toDisplay';
import { TodoService } from 'src/services/todo.service';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './todos-footer.component.html',
  styleUrls: ['./todos-footer.component.scss'],
})
export class TodosFooterComponent {
  ToDisplay = ToDisplay;
  $toDisplay: Observable<ToDisplay>;

  constructor(private todoService: TodoService) {
    this.$toDisplay = todoService.toDisplay$;
  }

  switchFilter(filter: ToDisplay): void {
    this.todoService.switchFilter(filter);
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
