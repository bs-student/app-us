(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name minovateApp.controller:PagesLoginCtrl
     * @description
     * # PagesLoginCtrl
     * Controller of the minovateApp
     */
    app
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'identityService', '$state', "securityService", 'userService'];

    function LoginCtrl($scope, identityService, $state, securityService, userService) {

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
            identityService.setAuthorizedUserData(response.data.user);
            if(identityService.getAuthorizedUserData().registrationStatus=="incomplete"){
                $state.go('registration.complete');
            }else if(identityService.getAuthorizedUserData().registrationStatus=="complete"){
                $state.go('app.dashboard');
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






        var vm = this;

        $scope.loginViaGoogle = _loginViaGoogle;
        $scope.loginViaFacebook = _loginViaFacebook;


        /*if (identityService.getAccessToken() != null) {
            $state.go('app.dashboard');
        }*/
        $scope.login = loginUser;
        vm.user = {};
//        securityService.getLoginPage().then(setLoginPage);


        function loginUser() {
            vm.user._username = $scope.user._username;
            vm.user._password = $scope.user._password;
            vm.user._submit = "Login";
            securityService.loginUser(vm.user).then(showDashboardPage);
        }


//        function setLoginPage(response) {
//
//            vm.user._csrf_token = response.data.page_data.csrf_token;
//        }


        function showDashboardPage(response) {

            $scope.credential_error = null;
            if (typeof response.data.page_data != "undefined") {
                $scope.credential_error = response.data.page_data.error;
            } else if (typeof response.data.user != "undefined") {
                if (response.data.user.message = "Login Successful") {
                    identityService.getInitialAccessToken(vm.user).then(getAuthorizedUserData);

                }

            }
        }

        function getAuthorizedUserData(response) {
            identityService.setAccessToken(response.data);
            userService.getAuthorizedUserShortData(response.data.access_token).then(setAuthorizedUserData);

        }

        function setAuthorizedUserData(response) {
            identityService.setAuthorizedUserData(response.data.user);
            $state.go('app.dashboard');
        }

        function _loginViaGoogle() {

            securityService.fetchGoogleAccessToken().then(function(token_response){
                securityService.fetchGoogleUserData(token_response.access_token).then(function(response){

                    var requestData={
                        'socialService':'google',
                        'email':response.data.email,
                        'googleId':response.data.id,
                        'username':response.data.given_name+response.data.family_name+Math.floor(Math.random() * 100000) + 1,
                        'fullName': response.data.name,
                        'googleEmail':response.data.email,
                        'googleToken': token_response.access_token
                    }

                    securityService.loginUserViaSocialService(requestData).then(loginViaSocialServiceNextStep);

                });

            });


        }

        function _loginViaFacebook(){
            securityService.fetchFacebookAccessToken().then(function(token_response) {
                    console.log(token_response.authResponse);
                    securityService.fetchFacebookUserData(token_response.authResponse.userID).then(function(response){

                        var requestData={
                            'socialService':'facebook',
                            'email':response.email,
                            'facebookId':response.id,
                            'username':response.first_name+response.last_name+Math.floor(Math.random() * 100000) + 1,
                            'fullName': response.name,
                            'facebookEmail':response.email,
                            'facebookToken': token_response.authResponse.accessToken
                        }

                        console.log(response);
                        securityService.loginUserViaSocialService(requestData).then(loginViaSocialServiceNextStep);
                    });

                }
            );
        }

        function loginViaSocialServiceNextStep(response){

            if(response.data.userData!=undefined){
                identityService.getSocialPluginAccessToken(response.data.userData.userId).then(function(tokenResponse){
                    identityService.setAccessToken(tokenResponse.data);
                    identityService.setAuthorizedUserData(response.data.userData);

                    if(response.data.userData.registrationStatus=="incomplete"){
                        $state.go('registration.complete');
                    }else{
                        $state.go('app.dashboard');
                    }

                });
            }



        }


    }


})();
