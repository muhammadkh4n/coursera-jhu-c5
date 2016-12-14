(function () {
'use strict';

angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['categoryList'];
function CategoriesController(categoryList) {
  var list = this;
  list.categories = categoryList.data;
}

})();
