'use strict';

app.directive('ajudaTarefas', function () {
  return {
    restrict: 'E',
    template: `<section class="cartao">
      <h2>Como usar</h2>
      <details name="ajuda">
      <summary>Lorem ipsum</summary>
      <p>De o mcheck</p>
      </details>
      <details name="ajuda">
      <summary>Lorem ipsum dolor, </summary>
      <p>BORA LULA!</p>
      </details>
      </section>`
  };
});

