(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name minovateApp.controller:DashboardCtrl
     * @description
     * # DashboardCtrl
     * Controller of the minovateApp
     */

    app
        .controller('DashboardCtrl', DashboardCtrl);


    DashboardCtrl.$inject = ['$scope', 'identityService', 'userService'];



    function DashboardCtrl($scope, identityService, userService) {

        checkIfUserLoggedIn();


        $scope.loggedIn = false;
        $scope.username = "Loading...";

        function checkIfUserLoggedIn(){
            if (identityService.getAuthorizedUserData() == null) {
                userService.getAuthorizedUserShortData(identityService.getAccessToken()).then(setUserData).catch(checkProblem);
            } else {
                $scope.$parent.loggedIn = true;
                $scope.$parent.username = identityService.getAuthorizedUserData().username;
                $scope.$parent.registrationStatus = identityService.getAuthorizedUserData().registrationStatus;
            }
        }

        function setUserData (response) {
            identityService.setAuthorizedUserData(response.data.user);

            $scope.$parent.loggedIn = true;
            $scope.$parent.username = identityService.getAuthorizedUserData().username;
            $scope.$parent.registrationStatus = identityService.getAuthorizedUserData().registrationStatus;
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
//


        $scope.page = {
            title: 'Dashboard',
            subtitle: 'Student 2 Student HomePage'
        };


    }



})();
