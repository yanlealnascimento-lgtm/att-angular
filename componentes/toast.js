'use strict';

app.directive('avisoTarefas', function ($timeout) {
  return {
    restrict: 'E',
    template: `<div role="status">
      <div class="aviso" ng-if="mensagem">{{mensagem}} <button aria-label="Fechar aviso" ng-click="fechar()">×</button>
      </div>
      </div>`,
    scope: true,
    link(scope) {
      let timer;
      scope.fechar = () => { scope.mensagem = ''; $timeout.cancel(timer); };
      scope.$on('tarefaAlterada', (_, mensagem) => {
        $timeout.cancel(timer);
        scope.mensagem = mensagem;
        timer = $timeout(scope.fechar, 3000);
      });
      scope.$on('$destroy', () => $timeout.cancel(timer));
    }
  };
});

