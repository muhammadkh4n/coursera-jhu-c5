(function () {
'use strict';

angular.module('MenuApp')
  .config(Routes);

Routes.$inject = ['$stateProvider', '$urlRouterProvider'];
function Routes($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'templates/categories.html',
      controller: 'CategoriesController as list',
      resolve: {
        categoryList: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('items', {
      url: '/categories/{short_name}',
      templateUrl: 'templates/items.html',
      controller: 'ItemsController as list',
      resolve: {
        itemList: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.short_name);
        }]
      }
    });
}

})();
