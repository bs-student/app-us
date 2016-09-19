(function () {
    'use strict';

    app
        .controller('ChangePasswordCtrl', ChangePasswordCtrl);

    ChangePasswordCtrl.$inject = ['identityService', 'userService', 'responseService', '$scope', '$state'];

    function ChangePasswordCtrl(identityService, userService, responseService, $scope, $state) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "user";


        $scope.changePassword = _changePassword;


        function _changePassword(valid) {
            if(valid){
                userService.changePassword($scope.user).then(function (response) {
                    responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);
                    $state.go('app.dashboard');
                }).catch(function(response){

                    if (response.data.error_description == "The access token provided is invalid.") {

                    } else if (response.data.error_description == "The access token provided has expired.") {
                        identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                            identityService.setAccessToken(response.data);
                            _changePassword(valid);
                        });
                    } else if (response.data.error != undefined) {
                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                    } else {
                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                    }

                });

            }

        }
    }

})();