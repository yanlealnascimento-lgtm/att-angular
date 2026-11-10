'use strict';

app.directive('menuTarefas', function () {
  return {
    restrict: 'E',
    template: `<select aria-label="Ordenar tarefas" ng-model="lista.ordem" ng-change="lista.pagina=1; lista.recalcular()">
      <option value="recentes">Mais recentes</option>
      <option value="nome">Ordem alfabética</option>
      </select>`
  };
});

