(function () {
'use strict';

angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'templates/category-list.html',
    bindings: {
      menu: '<'
    }
  });

})();
