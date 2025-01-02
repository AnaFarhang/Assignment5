(function () {
  "use strict";

  angular.module('public')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['$http', 'SignUpService']; // Inject SignUpService

  function SignUpController($http, SignUpService) {
    var $ctrl = this;
    $ctrl.user = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      favoriteItem: ''
    };
    $ctrl.submitted = false;
    $ctrl.resultMessage = '';

    $ctrl.submitForm = function() {
      $ctrl.submitted = true;
      if ($ctrl.userForm.$valid) {
        var favoriteItem = $ctrl.user.favoriteItem;
        if (favoriteItem && /^[A-Za-z]+\d+$/.test(favoriteItem)) {
          var categoryShortName = favoriteItem.match(/^[A-Za-z]+/)[0];
          var menuNumber = favoriteItem.match(/\d+$/)[0];

          var url = `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryShortName}/menu_items/${menuNumber}.json`;

          // Make HTTP request
          $http.get(url).then(function(response) {
            if (response.data) {
              $ctrl.resultMessage = 'Your information has been saved: ' + JSON.stringify($ctrl.user);
              SignUpService.saveUserInfo($ctrl.user); // Save user info to service
            } else {
              $ctrl.resultMessage = 'No such menu number exists.';
            }
          }).catch(function(error) {
            $ctrl.resultMessage = 'Error retrieving menu item: ' + error.statusText;
          });
        } else {
          $ctrl.resultMessage = 'Invalid favorite item format!';
        }
      } else {
        $ctrl.resultMessage = 'Form is invalid! Please correct the errors.';
      }
    };
  }
})();
