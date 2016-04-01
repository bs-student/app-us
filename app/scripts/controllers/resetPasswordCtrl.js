(function () {
    'use strict';

    app
        .controller('ResetPasswordCtrl', ResetPasswordCtrl);

    ResetPasswordCtrl.$inject = ['$scope', '$state', 'securityService','$stateParams','responseService'];

    function ResetPasswordCtrl($scope, $state, securityService,$stateParams,responseService) {

        $scope.resetPassword = _resetPassword;

        function _resetPassword(valid) {

            if(valid){
                if ($scope.user != undefined) {

                    if($scope.user.password==$scope.user.passwordConfirm){

                        var data={
                            'password':$scope.user.password,
                            'passwordConfirm':$scope.user.passwordConfirm,
                            'token':$stateParams.code
                        }
                        securityService.resetPassword(data).then(function(response){

                            if(response.data.success!=undefined){
                                responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
                                $state.go('app.login');
                            }

                        }).catch(function(response){
                            responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
                        });

                    }

                }
            }


        }


    }

})();