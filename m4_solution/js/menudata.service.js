(function () {
'use strict';

angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('baseUrl', 'https://davids-restaurant.herokuapp.com');

MenuDataService.$inject = ['$http', 'baseUrl'];
function MenuDataService($http, baseUrl) {
  var service = this;

  service.getAllCategories = function () {
    return $http({
      url: (baseUrl + '/categories.json')
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      url: (baseUrl + '/menu_items.json?category=' + categoryShortName)
    });
  };
}

})();
