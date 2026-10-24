# API Pizzaria — AP1

Projeto desenvolvido para a disciplina de Desenvolvimento Back-End, utilizando C# e ASP.NET Core Minimal API com .NET 10.

O objetivo da AP1 foi desenvolver uma API REST para gerenciamento de pizzas, implementando as operações básicas de um CRUD.

## Tecnologias utilizadas

- C#
- ASP.NET Core Minimal API
- .NET 10
- Bruno para testes dos endpoints
- Git e GitHub para versionamento

## Funcionalidades

A API permite:

- Listar todas as pizzas cadastradas.
- Buscar uma pizza pelo ID.
- Cadastrar novas pizzas.
- Atualizar informações de uma pizza.
- Excluir pizzas existentes.

Nesta primeira versão, os registros são armazenados em uma lista em memória, sem utilização de banco de dados.

## Como executar

**Pré-requisito:** .NET SDK 10 instalado.

Na pasta raiz do projeto, execute:

```bash
dotnet restore
dotnet build
dotnet run --urls http://localhost:5050
```

A API estará disponível em:

http://localhost:5050/

Resposta esperada na rota inicial:

```text
API da Pizzaria do Filipe
```

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/pizzas | Lista todas as pizzas |
| GET | /api/pizzas/{id} | Busca uma pizza pelo ID |
| POST | /api/pizzas | Cadastra uma nova pizza |
| PUT | /api/pizzas/{id} | Atualiza uma pizza |
| DELETE | /api/pizzas/{id} | Remove uma pizza |

## Exemplo de cadastro

Requisição:

`POST /api/pizzas`

```json
{
  "nome": "Portuguesa",
  "sabor": "Presunto, queijo, ovo, cebola e azeitona",
  "tamanho": "Grande",
  "preco": 52.90
}
```

## Exemplo de atualização

Requisição:

`PUT /api/pizzas/3`

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

| Código | Significado |
|---|---|
| 200 OK | Consulta ou atualização realizada |
| 201 Created | Pizza cadastrada |
| 204 No Content | Pizza removida |
| 404 Not Found | Registro não encontrado |

## Armazenamento dos dados

Na AP1, as pizzas são armazenadas temporariamente em uma lista na memória da aplicação.

A API inicia com duas pizzas de exemplo:

- Calabresa
- Frango com Catupiry

Como ainda não existe integração com banco de dados, os cadastros e alterações realizados durante a execução são perdidos quando a aplicação é encerrada.

A implementação de persistência com Entity Framework Core e SQLite faz parte da evolução posterior do projeto.

## Testes com Bruno

Os endpoints foram testados utilizando o Bruno, verificando as operações de cadastro, consulta, atualização e exclusão.

A Collection utilizada nos testes está disponível na pasta `bruno/ApiPizzaria/`.

## Vídeo demonstrativo — AP1

Link da apresentação:

https://drive.google.com/file/d/1Awu9gGcRg298Bz1xAmD0SzMTV-gCJ7UQ/view?usp=drive_link

## Evolução do projeto

Este documento registra a primeira etapa do desenvolvimento da API Pizzaria (AP1).

Nas aulas seguintes, o projeto evoluiu para utilizar banco de dados SQLite, Entity Framework Core e uma interface web integrada, compondo a entrega da AP2.
