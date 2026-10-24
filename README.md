# API Pizzaria — AP2

Projeto desenvolvido para a disciplina de Desenvolvimento Back-End, utilizando ASP.NET Core (.NET 10), Entity Framework Core e SQLite.

A aplicação permite gerenciar pizzas por meio de uma API REST com CRUD completo e uma interface web integrada.

## Tecnologias utilizadas

- C# e ASP.NET Core Minimal API
- .NET 10
- Entity Framework Core
- SQLite
- HTML, CSS e JavaScript
- Bruno para testes dos endpoints

## Funcionalidades

- Listar todas as pizzas cadastradas.
- Consultar uma pizza pelo ID.
- Cadastrar novas pizzas.
- Atualizar pizzas existentes.
- Excluir pizzas.
- Armazenar os registros no banco SQLite.
- Gerenciar as pizzas diretamente pela interface web.

## Como executar

**Pré-requisito:** .NET SDK 10 instalado.

Na pasta raiz do projeto, execute:

```bash
dotnet restore
dotnet build
dotnet ef database update
dotnet run --urls http://localhost:5050
```

O comando de atualização do banco requer a ferramenta `dotnet-ef` instalada. Caso necessário:

```bash
dotnet tool install --global dotnet-ef --version 10.0.12
```

A aplicação estará disponível em:

http://localhost:5050/

A página inicial apresenta a interface de gerenciamento de pizzas, conectada diretamente à API.

Para verificar se o backend está funcionando, acesse:

```http
GET http://localhost:5050/api
```

Resposta esperada:

```text
API da Pizzaria do Filipe
```

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/pizzas | Lista todas as pizzas |
| GET | /api/pizzas/{id} | Busca uma pizza pelo ID |
| POST | /api/pizzas | Cadastra uma pizza |
| PUT | /api/pizzas/{id} | Atualiza uma pizza |
| DELETE | /api/pizzas/{id} | Exclui uma pizza |

### Exemplo de cadastro

`POST /api/pizzas`

```json
{
  "nome": "Portuguesa",
  "sabor": "Presunto, queijo, ovo, cebola e azeitona",
  "tamanho": "Grande",
  "preco": 52.90
}
```

### Exemplo de atualização

`PUT /api/pizzas/1`

```json
{
  "nome": "Portuguesa Especial",
  "sabor": "Presunto, queijo, ovo, cebola, azeitona e bacon",
  "tamanho": "Grande",
  "preco": 59.90
}
```

O ID utilizado deve corresponder a uma pizza existente.

## Respostas HTTP

- `200 OK`: consulta ou atualização realizada.
- `201 Created`: pizza cadastrada.
- `204 No Content`: pizza excluída.
- `404 Not Found`: registro não encontrado.

## Banco de dados

A aplicação utiliza SQLite com Entity Framework Core.

Os dados são persistidos no banco e não são perdidos ao encerrar a aplicação. A estrutura do banco é gerenciada por migrations.

Os IDs são gerados automaticamente e não precisam ser sequenciais após a exclusão de registros.

## Interface web

A interface está localizada na pasta `wwwroot/` e utiliza JavaScript com `fetch` para consumir os endpoints reais da API.

É possível listar, cadastrar, editar e excluir pizzas diretamente pelo navegador.

A interface também apresenta mensagens de carregamento, lista vazia, confirmação de exclusão e feedback das operações.

## Testes com Bruno

Os endpoints foram testados utilizando o Bruno, incluindo as operações GET, POST, PUT e DELETE.

A Collection está organizada na pasta `bruno/ApiPizzaria/`, com ambiente local e requisições para verificar as operações da API.

## Vídeo demonstrativo — AP2

Link da apresentação:

**[INSERIR LINK PÚBLICO DO VÍDEO AQUI]**

O vídeo demonstra o funcionamento da API, os testes no Bruno, a interface integrada e a persistência dos dados no SQLite.

## Repositório

Projeto desenvolvido para as atividades AP1 e AP2 da disciplina de Desenvolvimento Back-End.

A versão correspondente à AP2 está disponível na branch `aula-12-ap2`.
