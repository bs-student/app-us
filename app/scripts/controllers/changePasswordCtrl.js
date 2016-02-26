(function () {
    'use strict';

    app
        .controller('ChangePasswordCtrl', ChangePasswordCtrl);

    ChangePasswordCtrl.$inject = ['identityService', 'userService', 'responseService', '$scope', '$state'];

    function ChangePasswordCtrl(identityService, userService, responseService, $scope, $state) {

        userService.getAuthorizedUserFullData(identityService.getAccessToken()).then(function (response) {
            $scope.user = response.data.user;
        });

        $scope.changePassword = _changePassword;


        function _changePassword() {
            userService.changePassword($scope.user).then(function (response) {

                if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorBody);

                }
                if (response.data.success != undefined) {
                    responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successBody);
                    $state.go('app.dashboard');
                }


            });

        }
    }

})();