(function () {

    'use strict';



    app
        .controller('DashboardCtrl', DashboardCtrl);


    DashboardCtrl.$inject = ['$scope', 'identityService', 'userService','$state','quoteService','SERVER_CONSTANT','storageService'];


    function DashboardCtrl($scope, identityService, userService,$state,quoteService,SERVER_CONSTANT,storageService) {

        $scope.$parent.headerStyle = "light";
        $scope.$parent.activePage = "home";
        $scope.firstSlide = true;
        $scope.imageHostPath = SERVER_CONSTANT.IMAGE_HOST_PATH;
        $scope.rotateSlide = _rotateSlide;
        $scope.showRegister = _showRegister;
        $scope.searchBook = _searchBook;
        $scope.peopleQuoteItems = [];
        $scope.universityQuoteItems = [];

        setUpPage();

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


//        $scope.peopleQuoteItems = [
//            {id: 1, peopleName: 'John Douey', peopleType: 'Student', peopleImg: 'assets/images/avatars/random-avatar1.jpg', peopleQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
//            {id: 2, peopleName: 'John Douey', peopleType: 'Student', peopleImg: 'assets/images/avatars/random-avatar1.jpg', peopleQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
//            {id: 3, peopleName: 'John Douey', peopleType: 'Student', peopleImg: 'assets/images/avatars/random-avatar1.jpg', peopleQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'}
//        ];
//
//        $scope.universityQuoteItems = [
//            {id: 1, universityName: 'Marqutte University', universityImg: 'assets/images/sections/uni.png', universityQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
//            {id: 2, universityName: 'Marqutte University', universityImg: 'assets/images/sections/uni.png', universityQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
//            {id: 3, universityName: 'Marqutte University', universityImg: 'assets/images/sections/uni.png', universityQuote: '“Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
//            {id: 4, universityName: 'Marqutte University', universityImg: 'assets/images/sections/uni.png', universityQuote: '“Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'},
//            {id: 5, universityName: 'Marqutte University', universityImg: 'assets/images/sections/uni.png', universityQuote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'}
//        ];

        function setUpPage(){
            quoteService.getActivatedStudentQuotes().then(function(response){
                $scope.peopleQuoteItems = response.data.success.successData;
            });
            quoteService.getActivatedUniversityQuotes().then(function(response){
                $scope.universityQuoteItems = response.data.success.successData;
            })
        }

        function _rotateSlide(){
            if($scope.firstSlide){
                $scope.secondSlide = true;
                $scope.firstSlide = false;

            }else{
                $scope.firstSlide = true;
                $scope.secondSlide = false;
            }
        }

        function _searchBook(valid){
            if(valid){
                $scope.showResult = true;
                $scope.searchingError=false;
                var campus=null;
                if($scope.$parent.loggedIn){
                    campus = identityService.getAuthorizedUserData().campusId;
                }else{
                    campus= storageService.getValue("universityCampusValue");
                }

                $state.go('app.bookBuy.bookSearch',{searchQuery: $scope.searchText,pageNumber:1,campus:campus});

            }
        }

        function _showRegister(valid){
            if(valid){
                $state.go("app.signup",{email:$scope.email});
            }
        }

    }


})();
