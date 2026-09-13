# API Pizzaria

API REST minimalista para gerenciamento de pizzas, desenvolvida com ASP.NET Core e .NET 10.

## Requisitos

- .NET SDK 10.0 ou superior

## Como executar

Na raiz do projeto, execute:

```text
dotnet run --urls http://localhost:5050

A API estará disponível em:

HTTP: http://localhost:5050

Para verificar se a API está funcionando:

GET http://localhost:5050/

Resposta esperada:

API da Pizzaria do Filipe
Endpoints
Método	Rota	Descrição
GET	/api/pizzas	Lista todas as pizzas
GET	/api/pizzas/{id}	Busca uma pizza pelo ID
POST	/api/pizzas	Cadastra uma nova pizza
PUT	/api/pizzas/{id}	Atualiza uma pizza existente
DELETE	/api/pizzas/{id}	Remove uma pizza
Listar pizzas
GET /api/pizzas
Buscar pizza por ID
GET /api/pizzas/1
Cadastrar pizza
POST /api/pizzas
Content-Type: application/json

{
  "nome": "Portuguesa",
  "sabor": "Presunto, queijo, ovo, cebola e azeitona",
  "tamanho": "Grande",
  "preco": 52.90
}
Atualizar pizza
PUT /api/pizzas/3
Content-Type: application/json

{
  "nome": "Portuguesa Especial",
  "sabor": "Presunto, queijo, ovo, cebola, azeitona e bacon",
  "tamanho": "Grande",
  "preco": 59.90
}
Remover pizza
DELETE /api/pizzas/3
Observações
A aplicação inicia com as pizzas Calabresa e Frango com Catupiry.
Os dados ficam armazenados somente em memória e são perdidos ao reiniciar a aplicação.
Operações para um ID inexistente retornam HTTP 404 Not Found.
O cadastro retorna HTTP 201 Created.
A atualização retorna HTTP 200 OK.
A remoção bem-sucedida retorna HTTP 204 No Content.
Os testes da API foram realizados utilizando o Bruno.
