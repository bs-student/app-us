(function () {

    'use strict';



    app
        .controller('DashboardCtrl', DashboardCtrl);


    DashboardCtrl.$inject = ['$scope', 'identityService', 'userService'];


    function DashboardCtrl($scope, identityService, userService) {

        $scope.$parent.headerStyle = "light";
        $scope.$parent.activePage = "home";
//        checkIfUserLoggedIn();


//        $scope.loggedIn = false;
//        $scope.username = "Loading...";

//        function checkIfUserLoggedIn() {
//            if (identityService.getAuthorizedUserData() == null) {
//                userService.getAuthorizedUserShortData(identityService.getAccessToken()).then(setUserData).catch(checkProblem);
//            } else {
//                $scope.$parent.loggedIn = true;
//                $scope.$parent.username = identityService.getAuthorizedUserData().username;
//                $scope.$parent.registrationStatus = identityService.getAuthorizedUserData().registrationStatus;
//            }
//        }
//
//        function setUserData(response) {
//            identityService.setAuthorizedUserData(response.data.user);
//
//            $scope.$parent.loggedIn = true;
//            $scope.$parent.username = identityService.getAuthorizedUserData().username;
//            $scope.$parent.registrationStatus = identityService.getAuthorizedUserData().registrationStatus;
//        }
//
//        function checkProblem(response) {
//            console.log(response.data.error_description);
//            if (response.data.error_description == "The access token provided has expired.") {
//                identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(setAccessToken);
//            }
//        }
//
//        function setAccessToken(response) {
//            identityService.setAccessToken(response.data);
//            checkIfUserLoggedIn();
//        }

//


        $scope.page = {
            title: 'Dashboard',
            subtitle: 'Student 2 Student HomePage'
        };


        $scope.peopleQuoteItems = [
            {id: 1, peopleName: 'John Douey', peopleType: 'Student', peopleImg: 'assets/images/avatars/random-avatar1.jpg', peopleQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
            {id: 2, peopleName: 'John Douey', peopleType: 'Student', peopleImg: 'assets/images/avatars/random-avatar1.jpg', peopleQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
            {id: 3, peopleName: 'John Douey', peopleType: 'Student', peopleImg: 'assets/images/avatars/random-avatar1.jpg', peopleQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'}
        ];

        $scope.universityQuoteItems = [
            {id: 1, universityName: 'Marqutte University', universityImg: 'assets/images/sections/uni.png', universityQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
            {id: 2, universityName: 'Marqutte University', universityImg: 'assets/images/sections/uni.png', universityQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
            {id: 3, universityName: 'Marqutte University', universityImg: 'assets/images/sections/uni.png', universityQuote: '“Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
            {id: 4, universityName: 'Marqutte University', universityImg: 'assets/images/sections/uni.png', universityQuote: '“Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
            {id: 5, universityName: 'Marqutte University', universityImg: 'assets/images/sections/uni.png', universityQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'}
        ];


    }


})();
