using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using todo_backend.Models;

namespace todo_backend.Database
{
    public class TodoDbContext : DbContext
    {
        public DbSet<Todo> Todos { get; set; }

        public TodoDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder){ }
    }
}
