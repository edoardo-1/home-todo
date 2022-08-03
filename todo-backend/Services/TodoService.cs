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
            try
            {
                Database.Todos.Add(todo);
                Database.SaveChanges();
            }
            catch (Exception ex)
            {   
                throw new Exception("Unable to save todo to database", ex.InnerException);
            }
        }
    }
}
