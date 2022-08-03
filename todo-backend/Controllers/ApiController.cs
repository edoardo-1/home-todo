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

        [HttpPost("todo")]
        public IActionResult AddNewTodo([FromBody] Todo todo)
        {
            try
            {
                TodoService.AddNewTodo(todo);
            }
            catch
            {
                return StatusCode(500, new { error = "Unable to save todo to database" });
            }
            return Ok();
        }

        [HttpDelete("todo/{id}")]
        public IActionResult DeleteTodo([FromRoute] int id)
        {
            try
            {
                TodoService.DeleteTodo(id);
            }
            catch
            {
                return StatusCode(500, new { error = "Unable to delete todo from database" });
            }
            return Ok();
        }
        
        [HttpPut("todo/complete/{id}")]
        public IActionResult CompleteTodo([FromRoute] int id)
        {
            try
            {
                TodoService.CompleteTodo(id);
            }
            catch
            {
                return StatusCode(500, new { error = "Unable to complete todo." });
            }
            return Ok();
        }

        [HttpPut("todos/complete")]
        public IActionResult CompleteAllTodos()
        {
            try
            {
                TodoService.CompleteAllTodos();
            }
            catch
            {
                return StatusCode(500, new { error = "Unable to complete all todos" });
            }
            return Ok();
        }

        [HttpDelete("todos/completed")]
        public IActionResult DeleteCompletedTodos()
        {
            try
            {
                TodoService.DeleteCompletedTodos();
            }
            catch
            {
                return StatusCode(500, new { error = "Unable to delete completed todos" });
            }
            return Ok();
        }
    }
}
