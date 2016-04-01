(function () {
    'use strict';

    app
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

    ForgotPasswordCtrl.$inject = ['$scope', 'securityService','responseService'];

    function ForgotPasswordCtrl($scope, securityService,responseService) {

        $scope.forgotPassword = _forgotPassword;

        function _forgotPassword(valid) {

            if(valid){
                if ($scope.user != undefined) {
                    var data = {'username':$scope.user.email}
                    securityService.forgotPassword(data).then(function(response){
                        responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
                    }).catch(function(response){
                        responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
                    });
                }
            }


        }


    }

})();