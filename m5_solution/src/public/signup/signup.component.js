(function () {
"use strict";

angular.module('public')
  .component('signupForm', {
    templateUrl: 'src/public/signup/signup-form.html',
    bindings: {
      signup: '&'
    },
    controller: SignUpFormController
  });

SignUpFormController.$inject = ['$rootScope'];
function SignUpFormController($rootScope) {
  var $ctrl = this;
  var cancel;

  $ctrl.$onInit = function () {
    cancel = $rootScope.$on('signup:status', function (event, data) {
      $ctrl.registered = data.success;
    });
  };

  $ctrl.reset = function (form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    $ctrl.user = angular.copy({});
  };

  $ctrl.$onDestroy = function () {
    cancel();
  };
}

})();
