(function () {

    'use strict';

    app
        .controller('StartCtrl', StartCtrl)

    StartCtrl.$inject = ['$state','$rootScope','$scope', 'identityService', 'userService','securityService','responseService'];


    function StartCtrl($state,$rootScope,$scope, identityService, userService,securityService,responseService) {


//        $scope.homePage = null;
        $scope.loggedIn = false;
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




        checkIfUserLoggedIn();

        function checkIfUserLoggedIn(){
            if (identityService.getAuthorizedUserData() == null) {
                userService.getAuthorizedUserShortData(identityService.getAccessToken()).then(setUserData).catch(checkProblem);
            } else {
                if(identityService.getAuthorizedUserData().registrationStatus=="incomplete"){
                    $state.go('registration.complete');
                }else if(identityService.getAuthorizedUserData().registrationStatus=="complete"){
                    $state.go('app.dashboard');
                }

            }
        }

        function setUserData (response) {

            identityService.setAuthorizedUserData(response.data.success.successData);
            if(identityService.getAuthorizedUserData().registrationStatus=="incomplete"){
                userLoggedIn();
                $state.go('registration.complete');
            }else if(identityService.getAuthorizedUserData().registrationStatus=="complete"){
                userLoggedIn();
//                $state.go('app.dashboard');
            }

        }
        function checkProblem(response){
            console.log(response.data.error_description);
            if(response.data.error_description =="The access token provided has expired."){
                identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(setAccessToken);
            }
        }

        function setAccessToken(response){
            identityService.setAccessToken(response.data);
            checkIfUserLoggedIn();
        }


        function userLoggedIn(){
            $scope.loggedIn = true;
            $scope.username = identityService.getAuthorizedUserData().username;
        }




        function _logout(){
            securityService.logoutUser().then(function(response){
                if(response.data.success.successTitle="Homepage"){
                    identityService.clearAccessToken();
                    identityService.clearAuthorizedUserData();
                    $scope.username = "Loading...";
                    $scope.loggedIn=false;
                    responseService.showSuccessToast("Logged Out Successfully");
                }
            }).catch(function(response){
                responseService.showSuccessToast("Could not Log Out","Sorry, Try again.");
            });
        }

    }



})();
