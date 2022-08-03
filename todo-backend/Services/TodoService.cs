using todo_backend.Database;
using todo_backend.Models;

namespace todo_backend.Services
{
    public class TodoService
    {
        private TodoDbContext Database { get; set; }

        public TodoService(TodoDbContext databse) {
            Database = databse;
        }
        
        public Todo[] GetAllTodos()
        {
            return Database.Todos.ToArray();
        }

        public void AddNewTodo(Todo todo)
        {
            Database.Todos.Add(todo);
            Database.SaveChanges();
        }

        public void DeleteTodo(int todoId)
        {
            var todoToRemove = Database.Todos.FirstOrDefault(x => x.Id == todoId);
            Database.Todos.Remove(todoToRemove);
            Database.SaveChanges();
        }
    }
}
