using Microsoft.EntityFrameworkCore;
using ApiPizzaria.Models;

namespace ApiPizzaria.Data;

// Contexto responsável pela comunicação com o banco SQLite
class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options)
        : base(options)
    {
    }

    public DbSet<PizzaEntity> Pizzas => Set<PizzaEntity>();
}