(function () {

    'use strict';


    app
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$stateParams','$scope', 'identityService', '$state', "securityService", 'userService','responseService','wishlistService','storageService'];

    function LoginCtrl($stateParams,$scope, identityService, $state, securityService, userService,responseService,wishlistService,storageService) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "login";
        $scope.peopleQuoteItems = [
            {id: 1, peopleName: 'John Douey', peopleType: 'Student', peopleImg: 'assets/images/avatars/random-avatar1.jpg', peopleQuote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
            {id: 2, peopleName: 'John Douey', peopleType: 'Student', peopleImg: 'assets/images/avatars/random-avatar1.jpg', peopleQuote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
            {id: 3, peopleName: 'John Douey', peopleType: 'Student', peopleImg: 'assets/images/avatars/random-avatar1.jpg', peopleQuote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'}
        ];

        $scope.bookId = $stateParams.bookId;
        $scope.loginUser = _loginUser;





        /*$scope.loginViaGoogle = _loginViaGoogle;
        $scope.loginViaFacebook = _loginViaFacebook;*/





        function _loginUser(valid) {

            if(valid){

                securityService.loginUser($scope.user).then(showDashboardPage).catch(showLoginUnsuccessful);
            }
        }



        function showLoginUnsuccessful(response){
            responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
        }
        function showUnknownError(){
            responseService.showErrorToast("Login Unsuccessful","Sorry, we couldn't log you in. Please Try again");
        }

        function showDashboardPage(response) {
            if (response.data.success.successTitle = "Login Successful") {
                    identityService.getInitialAccessToken($scope.user).then(getAuthorizedUserData).catch(showUnknownError);
            }
        }

        function getAuthorizedUserData(response) {

            identityService.setAccessToken(response.data);

            userService.getAuthorizedUserShortData(response.data.access_token).then(setAuthorizedUserData).catch(function(response){
                if (response.data.error_description == "The access token provided is invalid.") {
                    $scope.$parent.logout();
                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(setAuthorizedUserData).catch(function(){
                        responseService.showErrorToast("Something Went Wrong", "Please try again.");
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }
            });


        }

        function setAuthorizedUserData(response) {
            identityService.setAuthorizedUserData(response.data.success.successData);
            responseService.showSuccessToast("Login Successful");
            $scope.$parent.loggedIn = true;
            $scope.$parent.username = response.data.success.successData.username;
//            storageService.setValue("universityCampusValue",response.data.success.successData.campusId);
            if($scope.bookId!=undefined){
                wishlistService.addBookToWishList(identityService.getAccessToken(),{bookId:$scope.bookId}).then(function(response){
                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
                }).catch(function(response){
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                });
            }
            $state.go('app.dashboard');

        }

        /*function _loginViaGoogle() {

            securityService.fetchGoogleAccessToken().then(function (token_response) {
                securityService.fetchGoogleUserData(token_response.access_token).then(function (response) {

                    var requestData = {
                        'socialService': 'google',
                        'email': response.data.email,
                        'googleId': response.data.id,
                        'username': response.data.given_name + response.data.family_name + Math.floor(Math.random() * 100000) + 1,
                        'fullName': response.data.name,
                        'googleEmail': response.data.email,
                        'googleToken': token_response.access_token
                    };

                    securityService.loginUserViaSocialService(requestData).then(loginViaSocialServiceNextStep);

                });

            });


        }

        function _loginViaFacebook() {
            securityService.fetchFacebookAccessToken().then(function (token_response) {
                    console.log(token_response.authResponse);
                    securityService.fetchFacebookUserData(token_response.authResponse.userID).then(function (response) {

                        var requestData = {
                            'socialService': 'facebook',
                            'email': response.email,
                            'facebookId': response.id,
                            'username': response.first_name + response.last_name + Math.floor(Math.random() * 100000) + 1,
                            'fullName': response.name,
                            'facebookEmail': response.email,
                            'facebookToken': token_response.authResponse.accessToken
                        }

                        console.log(response);
                        securityService.loginUserViaSocialService(requestData).then(loginViaSocialServiceNextStep);
                    });

                }
            );
        }

        function loginViaSocialServiceNextStep(response) {

            if (response.data.userData != undefined) {
                identityService.getSocialPluginAccessToken(response.data.userData.userId).then(function (tokenResponse) {
                    identityService.setAccessToken(tokenResponse.data);
                    identityService.setAuthorizedUserData(response.data.userData);

                    if (response.data.userData.registrationStatus == "incomplete") {
                        $state.go('registration.complete');
                    } else {
                        $state.go('app.dashboard');
                    }

                });
            }


        }*/


    }


})();
