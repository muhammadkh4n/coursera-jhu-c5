(function () {
'use strict';

angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.items = "";
  $scope.setMessage = function () {
    var numberOfItems = totalItems($scope.items);
    $scope.message = getMessage(numberOfItems);
    $scope.lunch = getClass(numberOfItems);
  };
}

// Return a message depending on numberOfItems.
var getMessage = function (numberOfItems) {
  if (numberOfItems < 1) return "Please enter data first";
  if (numberOfItems <= 3) return "Enjoy!";
  return "Too Much!";
};

// set class on item
var getClass = function (numberOfItems) {
  if (numberOfItems < 1) return "red";
  return "green";
};

// Calculate total number of items.
var totalItems = function (items) {
  var str = items.replace(/,\s*,/, ",");
  var arr = str.split(",");
  if (arr.length == 1 && arr[0] === "") return 0;
  return arr.length;
};

})();
