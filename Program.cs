using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

var app = builder.Build();

var pizzas = new List<Pizza>
{
    new Pizza(1, "Calabresa", "Calabresa, cebola e queijo", "Grande", 49.90m),
    new Pizza(2, "Frango com Catupiry", "Frango, catupiry e queijo", "Grande", 54.90m)
};

app.MapGet("/", () => "API da Pizzaria do Filipe");

app.MapGet("/api/pizzas", async (ApiDbContext db) =>
    await db.Pizzas.ToListAsync());

app.MapGet("/api/pizzas/{id:int}", (int id) =>
{
    var pizzaEncontrada = pizzas.Find(pizza => pizza.id == id);

    if (pizzaEncontrada is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(pizzaEncontrada);
});

app.MapPost("/api/pizzas", async (PizzaEntity pizza, ApiDbContext db) =>
{
    db.Pizzas.Add(pizza);

    await db.SaveChangesAsync();

    return Results.Created($"/api/pizzas/{pizza.Id}", pizza);
});

app.MapPut("/api/pizzas/{id:int}", (int id, PizzaAtualizadaDTO dados) =>
{
    int indice = pizzas.FindIndex(pizzaDaLista => pizzaDaLista.id == id);

    if (indice == -1)
    {
        return Results.NotFound();
    }

    var atualizada = new Pizza(
        id,
        dados.nome,
        dados.sabor,
        dados.tamanho,
        dados.preco
    );

    pizzas[indice] = atualizada;

    return Results.Ok(atualizada);
});

app.MapDelete("/api/pizzas/{id:int}", (int id) =>
{
    int indice = pizzas.FindIndex(pizzaDaLista => pizzaDaLista.id == id);

    if (indice == -1)
    {
        return Results.NotFound();
    }

    pizzas.RemoveAt(indice);

    return Results.NoContent();
});

app.Run();

record Pizza(
    int id,
    string nome,
    string sabor,
    string tamanho,
    decimal preco
);

record PizzaDTO(
    string nome,
    string sabor,
    string tamanho,
    decimal preco
);

record PizzaAtualizadaDTO(
    string nome,
    string sabor,
    string tamanho,
    decimal preco
);

class PizzaEntity
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Sabor { get; set; } = string.Empty;
    public string Tamanho { get; set; } = string.Empty;
    public decimal Preco { get; set; }
}

class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options)
        : base(options)
    {
    }

    public DbSet<PizzaEntity> Pizzas => Set<PizzaEntity>();
}