# API Pizzaria — Aula 09

## Integração com banco de dados utilizando Entity Framework Core

Continuação do projeto API Pizzaria, desenvolvido na disciplina de Desenvolvimento Back-End com ASP.NET Core e .NET 10.

Nesta etapa, o objetivo foi iniciar a integração da aplicação com um banco de dados relacional, utilizando **Entity Framework Core e SQLite**, por meio da abordagem Code First.

## Objetivo da aula

Preparar a estrutura necessária para substituir o armazenamento temporário em memória por um banco de dados persistente.

As principais atividades realizadas foram:

- Configuração do Entity Framework Core.
- Integração com o SQLite.
- Criação da entidade `PizzaEntity`.
- Criação do contexto `ApiDbContext`.
- Configuração da conexão com o banco.
- Criação e aplicação da primeira Migration.

## Tecnologias utilizadas

- C#
- ASP.NET Core Minimal API
- .NET 10
- Entity Framework Core
- SQLite
- EF Core CLI
- Git e GitHub

## Estrutura da entidade

A entidade `PizzaEntity` representa as pizzas que serão armazenadas no banco de dados.

| Propriedade | Descrição |
|---|---|
| Id | Identificador da pizza |
| Nome | Nome da pizza |
| Sabor | Descrição dos ingredientes |
| Tamanho | Tamanho da pizza |
| Preco | Preço da pizza |

## Configuração do banco

Foi utilizado o SQLite, com a conexão configurada no arquivo `appsettings.Development.json`.

O `ApiDbContext` é responsável por representar o contexto do banco e disponibilizar a coleção de pizzas por meio do `DbSet<PizzaEntity>`.

## Migration inicial

A primeira Migration recebeu o nome:

`BancoInicial`

Comando utilizado para criá-la:

```bash
dotnet ef migrations add BancoInicial
```

Após a criação, a estrutura foi aplicada ao banco utilizando:

```bash
dotnet ef database update
```

A execução criou a estrutura inicial do banco SQLite, incluindo a tabela de controle das Migrations do Entity Framework Core.

Os arquivos da Migration foram versionados no GitHub. Já o arquivo local do banco de dados foi mantido fora do versionamento por meio do `.gitignore`.

## Como executar o projeto

**Pré-requisito:** .NET SDK 10 e ferramenta `dotnet-ef` compatível.

Na pasta raiz do projeto, execute:

```bash
dotnet restore
dotnet build
dotnet ef database update
dotnet run --urls http://localhost:5050
```

## Resultado da Aula 09

Ao final desta etapa, a aplicação passou a contar com a estrutura inicial de persistência utilizando SQLite e Entity Framework Core.

O foco da aula foi preparar o banco de dados e aplicar a Migration inicial, sem implementar ainda todas as operações CRUD utilizando o contexto.

A adaptação dos endpoints para trabalhar diretamente com o banco foi realizada nas aulas seguintes.

## Evolução do projeto

- **AP1:** API REST com armazenamento em memória.
- **Aula 09:** Model, DbContext, SQLite e Migration inicial.
- **Aula 10:** Integração das operações de cadastro e listagem com o Entity Framework Core.
- **Aula 12 / AP2:** CRUD completo com persistência e interface web integrada.
