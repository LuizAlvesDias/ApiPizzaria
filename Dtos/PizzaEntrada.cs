namespace ApiPizzaria.Dtos;

// Dados recebidos para cadastrar ou atualizar uma pizza
public record PizzaEntrada(
    string Nome,
    string Sabor,
    string Tamanho,
    decimal Preco
);