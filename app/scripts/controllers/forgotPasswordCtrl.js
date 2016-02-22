(function () {
    'use strict';

    app
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

    ForgotPasswordCtrl.$inject = ['$scope', '$state', 'toastr', 'toastrConfig', 'securityService'];

    function ForgotPasswordCtrl($scope, $state, toastr, toastrConfig, securityService) {

        $scope.forgotPassword = _forgotPassword;
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
        function _forgotPassword() {

            if ($scope.user != undefined) {
                var data = {'username':$scope.user.email}
                securityService.forgotPassword(data).then(function(response){

                    if(response.data.error!=undefined){
                        var toast = toastr[$scope.options.type](response.data.error.errorBody, response.data.error.errorTitle, {
                            iconClass: 'toast-error'+' ' + 'bg-error'
                        });
                        openedToasts.push(toast);
//                        $state.go('security.signup');
                    }
                    if(response.data.success!=undefined){
                        var toast = toastr[$scope.options.type](response.data.success.successBody, response.data.success.successTitle, {
                            iconClass: 'toast-success'+' ' + 'bg-success'
                        });
                        openedToasts.push(toast);
//                        $state.go('security.login');
                    }
                    console.log(response.data);
                });
            }

        }


    }

})();