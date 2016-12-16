(function () {
"use strict";

angular.module('public')
  .controller('InfoController', InfoController);

InfoController.$inject = ['UserDataService', 'MenuService'];
function InfoController(UserDataService, MenuService) {
  var infoCtrl = this;

  var promise = UserDataService.getUser();
  promise.then(function (res) {
    infoCtrl.user = res;
  })
  .catch(function (err) {
    console.log(err);
  });
}

})();
