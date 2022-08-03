using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace todo_backend.Controllers
{
    [Route("api")]
    public class ApiController : ControllerBase
    {
        [HttpGet("getTodos")]
        public IActionResult GetTodos()
        {
            var todos = new object[] { new { id = 1, content = "todo 1", isCompleted = false } };
            return Ok(todos);
        }
    }
}
