/**
 * ============================================================================
 * Gerenciamento de Pizzas - Integração com API REST
 * Tecnologia: JavaScript Puro (Vanilla JS, sem bibliotecas externas)
 * 
 * Endpoints integrados:
 * - GET    /api/pizzas        -> Listar todas as pizzas
 * - GET    /api/pizzas/{id}   -> Buscar pizza por ID
 * - POST   /api/pizzas        -> Cadastrar nova pizza
 * - PUT    /api/pizzas/{id}   -> Atualizar pizza existente
 * - DELETE /api/pizzas/{id}   -> Excluir pizza
 * ============================================================================
 */

'use strict';

// 1. Constante de Rota da API
const API_URL = '/api/pizzas';

// 2. Referências aos elementos do DOM
const formPizza = document.getElementById('form-pizza');
const inputId = document.getElementById('input-id');
const inputNome = document.getElementById('input-nome');
const inputSabor = document.getElementById('input-sabor');
const selectTamanho = document.getElementById('select-tamanho');
const inputPreco = document.getElementById('input-preco');

const erroNome = document.getElementById('erro-nome');
const erroSabor = document.getElementById('erro-sabor');
const erroTamanho = document.getElementById('erro-tamanho');
const erroPreco = document.getElementById('erro-preco');

const formHeading = document.getElementById('form-heading');
const badgeModo = document.getElementById('badge-modo');
const btnSubmit = document.getElementById('btn-submit');
const btnCancelar = document.getElementById('btn-cancelar');
const btnReset = document.getElementById('btn-reset');

const tabelaPizzas = document.getElementById('tabela-pizzas');
const corpoTabela = document.getElementById('lista-pizzas-corpo');
const msgCarregando = document.getElementById('msg-carregando');
const msgVazia = document.getElementById('msg-vazia');
const contadorPizzas = document.getElementById('contador-pizzas');
const feedbackBox = document.getElementById('feedback-mensagem');

let timeoutFeedback = null;

// 3. Utilitários
function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function exibirFeedback(mensagem, tipo = 'sucesso') {
  if (timeoutFeedback) {
    clearTimeout(timeoutFeedback);
  }

  feedbackBox.textContent = mensagem;
  feedbackBox.className = `feedback-box ${tipo === 'sucesso' ? 'feedback-sucesso' : 'feedback-erro'}`;
  feedbackBox.style.display = 'block';

  timeoutFeedback = setTimeout(() => {
    feedbackBox.style.display = 'none';
    feedbackBox.textContent = '';
  }, 5000);
}

function limparErros() {
  erroNome.textContent = '';
  erroSabor.textContent = '';
  erroTamanho.textContent = '';
  erroPreco.textContent = '';

  inputNome.classList.remove('input-invalid');
  inputSabor.classList.remove('input-invalid');
  selectTamanho.classList.remove('input-invalid');
  inputPreco.classList.remove('input-invalid');
}

function redefinirModoFormulario() {
  inputId.value = '';
  formPizza.reset();
  limparErros();

  formHeading.textContent = 'Cadastrar Nova Pizza';
  badgeModo.textContent = 'API';
  badgeModo.classList.remove('modo-edicao');
  btnSubmit.textContent = 'Cadastrar Pizza';
  btnCancelar.style.display = 'none';
}

function ativarModoEdicao(pizza) {
  inputId.value = String(pizza.id);
  inputNome.value = pizza.nome;
  inputSabor.value = pizza.sabor;
  selectTamanho.value = pizza.tamanho;
  inputPreco.value = pizza.preco;

  limparErros();

  formHeading.textContent = `Editar Pizza #${pizza.id}`;
  badgeModo.textContent = 'Edição';
  badgeModo.classList.add('modo-edicao');
  btnSubmit.textContent = 'Atualizar Pizza';
  btnCancelar.style.display = 'inline-flex';

  inputNome.focus();
}

// 4. Validação de Formulário
function validarCampos(nome, sabor, tamanho, precoTexto) {
  let valido = true;
  limparErros();

  if (!nome.trim()) {
    erroNome.textContent = 'Informe o nome da pizza.';
    inputNome.classList.add('input-invalid');
    valido = false;
  }

  if (!sabor.trim()) {
    erroSabor.textContent = 'Informe os ingredientes ou sabor.';
    inputSabor.classList.add('input-invalid');
    valido = false;
  }

  if (!tamanho) {
    erroTamanho.textContent = 'Selecione um tamanho válido.';
    selectTamanho.classList.add('input-invalid');
    valido = false;
  }

  const precoNumero = parseFloat(precoTexto);
  if (!precoTexto || isNaN(precoNumero) || precoNumero <= 0) {
    erroPreco.textContent = 'Informe um preço válido maior que zero.';
    inputPreco.classList.add('input-invalid');
    valido = false;
  }

  return valido;
}

// 5. Integração com a API: Operações CRUD

/**
 * GET /api/pizzas - Listar registros
 */
async function carregarPizzas() {
  // Exibe estado de carregamento
  msgCarregando.style.display = 'block';
  msgVazia.style.display = 'none';

  // Limpa o corpo da tabela de forma segura
  while (corpoTabela.firstChild) {
    corpoTabela.removeChild(corpoTabela.firstChild);
  }

  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error(`Falha ao obter lista de pizzas (HTTP ${resposta.status})`);
    }

    const pizzas = await resposta.json();

    const total = pizzas.length;
    contadorPizzas.textContent = total === 1 ? '1 pizza' : `${total} pizzas`;

    if (total === 0) {
      msgVazia.style.display = 'block';
      return;
    }

    // Renderiza cada registro usando textContent (prevenção contra injeção de HTML)
    pizzas.forEach(pizza => {
      const tr = document.createElement('tr');

      // ID
      const tdId = document.createElement('td');
      tdId.className = 'td-id';
      tdId.textContent = `#${pizza.id}`;

      // Nome
      const tdNome = document.createElement('td');
      tdNome.className = 'td-nome';
      tdNome.textContent = pizza.nome;

      // Sabor / Ingredientes
      const tdSabor = document.createElement('td');
      tdSabor.className = 'td-sabor';
      tdSabor.textContent = pizza.sabor;

      // Tamanho
      const tdTamanho = document.createElement('td');
      tdTamanho.className = 'td-tamanho';
      const spanTag = document.createElement('span');
      spanTag.className = 'tamanho-tag';
      spanTag.textContent = pizza.tamanho;
      tdTamanho.appendChild(spanTag);

      // Preço
      const tdPreco = document.createElement('td');
      tdPreco.className = 'td-preco';
      tdPreco.textContent = formatarMoeda(pizza.preco);

      // Ações (Editar e Excluir)
      const tdAcoes = document.createElement('td');
      tdAcoes.className = 'td-acoes';

      const acoesContainer = document.createElement('div');
      acoesContainer.className = 'acoes-container';

      // Botão Editar
      const btnEditar = document.createElement('button');
      btnEditar.type = 'button';
      btnEditar.className = 'btn-sm btn-edit';
      btnEditar.textContent = 'Editar';
      btnEditar.setAttribute('aria-label', `Editar pizza ${pizza.nome}`);
      btnEditar.addEventListener('click', () => {
        ativarModoEdicao(pizza);
      });

      // Botão Excluir
      const btnExcluir = document.createElement('button');
      btnExcluir.type = 'button';
      btnExcluir.className = 'btn-sm btn-delete';
      btnExcluir.textContent = 'Excluir';
      btnExcluir.setAttribute('aria-label', `Excluir pizza ${pizza.nome}`);
      btnExcluir.addEventListener('click', () => {
        confirmarExclusao(pizza);
      });

      acoesContainer.appendChild(btnEditar);
      acoesContainer.appendChild(btnExcluir);
      tdAcoes.appendChild(acoesContainer);

      tr.appendChild(tdId);
      tr.appendChild(tdNome);
      tr.appendChild(tdSabor);
      tr.appendChild(tdTamanho);
      tr.appendChild(tdPreco);
      tr.appendChild(tdAcoes);

      corpoTabela.appendChild(tr);
    });
  } catch (erro) {
    contadorPizzas.textContent = '0 pizzas';
    msgVazia.style.display = 'block';
    exibirFeedback(erro.message || 'Erro de conexão ao carregar cardápio da API.', 'erro');
  } finally {
    msgCarregando.style.display = 'none';
  }
}

/**
 * POST /api/pizzas - Cadastrar novo registro
 */
async function cadastrarPizza(dados) {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao cadastrar pizza (HTTP ${resposta.status})`);
  }

  const novaPizza = await resposta.json();
  exibirFeedback(`Pizza "${novaPizza.nome}" cadastrada com sucesso!`, 'sucesso');
}

/**
 * PUT /api/pizzas/{id} - Atualizar registro existente
 */
async function atualizarPizza(id, dados) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao atualizar pizza #${id} (HTTP ${resposta.status})`);
  }

  const pizzaAtualizada = await resposta.json();
  exibirFeedback(`Pizza "${pizzaAtualizada.nome}" atualizada com sucesso!`, 'sucesso');
}

/**
 * DELETE /api/pizzas/{id} - Excluir registro
 */
async function excluirPizza(id, nomePizza) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao remover pizza #${id} (HTTP ${resposta.status})`);
    }

    // Se a pizza excluída estava em edição, cancela o modo de edição
    if (inputId.value === String(id)) {
      redefinirModoFormulario();
    }

    exibirFeedback(`Pizza "${nomePizza}" excluída com sucesso!`, 'sucesso');
    // Recarrega os dados após gravação
    await carregarPizzas();
  } catch (erro) {
    exibirFeedback(erro.message || 'Erro ao comunicar com a API para exclusão.', 'erro');
  }
}

function confirmarExclusao(pizza) {
  const confirmou = window.confirm(`Deseja realmente excluir a pizza "${pizza.nome}" (ID: #${pizza.id})?`);
  if (confirmou) {
    excluirPizza(pizza.id, pizza.nome);
  }
}

// 6. Manipulação de Eventos do Formulário
formPizza.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const nome = inputNome.value;
  const sabor = inputSabor.value;
  const tamanho = selectTamanho.value;
  const precoTexto = inputPreco.value;

  if (!validarCampos(nome, sabor, tamanho, precoTexto)) {
    const primeiroInvalido = formPizza.querySelector('.input-invalid');
    if (primeiroInvalido) {
      primeiroInvalido.focus();
    }
    return;
  }

  const payload = {
    nome: nome.trim(),
    sabor: sabor.trim(),
    tamanho: tamanho,
    preco: parseFloat(precoTexto)
  };

  const idEdicao = inputId.value;

  // Desabilita botões durante o processamento da requisição
  btnSubmit.disabled = true;
  btnReset.disabled = true;
  btnCancelar.disabled = true;

  try {
    if (idEdicao) {
      await atualizarPizza(idEdicao, payload);
    } else {
      await cadastrarPizza(payload);
    }

    // Recarrega os dados após cada gravação
    await carregarPizzas();

    // Redefine o formulário para modo inicial
    redefinirModoFormulario();
    inputNome.focus();
  } catch (erro) {
    exibirFeedback(erro.message || 'Falha na comunicação com a API.', 'erro');
  } finally {
    btnSubmit.disabled = false;
    btnReset.disabled = false;
    btnCancelar.disabled = false;
  }
});

btnCancelar.addEventListener('click', () => {
  redefinirModoFormulario();
});

formPizza.addEventListener('reset', () => {
  redefinirModoFormulario();
  if (timeoutFeedback) {
    clearTimeout(timeoutFeedback);
  }
  feedbackBox.style.display = 'none';
  feedbackBox.textContent = '';
});

// 7. Inicialização da Interface
document.addEventListener('DOMContentLoaded', () => {
  carregarPizzas();
});
