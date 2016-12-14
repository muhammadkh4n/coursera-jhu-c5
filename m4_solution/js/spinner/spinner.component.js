(function () {
'use strict';

angular.module('spinner')
  .component('loadingSpinner', {
    templateUrl: 'templates/spinner.html',
    controller: SpinnerController
  });

SpinnerController.$inject = ['$rootScope'];
function SpinnerController($rootScope) {
  var $ctrl = this;
  var eventsToCancel = [];

  $ctrl.$onInit = function () {
    var cancel = $rootScope.$on('$stateChangeStart', function (event) {
      $ctrl.spin = true;
    });
    eventsToCancel.push(cancel);

    cancel = $rootScope.$on('$stateChangeSuccess', function (event) {
      $ctrl.spin = false;
    });
    eventsToCancel.push(cancel);

    cancel = $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        console.log(error);
        $ctrl.spin = false;
      });
    eventsToCancel.push(cancel);
  };

  $ctrl.$onDestroy = function () {
    eventsToCancel.forEach(function (cancel) {
      cancel();
    });
  };
}

})();
