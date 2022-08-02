import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo';
import { TodoService } from 'src/services/todo.service';

@Component({
  selector: 'app-todos-body',
  templateUrl: './todos-body.component.html',
  styleUrls: ['./todos-body.component.scss']
})
export class TodosBodyComponent {

  constructor(public todoService : TodoService) { }

  deleteTodo(todo : Todo) : void {
    this.todoService.deleteTodo(todo);
  }
}
