import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/services/todo.service';

@Component({
  selector: 'app-todos-body',
  templateUrl: './todos-body.component.html',
  styleUrls: ['./todos-body.component.scss']
})
export class TodosBodyComponent implements OnInit {

  constructor(public todoService : TodoService) { }

  ngOnInit(): void {
  }

}
