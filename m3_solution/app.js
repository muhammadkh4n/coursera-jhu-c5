(function () {
'use strict';

var app = angular.module('NarrowItDownApp', []);

app.controller('NarrowItDownController', NarrowItDownController)
   .service('MenuSearchService', MenuSearchService)
   .directive('foundItems', FoundItemsDirective)
   .directive('itemsLoader', ItemsLoaderDirective)
   .constant('BaseUrl', 'https://davids-restaurant.herokuapp.com');

function FoundItemsDirective() {
  var ddo = {
    scope: {
      items: '<',
      onRemove: '&',
      loading: '<'
    },
    templateUrl: 'found-items.html',
    controller: FoundItemsDirectiveController,
    controllerAs: 'found',
    bindToController: true,
    link: FoundItemsDirectiveLink
  };

  return ddo;
}

function ItemsLoaderDirective() {
  return {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      loading: '<'
    },
    link: ItemsLoaderDirectiveLink
  };
}

function ItemsLoaderDirectiveLink(scope, element) {
  scope.$watch('loading', function (loading) {
    var elem = element.find('div');
    if (loading) {
      elem.css('display', 'block');
    } else {
      elem.css('display', 'none');
    }
  });
}

function FoundItemsDirectiveLink(scope, element, attrs, controller) {
  scope.$watch('found.loading', function (loading) {
    var elem = element.find('section').find('span');
    if (!loading && controller.isEmpty()) {
      elem.addClass("trigger-error");
    } else {
      elem.removeClass("trigger-error");
    }
  });
}

function FoundItemsDirectiveController() {
  var found = this;

  found.isEmpty = function () {
    if (found.items && !found.items.length) {
      return true;
    }
    return false;
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var search = this;

  search.searchItems = function (searchTerm) {
    search.loading = true;
    search.found = [];
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function (res) {
      search.found = res;
      search.loading = false;
    })
    .catch(function (err) {
      console.log("Error: " + err.status + ", " + err.statusText);
    });
  };

  search.removeItem = function (index) {
    search.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http', 'BaseUrl'];
function MenuSearchService($http, BaseUrl) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var promise = $http({
      method: 'GET',
      url: (BaseUrl + '/menu_items.json')
    })
    .then(function (res) {
      var items = res.data.menu_items;
      var foundItems = [];

      if (!searchTerm) return foundItems;

      for (var i = 0; i < items.length; i++) {
        if (items[i].description.indexOf(searchTerm.toLowerCase()) >= 0) {
          foundItems.push(items[i]);
        }
      }
      return foundItems;
    });

    return promise;
  };
}

})();
