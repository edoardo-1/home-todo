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
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            return Ok();
        }
    }
}
