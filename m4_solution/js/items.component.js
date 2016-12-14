(function () {
'use strict';

angular.module('MenuApp')
  .component('items', {
    templateUrl: 'templates/item-list.html',
    bindings: {
      menuItems: '<'
    }
  });

})();
