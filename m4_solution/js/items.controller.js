(function () {
'use strict';

angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

ItemsController.$inject = ['itemList'];
function ItemsController(itemList) {
  var list = this;
  list.items = itemList.data;
}

})();
