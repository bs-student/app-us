(function () {

    'use strict';

    app
        .controller('TellFriendsCtrl', TellFriendsCtrl);

    TellFriendsCtrl.$inject = ['$state', '$scope','responseService','contactUsService'];

    function TellFriendsCtrl($state, $scope,responseService,contactUsService) {



        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "howItWorks";

        $scope.addNewFriendEmail = _addNewFriendEmail;
        $scope.removeFriendEmail = _removeFriendEmail ;
        $scope.sendMails=_sendMails;

        $scope.friendEmails =
            [
                {
                    email:" ",
                    remove : false
                }
            ];

        function _addNewFriendEmail() {
            $scope.friendEmails.push({
                email:" ",
                remove : true
            });
        }
        function _removeFriendEmail (email){
            console.log($scope.friendEmails.indexOf(email));
            $scope.friendEmails.splice($scope.friendEmails.indexOf(email),1);
        }

        function _sendMails(valid){
            if(valid){
                var data={
                    "fullName": $scope.user.fullName,
                    "email": $scope.user.email,
                    "message": $scope.user.message,
                    "key": $scope.user.key,
                    "friendEmails": $scope.friendEmails
                };

                ($scope.contactUsPromise = contactUsService.sendMailsToFriends(data)).then(function(response){
                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
                    $state.go('app.dashboard');
                }).catch(function (response){
                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
                });
            }
        }

    }


})();


