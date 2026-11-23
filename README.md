# API Pizzaria — AS (Avaliação Semestral)

Projeto desenvolvido para a disciplina de **Desenvolvimento Back-End**, dando continuidade às atividades AP1 e AP2.

A aplicação foi criada com ASP.NET Core Minimal API (.NET 10), Entity Framework Core e SQLite. Permite gerenciar pizzas por meio de uma API REST com CRUD completo e uma interface web integrada.

Na AS, o projeto foi reorganizado em pastas, separando Model, DTO e DbContext, sem alterar as rotas ou as funcionalidades existentes.

## Tecnologias utilizadas

- C# e ASP.NET Core Minimal API
- .NET 10
- Entity Framework Core
- SQLite
- HTML, CSS e JavaScript
- Bruno para testes dos endpoints
- Git e GitHub para versionamento

## Funcionalidades

- Listar todas as pizzas cadastradas.
- Consultar uma pizza pelo ID.
- Cadastrar novas pizzas.
- Atualizar pizzas existentes.
- Excluir pizzas.
- Armazenar os registros no banco SQLite.
- Gerenciar as pizzas diretamente pela interface web.
- Tratar erros internos com middleware centralizado.

## Como executar

**Pré-requisito:** .NET SDK 10 instalado.

Na pasta raiz do projeto, execute:

```bash
dotnet restore
dotnet build
dotnet ef database update
dotnet run
```

O comando `dotnet ef database update` aplica as migrations ao banco de dados.

Caso a ferramenta `dotnet-ef` ainda não esteja instalada, utilize:

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

A porta 5050 está configurada no arquivo `Properties/launchSettings.json`. A conexão SQLite utilizada no ambiente de desenvolvimento está definida no arquivo `appsettings.Development.json`.

## Organização do projeto

A estrutura principal do projeto está organizada da seguinte forma:

```text
ApiPizzaria/
├── Data/
│   └── ApiDbContext.cs
├── Dtos/
│   └── PizzaEntrada.cs
├── Models/
│   └── PizzaEntity.cs
├── Migrations/
├── Properties/
│   └── launchSettings.json
├── bruno/
│   └── ApiPizzaria/
├── wwwroot/
├── Program.cs
├── appsettings.json
├── appsettings.Development.json
└── README.md
```

**Responsabilidade de cada parte:**

- **Models/PizzaEntity.cs:** representa os dados da pizza armazenados no banco.
- **Dtos/PizzaEntrada.cs:** define os dados recebidos para cadastrar ou atualizar pizzas.
- **Data/ApiDbContext.cs:** realiza a integração com o SQLite por meio do Entity Framework Core.
- **Migrations/:** contém o histórico de criação e atualização da estrutura do banco.
- **Program.cs:** configura a aplicação, a conexão com o banco, o middleware e os endpoints.
- **wwwroot/:** contém a interface web.
- **bruno/ApiPizzaria/:** contém a coleção de testes da API.
- **Properties/launchSettings.json:** define as configurações de inicialização, incluindo a porta 5050.

As classes utilizam namespaces para organizar o código, como `ApiPizzaria.Models`, `ApiPizzaria.Dtos` e `ApiPizzaria.Data`.

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api` | Verifica se a API está funcionando |
| GET | `/api/pizzas` | Lista todas as pizzas |
| GET | `/api/pizzas/{id}` | Busca uma pizza pelo ID |
| POST | `/api/pizzas` | Cadastra uma pizza |
| PUT | `/api/pizzas/{id}` | Atualiza uma pizza |
| DELETE | `/api/pizzas/{id}` | Exclui uma pizza |

### Exemplo de cadastro

`POST /api/pizzas`

```json
{
  "nome": "Quatro Queijos",
  "sabor": "Mussarela, provolone, parmesão e gorgonzola",
  "tamanho": "Grande",
  "preco": 59.90
}
```

O ID é gerado automaticamente pelo banco de dados.

### Exemplo de atualização

`PUT /api/pizzas/9`

```json
{
  "nome": "Quatro Queijos Especial",
  "sabor": "Mussarela, provolone, parmesão e gorgonzola",
  "tamanho": "Família",
  "preco": 69.90
}
```

O ID utilizado deve corresponder a uma pizza existente.

## Respostas HTTP

- `200 OK`: consulta ou atualização realizada.
- `201 Created`: pizza cadastrada.
- `204 No Content`: pizza excluída.
- `404 Not Found`: registro não encontrado.
- `500 Internal Server Error`: erro interno tratado pelo middleware.

Em caso de erro interno, a API retorna uma mensagem genérica em JSON, sem expor detalhes técnicos da exceção.

## Banco de dados

A aplicação utiliza SQLite com Entity Framework Core.

A classe `ApiDbContext` representa o contexto do banco, enquanto `PizzaEntity` define os dados armazenados.

A estrutura do banco é gerenciada por migrations, incluindo a migração inicial `BancoInicial`.

Os registros permanecem salvos mesmo depois que a aplicação é encerrada e iniciada novamente.

Os IDs são gerados automaticamente e não precisam ser sequenciais após a exclusão de registros.

## Interface web

A interface está localizada na pasta `wwwroot/` e utiliza JavaScript com `fetch` para consumir os endpoints reais da API.

É possível listar, cadastrar, editar e excluir pizzas diretamente pelo navegador.

A interface também apresenta mensagens de carregamento, lista vazia, confirmação de exclusão e feedback das operações.

## Testes com Bruno

Os endpoints foram testados utilizando o Bruno.

A coleção está organizada na pasta `bruno/ApiPizzaria/`, com ambiente local e requisições para verificar as operações da API.

**Testes realizados durante a AS:**

| Teste | Resultado |
|---|---|
| GET — Listar pizzas | 200 OK |
| GET — Buscar pizza por ID | 200 OK |
| POST — Cadastrar pizza | 201 Created |
| PUT — Atualizar pizza | 200 OK |
| DELETE — Excluir pizza | 204 No Content |
| GET — Buscar pizza excluída | 404 Not Found |
| Reiniciar a API e consultar os dados | Persistência confirmada |

Durante os testes, foi cadastrada a pizza **Quatro Queijos**, posteriormente atualizada para **Quatro Queijos Especial**, com ID 9.

Após reiniciar a API, os dados permaneceram armazenados no SQLite, confirmando a persistência.

## Vídeo de demonstração — AS

**Link do vídeo:** https://drive.google.com/file/d/1f_X7RznK0HSpqMhXQ9maA2S1noJhMSm1/view?usp=sharing

O vídeo da Avaliação Semestral apresentará:

- A organização do projeto nas pastas `Models`, `Dtos` e `Data`.
- A utilização de namespaces e imports.
- A função do Model, DTO e DbContext.
- O funcionamento do `Program.cs`, das rotas e do middleware.
- A execução da API com `dotnet run`.
- Os testes de GET, POST, PUT e DELETE no Bruno.
- As respostas HTTP 200, 201, 204 e 404.
- A persistência dos dados após reiniciar a aplicação.
- A organização do README e da coleção Bruno.

O vídeo será gravado especificamente para a AS e disponibilizado por um link acessível sem solicitação de permissão.

## Vídeo demonstrativo — AP2

Link da apresentação anterior:

https://drive.google.com/file/d/1F-eSI0JlCEqMsxU7JjOu0t6inOYoCgFW/view?usp=sharing

O vídeo da AP2 demonstra o funcionamento da API, os testes no Bruno, a interface integrada e a persistência dos dados no SQLite.

Este vídeo é mantido como registro da etapa anterior do projeto.

## Repositório

O projeto foi desenvolvido para as atividades AP1, AP2 e AS da disciplina de Desenvolvimento Back-End.

**Repositório público:**

https://github.com/LuizAlvesDias/ApiPizzaria

**Branch utilizada na AS:** `api-pizzaria`

https://github.com/LuizAlvesDias/ApiPizzaria/tree/api-pizzaria

A AS dá continuidade ao mesmo projeto, mantendo as funcionalidades anteriores e melhorando a organização do código.
