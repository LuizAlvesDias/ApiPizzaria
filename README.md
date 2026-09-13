# API Pizzaria

API REST minimalista para gerenciamento de pizzas, desenvolvida com ASP.NET Core e .NET 10.

## Requisitos

- .NET SDK 10.0 ou superior

## Como executar

Na raiz do projeto, execute:

```bash
dotnet build
dotnet run --urls http://localhost:5050

A API estará disponível em:

http://localhost:5050

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
Cadastrar pizza
POST /api/pizzas
{
  "nome": "Portuguesa",
  "sabor": "Presunto, queijo, ovo, cebola e azeitona",
  "tamanho": "Grande",
  "preco": 52.90
}
Atualizar pizza
PUT /api/pizzas/3
{
  "nome": "Portuguesa Especial",
  "sabor": "Presunto, queijo, ovo, cebola, azeitona e bacon",
  "tamanho": "Grande",
  "preco": 59.90
}
Observações
A aplicação inicia com duas pizzas cadastradas.
Os dados ficam armazenados somente em memória.
Os dados são perdidos quando a aplicação é encerrada.
Operações para um ID inexistente retornam HTTP 404 Not Found.
O cadastro retorna HTTP 201 Created.
A atualização retorna HTTP 200 OK.
A remoção bem-sucedida retorna HTTP 204 No Content.
Testes

Os testes da API foram realizados utilizando o Bruno.

A Collection contém os testes dos endpoints de cadastro, consulta, atualização e remoção.

Vídeo

Link do vídeo da apresentação:

COLOCAR LINK DO VÍDEO AQUI