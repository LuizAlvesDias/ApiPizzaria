namespace ApiPizzaria.Models;

// Representa uma pizza armazenada no banco de dados
class PizzaEntity
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string Sabor { get; set; } = string.Empty;

    public string Tamanho { get; set; } = string.Empty;

    public decimal Preco { get; set; }
}