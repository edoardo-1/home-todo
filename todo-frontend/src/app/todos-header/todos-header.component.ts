import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/services/todo.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './todos-header.component.html',
  styleUrls: ['./todos-header.component.scss'],
})
export class TodosHeaderComponent {
  public addTodoBarText = '';

  constructor(private todoService: TodoService) {}

  addNewTodo(): void {
    this.todoService.addNewTodo(this.addTodoBarText);
    this.addTodoBarText = '';
  }

  completeAll() : void {
    this.todoService.completeAll();
  }
}
