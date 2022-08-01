import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosBodyComponent } from './todos-body.component';

describe('TodosBodyComponent', () => {
  let component: TodosBodyComponent;
  let fixture: ComponentFixture<TodosBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
