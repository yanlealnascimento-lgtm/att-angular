'use strict';

app.directive('paginasTarefas', function () {
  return {
    restrict: 'E',
    template: `<nav ng-if="lista.paginas > 1" aria-label="Paginação">
      <button aria-label="Página anterior" ng-disabled="lista.pagina === 1" ng-click="lista.pagina=lista.pagina-1; lista.recalcular()">‹</button>
      <select aria-label="Página atual" ng-model="lista.pagina" ng-options="n as ('Página ' + n) for n in numeros" ng-change="lista.recalcular()">
      </select>
      <button aria-label="Próxima página" ng-disabled="lista.pagina === lista.paginas" ng-click="lista.pagina=lista.pagina+1; lista.recalcular()">›</button>
      </nav>`,
    link(scope) {
      scope.lista.porPagina = 5;
      scope.lista.recalcular();
      scope.$watch('lista.paginas', total => {
        scope.numeros = Array.from({length: total}, (_, indice) => indice + 1);
      });
    }
  };
});

