# Aula 14 — Tratamento de Erros e Exceções

**Disciplina:** Desenvolvimento Back-End  
**Projeto:** API da Pizzaria  
**Data:** 03/11/2026

## 1. Objetivo

Implementar um tratamento centralizado de exceções na API, evitando que detalhes internos do sistema sejam exibidos ao usuário quando ocorrer um erro inesperado.

## 2. Implementação

Foi utilizado o middleware `UseExceptionHandler`, posicionado logo após a criação da aplicação (`builder.Build()`).

Quando ocorre uma exceção não tratada, a API retorna:

- **Status HTTP:** 500 Internal Server Error
- **Content-Type:** application/json
- **Mensagem:** "Ocorreu um erro interno. Tente novamente mais tarde."

Assim, o usuário recebe uma mensagem genérica, sem visualizar detalhes técnicos da aplicação.

## 3. Testes realizados

Para validar o funcionamento, foi criada temporariamente a rota `GET /api/teste-erro`, que provocava uma exceção de propósito.

A aplicação foi executada no ambiente Production para verificar o comportamento do tratamento de erros.

| Teste | Resultado obtido |
|---|---|
| GET `/api/teste-erro` | 500 Internal Server Error |
| GET `/api/pizzas` | 200 OK |
| GET `/api/pizzas/99999` | 404 Not Found |

Após a validação, a rota temporária `/api/teste-erro` foi removida.

## 4. Resultado final

O middleware foi implementado e testado com sucesso. A API passou a retornar uma mensagem genérica para erros internos, mantendo os códigos de resposta adequados para as operações normais.

A atividade demonstrou a importância de tratar exceções e evitar a exposição de informações técnicas da aplicação ao usuário.