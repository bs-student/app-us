(function () {

    'use strict';

    app
        .controller('StartCtrl', StartCtrl)

    StartCtrl.$inject = ['$state','$rootScope','$scope', 'identityService', 'userService','securityService'];


    function StartCtrl($state,$rootScope,$scope, identityService, userService,securityService) {




        $scope.logout = _logout;

//        checkIfUserLoggedIn();
//
//
//        $scope.loggedIn = false;
//        $scope.username = "Loading...";
//
//        function checkIfUserLoggedIn(){
//            if (identityService.getAuthorizedUserData() == null) {
//                userService.getAuthorizedUserShortData(identityService.getAccessToken()).then(setUserData).catch(checkProblem);
//            } else {
//                $scope.loggedIn = true;
//                $scope.username = identityService.getAuthorizedUserData().username;
//                $scope.registrationStatus = identityService.getAuthorizedUserData().registrationStatus;
//            }
//        }
//
//        function setUserData (response) {
//            identityService.setAuthorizedUserData(response.data.user);
//
//            $scope.loggedIn = true;
//            $scope.username = identityService.getAuthorizedUserData().username;
//            $scope.registrationStatus = identityService.getAuthorizedUserData().registrationStatus;
//        }
//        function checkProblem(response){
//            console.log(response.data.error_description);
//            if(response.data.error_description =="The access token provided has expired."){
//                identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(setAccessToken);
//            }
//        }
//
//        function setAccessToken(response){
//            identityService.setAccessToken(response.data);
//            checkIfUserLoggedIn();
//        }

        function _logout(){
            securityService.logoutUser().then(function(response){
                if(response.data.user.user="anon."){
                    identityService.clearAccessToken();
                    identityService.clearAuthorizedUserData();
                    $scope.username = "Loading...";
                    $scope.loggedIn=false;
                }
            });
        }

    }



})();
