(function () {
  var ShoppingListCheckOff = angular.module('ShoppingListCheckOff', []);

  ShoppingListCheckOff
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var buyList = this;
    buyList.list = ShoppingListCheckOffService.getBuyList();

    buyList.buy = function (itemIndex) {
      ShoppingListCheckOffService.buy(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.list = ShoppingListCheckOffService.getBoughtList();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var buyList = [
      { name: "cookies", quantity: 10 },
      { name: "pastries", quantity: 5 },
      { name: "chips", quantity: 300 },
      { name: "apples", quantity: 2 },
      { name: "drinks", quantity: 13 }
    ];
    var boughtList = [];

    service.getBuyList = function () {
      return buyList;
    };

    service.getBoughtList = function () {
      return boughtList;
    };

    service.buy = function (index) {
      boughtList.push(buyList.splice(index, 1)[0]);
    };
  }
})();
