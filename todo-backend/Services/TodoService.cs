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

        public void AddNewTodo(string content)
        {
            var todo = new Todo() { Content = content, IsCompleted = false};
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
            var todosToComplete = context.Todos.Where(todo => !todo.IsCompleted).ToList();
            todosToComplete.ForEach(todo => todo.IsCompleted = true);
            context.SaveChanges();
        }

        public void DeleteCompletedTodos()
        {
            var todosToDelete = context.Todos.Where(todo => todo.IsCompleted).ToList();
            todosToDelete.ForEach(todo => context.Todos.Remove(todo));
            context.SaveChanges();
        }
    }
}
