var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var pizzas = new List<Pizza>
{
    new Pizza(1, "Calabresa", "Calabresa, cebola e queijo", "Grande", 49.90m),
    new Pizza(2, "Frango com Catupiry", "Frango, catupiry e queijo", "Grande", 54.90m)
};

app.MapGet("/", () => "API da Pizzaria do Filipe");

app.MapGet("/api/pizzas", () =>
{
    return Results.Ok(pizzas);
});

app.MapGet("/api/pizzas/{id:int}", (int id) =>
{
    var pizzaEncontrada = pizzas.Find(pizza => pizza.id == id);

    if (pizzaEncontrada is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(pizzaEncontrada);
});

app.MapPost("/api/pizzas", (PizzaDTO dados) =>
{
    int proximoId = pizzas.Count + 1;

    var novaPizza = new Pizza(
        proximoId,
        dados.nome,
        dados.sabor,
        dados.tamanho,
        dados.preco
    );

    pizzas.Add(novaPizza);

    return Results.Created($"/api/pizzas/{novaPizza.id}", novaPizza);
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