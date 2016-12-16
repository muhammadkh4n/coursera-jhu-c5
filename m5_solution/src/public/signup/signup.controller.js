(function () {
"use strict";

angular.module('public')
  .controller('SignUpController', SignUpController);


SignUpController.$inject = ['UserDataService', '$rootScope'];
function SignUpController(UserDataService, $rootScope) {
  var $ctrl = this;

  $ctrl.signup = function (formData) {
    UserDataService.signup(formData);
  };
}

})();
