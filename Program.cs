
using ApiPizzaria.Data;
using ApiPizzaria.Models;
using Microsoft.EntityFrameworkCore;
using ApiPizzaria.Dtos;

var builder = WebApplication.CreateBuilder(args);

// Configuração do banco SQLite
builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

var app = builder.Build();

// Tratamento centralizado de exceções
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";

        await context.Response.WriteAsJsonAsync(new
        {
            mensagem = "Ocorreu um erro interno. Tente novamente mais tarde."
        });
    });
});

// Permite abrir a interface existente em wwwroot/
app.UseDefaultFiles();
app.UseStaticFiles();

// Página inicial alternativa da API
app.MapGet("/api", () => "API da Pizzaria do Filipe");

// GET - Listar todas as pizzas
app.MapGet("/api/pizzas", async (ApiDbContext db) =>
{
    var pizzas = await db.Pizzas.ToListAsync();

    return Results.Ok(pizzas);
});

// GET - Buscar pizza por ID
app.MapGet("/api/pizzas/{id:int}", async (int id, ApiDbContext db) =>
{
    var pizza = await db.Pizzas.FindAsync(id);

    if (pizza is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(pizza);
});

// POST - Cadastrar uma nova pizza
app.MapPost("/api/pizzas", async (PizzaEntrada entrada, ApiDbContext db) =>
{
    var pizza = new PizzaEntity
    {
        Nome = entrada.Nome,
        Sabor = entrada.Sabor,
        Tamanho = entrada.Tamanho,
        Preco = entrada.Preco
    };

    db.Pizzas.Add(pizza);

    await db.SaveChangesAsync();

    return Results.Created($"/api/pizzas/{pizza.Id}", pizza);
});

// PUT - Atualizar uma pizza existente
app.MapPut("/api/pizzas/{id:int}", async (
    int id,
    PizzaEntrada entrada,
    ApiDbContext db) =>
{
    var pizza = await db.Pizzas.FindAsync(id);

    if (pizza is null)
    {
        return Results.NotFound();
    }

    pizza.Nome = entrada.Nome;
    pizza.Sabor = entrada.Sabor;
    pizza.Tamanho = entrada.Tamanho;
    pizza.Preco = entrada.Preco;

    await db.SaveChangesAsync();

    return Results.Ok(pizza);
});

// DELETE - Excluir uma pizza
app.MapDelete("/api/pizzas/{id:int}", async (int id, ApiDbContext db) =>
{
    var pizza = await db.Pizzas.FindAsync(id);

    if (pizza is null)
    {
        return Results.NotFound();
    }

    db.Pizzas.Remove(pizza);

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();
