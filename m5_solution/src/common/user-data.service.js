(function () {
"use strict";

angular.module('common')
  .service('UserDataService', UserDataService);

UserDataService.$inject = ['$q', '$rootScope', 'MenuService'];
function UserDataService($q, $rootScope, MenuService) {
  var service = this;

  var User;

  // save user information
  service.signup = function (formData) {
    User = {};
    User.first_name = formData.first_name;
    User.last_name = formData.last_name;
    User.email = formData.email;
    User.phone_number = formData.phone_number;

    var promise = MenuService.getMenuItem(formData.favorite.toUpperCase());
    promise.then(function (res) {
      User.favorite = res;
      $rootScope.$broadcast('signup:status', {success: true});
    });
  };

  // fetch user information
  service.getUser = function () {
    var defered = $q.defer();

    if (User) {
      defered.resolve(User);
    } else {
      defered.reject({status: 404, message: "No User Found"});
    }

    return defered.promise;
  };
}

})();
