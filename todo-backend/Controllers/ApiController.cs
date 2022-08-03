using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_backend.Models;
using todo_backend.Services;

namespace todo_backend.Controllers
{
    [Route("api")]
    public class ApiController : ControllerBase
    {
        public TodoService TodoService { get;}

        public ApiController(TodoService todoService)
        {
            TodoService = todoService;
        }

        [HttpGet("todos")]
        public IActionResult GetTodos()
        {
            var todos = TodoService.GetAllTodos();
            return Ok(todos);
        }

        [HttpPost("todos")]
        public IActionResult AddNewTodo([FromBody] Todo todo)
        {
            try
            {
                TodoService.AddNewTodo(todo);
            }
            catch
            {
                return StatusCode(500, "Unable to save todo to database");
            }
            return Ok();
        }

        [HttpDelete("todos/{id}")]
        public IActionResult DeleteTodo([FromRoute] int id)
        {
            try
            {
                TodoService.DeleteTodo(id);
            }
            catch
            {
                return StatusCode(500, "Unable to delete todo from database");
            }
            return Ok();
        }
    }
}
