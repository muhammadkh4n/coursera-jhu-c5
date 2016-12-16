(function () {
"use strict";

angular.module('public')
  .directive('menuNumber', MenuNumberDirective);


MenuNumberDirective.$inject = ['$q', '$http', 'ApiPath'];
function MenuNumberDirective($q, $http, ApiPath) {
  var ddo = {
    require: 'ngModel',
    link: MenuNumberDirectiveLink
  };

  function MenuNumberDirectiveLink(scope, elem, attrs, ctrl) {
    ctrl.$asyncValidators.menu_number = function (modelValue, viewValue) {
      return $http.get(ApiPath + '/menu_items/' + modelValue.toUpperCase() + '.json');
    };
  }

  return ddo;
}

})();
