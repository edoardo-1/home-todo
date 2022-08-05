using Microsoft.EntityFrameworkCore;
using todo_backend.Database;
using todo_backend.Services;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
var config = builder.Services.BuildServiceProvider().GetService<IConfiguration>();

builder.Services.AddScoped<TodoDbContext>();
builder.Services.AddScoped<TodoService>();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {

                          policy.WithOrigins("http://localhost:4200", "https://eucyon-todo-test.herokuapp.com");
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                      });
});
builder.Services.AddDbContext<TodoDbContext>(builder =>
    builder.UseSqlServer(config.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);
app.UseRouting();
app.MapControllers();
app.Run();