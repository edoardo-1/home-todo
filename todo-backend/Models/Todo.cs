using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todo_backend.Models
{
    public class Todo
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public bool IsCompleted { get; set; }

    }
}
