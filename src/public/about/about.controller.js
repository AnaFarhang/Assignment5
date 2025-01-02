(function () {
  'use strict';

  angular.module('public')
  .controller('AboutController', AboutController);

  AboutController.$inject = ['SignUpService'];

  function AboutController(SignUpService) {
    var aboutCtrl = this;

    aboutCtrl.userInfo = SignUpService.getUserInfo();
    aboutCtrl.message = aboutCtrl.userInfo ? 'User Information' : 'Not Signed Up Yet. Sign up Now!';

    aboutCtrl.getItemParts = function(item) {
      if (!item) return { stringPart: '', numberPart: '' };
      let match = item.match(/^([^\d]+)(\d+)$/);
      if (match) {
        return {
          stringPart: match[1],
          numberPart: match[2]
        };
      }
      return {
        stringPart: '',
        numberPart: ''
      };
    };
  }
})();
