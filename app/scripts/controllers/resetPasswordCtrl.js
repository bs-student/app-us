(function () {
    'use strict';

    app
        .controller('ResetPasswordCtrl', ResetPasswordCtrl);

    ResetPasswordCtrl.$inject = ['$scope', '$state', 'toastr', 'toastrConfig', 'securityService','$stateParams'];

    function ResetPasswordCtrl($scope, $state, toastr, toastrConfig, securityService,$stateParams) {

        $scope.resetPassword = _resetPassword;
        $scope.clearLastToast = _clearLastToast;
        $scope.clearToasts = _clearToasts;
        var openedToasts = [];
        $scope.toast = {
            colors: [
                {name:'success'},
                {name:'error'}
            ]
        };
        $scope.options = {
            position: 'toast-top-right',
            type: 'success',
            iconClass: $scope.toast.colors[0],
            timeout: '5000',
            extendedTimeout: '2000',
            html: false,
            closeButton: true,
            tapToDismiss: true,
            closeHtml: '<i class="fa fa-times"></i>'
        };
        function _clearLastToast(){
            var toast = openedToasts.pop();
            toastr.clear(toast);
        }

        function _clearToasts () {
            toastr.clear();
        }
        function _resetPassword() {
//            console.log($stateParams);

            if ($scope.user != undefined) {

                if($scope.user.password==$scope.user.passwordConfirm){

                    var data={
                        'password':$scope.user.password,
                        'passwordConfirm':$scope.user.passwordConfirm,
                        'token':$stateParams.code
                    }
                    securityService.resetPassword(data).then(function(response){

                        if(response.data.error!=undefined){
                            var toast = toastr[$scope.options.type](response.data.error.errorBody, response.data.error.errorTitle, {
                                iconClass: 'toast-error'+' ' + 'bg-error'
                            });
                            openedToasts.push(toast);
                            
                        }
                        if(response.data.success!=undefined){
                            var toast = toastr[$scope.options.type](response.data.success.successBody, response.data.success.successTitle, {
                                iconClass: 'toast-success'+' ' + 'bg-success'
                            });
                            openedToasts.push(toast);
                            $state.go('security.login');
                        }

                        console.log(response.data);
                    });

                }

            }

        }


    }

})();