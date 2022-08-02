import { Component} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from 'src/models/todo';
import { TodoService } from 'src/services/todo.service';

@Component({
  selector: 'app-todos-body',
  templateUrl: './todos-body.component.html',
  styleUrls: ['./todos-body.component.scss']
})
export class TodosBodyComponent {
  todos$ : BehaviorSubject<Todo[]>;

  constructor(public todoService : TodoService) {
    this.todos$ = todoService.todos$;
   }

  deleteTodo(todo : Todo) : void {
    this.todoService.deleteTodo(todo);
  }
}
