(function () {

    'use strict';

    app
        .controller('ContactUsCtrl', ContactUsCtrl);

    ContactUsCtrl.$inject = ['$state', '$scope','responseService','contactUsService'];

    function ContactUsCtrl($state, $scope,responseService,contactUsService) {



        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "helpAndSafety";


        $scope.sendMessage=_sendMessage;

        function _sendMessage(valid){
            if(valid){
                var data={
                    "fullName": $scope.fullName,
                    "email": $scope.email,
                    "subject": $scope.subject,
                    "message": $scope.message,
                    "want": $scope.want
                };

                ($scope.contactUsPromise = contactUsService.sendContactUsMessage(data)).then(function(response){
                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
                    $state.go('app.dashboard');
                }).catch(function (response){
                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
                });

            }
        }

    }


})();


