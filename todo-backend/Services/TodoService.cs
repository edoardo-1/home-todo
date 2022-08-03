using todo_backend.Database;
using todo_backend.Models;

namespace todo_backend.Services
{
    public class TodoService
    {
        private TodoDbContext context { get; set; }

        public TodoService(TodoDbContext databse) {
            context = databse;
        }
        
        public Todo[] GetAllTodos()
        {
            return context.Todos.ToArray();
        }

        public void AddNewTodo(Todo todo)
        {
            context.Todos.Add(todo);
            context.SaveChanges();
        }

        public void DeleteTodo(int todoId)
        {
            var todoToRemove = context.Todos.First(x => x.Id == todoId);
            context.Todos.Remove(todoToRemove);
            context.SaveChanges();
        }

        public void CompleteTodo(int todoId)
        {
            var todoToComplete = context.Todos.First(todo => todo.Id == todoId);
            todoToComplete.IsCompleted = !todoToComplete.IsCompleted;
            context.SaveChanges();
        }

        public void CompleteAllTodos()
        {
            var todosToUpdate = context.Todos.Select(x => x).Where(todo => todo.IsCompleted == false).ToList();
            foreach (var todo in todosToUpdate)
            {
                todo.IsCompleted = true;
            }
            context.SaveChanges();
        }
    }
}
