'use strict';

const app = angular.module('tasklist', []);
app.factory('arquivoDeTarefas', function () {
  const chave = 'tasklist.tarefas.v1';
  return {
    ler() {
      try {
        const salvas = JSON.parse(localStorage.getItem(chave));
        if (Array.isArray(salvas)) return salvas;
      } catch { }
      return ['Planejar a semana', 'Revisar a apresentação', 'Enviar o resumo da reunião'].map(
        (nome, indice) => ({ id: indice + 1, nome, feita: false })
      );
    },
    salvar(tarefas) {
      try { localStorage.setItem(chave, JSON.stringify(tarefas)); }
      catch {  }
    }
  };
});

app.controller('Lista', function ($scope, arquivoDeTarefas) {
  const lista = this;
  lista.tarefas = arquivoDeTarefas.ler();
  lista.status = 'Todas';
  lista.ordem = 'recentes';
  lista.pagina = 1;
  lista.porPagina = Infinity; 

  lista.recalcular = function () {
    lista.concluidas = lista.tarefas.filter(tarefa => tarefa.feita).length;
    let resultado = lista.tarefas.filter(tarefa =>
      lista.status === 'Todas' || tarefa.feita === (lista.status === 'Concluídas')
    );
    if (lista.ordem === 'nome') resultado.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    lista.paginas = Math.max(1, Math.ceil(resultado.length / lista.porPagina));
    lista.pagina = Math.min(lista.pagina, lista.paginas);
    const inicio = Number.isFinite(lista.porPagina) ? (lista.pagina - 1) * lista.porPagina : 0;
    lista.exibidas = resultado.slice(inicio, inicio + lista.porPagina);
  };

  function salvar(mensagem) {
    arquivoDeTarefas.salvar(lista.tarefas);
    lista.recalcular();
    $scope.$broadcast('tarefaAlterada', mensagem);
  }

  lista.adicionar = function () {
    const nome = (lista.nova || '').trim();
    if (!nome) return;
    const id = lista.tarefas.reduce((maior, tarefa) => Math.max(maior, tarefa.id), 0) + 1;
    lista.tarefas.unshift({ id, nome, feita: false });
    lista.nova = '';
    lista.status = 'Todas';
    lista.pagina = 1;
    salvar('Tarefa adicionada.');
  };
  lista.atualizar = tarefa => salvar(tarefa.feita ? 'Tarefa concluída.' : 'Tarefa reaberta.');
  lista.excluir = function (tarefa) {
    lista.tarefas.splice(lista.tarefas.indexOf(tarefa), 1);
    salvar('Tarefa excluída.');
  };
  lista.recalcular();
});
