(function () {

    'use strict';

    app
        .factory('loginService', loginService);

    loginService.$inject=['$scope', 'identityService', 'userService','securityService'];

    function loginService($scope,identityService, userService,securityService) {


        /*$scope.loggedIn = false;
        $scope.username = "Loading...";

        function checkIfUserLoggedIn(){
            if (identityService.getAuthorizedUserData() == null) {
                userService.getAuthorizedUserShortData(identityService.getAccessToken()).then(setUserData).catch(checkProblem);
            } else {
                var userData = {
                    'loggedIn' : true,
                    'username': identityService.getAuthorizedUserData().username,
                    'registrationStatus': identityService.getAuthorizedUserData().registrationStatus,
                    'email': identityService.getAuthorizedUserData().email
                }
                return userData;
                *//*$scope.loggedIn = true;
                $scope.username = identityService.getAuthorizedUserData().username;*//*
            }
        }

        function setUserData (response) {
            identityService.setAuthorizedUserData(response.data.user);
            var userData = {
                'loggedIn' : true,
                'username': response.data.user.username,
                'registrationStatus': response.data.user.registrationStatus,
                'email': response.data.user.email
            }
            return userData;
            *//*$scope.loggedIn = true;
            $scope.username = identityService.getAuthorizedUserData().username;*//*
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
        }*/


    }

})();
