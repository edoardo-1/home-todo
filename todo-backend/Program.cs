using Microsoft.EntityFrameworkCore;
using todo_backend.Database;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200");
                      });
});
var config = builder.Services.BuildServiceProvider().GetService<IConfiguration>();
builder.Services.AddDbContext<TodoDbContext>(builder =>
    builder.UseSqlServer(config.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);
app.UseRouting();
app.MapControllers();
app.Run();