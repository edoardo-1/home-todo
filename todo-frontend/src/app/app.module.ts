import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodosBodyComponent } from './todos-body/todos-body.component';
import { TodosHeaderComponent } from './todos-header/todos-header.component';
import { TodosFooterComponent } from './todos-footer/todos-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodosBodyComponent,
    TodosHeaderComponent,
    TodosFooterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
