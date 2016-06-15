(function () {

    'use strict';

    app
        .controller('StartCtrl', StartCtrl)

    StartCtrl.$inject = ['$state','$rootScope','$scope', 'identityService', 'userService','securityService','responseService','storageService','newsletterService'];


    function StartCtrl($state,$rootScope,$scope, identityService, userService,securityService,responseService,storageService,newsletterService) {


//        $scope.homePage = null;
        $scope.loggedIn = false;
        $scope.adminUser=false;
        $scope.logout = _logout;

        $scope.addToNewsletter = _addToNewsletter;
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
//            storageService.setValue("universityCampusValue",response.data.success.successData.campusId);
            identityService.setAuthorizedUserData(response.data.success.successData);
            if(identityService.getAuthorizedUserData().registrationStatus=="incomplete"){
                userLoggedIn(response.data.success.successData);
                $state.go('registration.complete');
            }else if(identityService.getAuthorizedUserData().registrationStatus=="complete"){
                userLoggedIn(response.data.success.successData);
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


        function userLoggedIn(userData){
            if(userData.role.indexOf("ROLE_ADMIN_USER")>=0){
                $scope.adminUser=true;
            }else{
                $scope.adminUser=false;
            }
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

        function _addToNewsletter(valid,email){
            if(valid){
                ($scope.newsletterPromise = newsletterService.addNewsletterEmail({email:email})).then(function(response){
                    responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);
                }).catch(function(response){
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                });

            }
        }

    }



})();
