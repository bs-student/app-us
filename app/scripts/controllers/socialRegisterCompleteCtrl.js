(function () {

    'use strict';


    app
        .controller('SocialRegisterCompleteCtrl', SocialRegisterCompleteCtrl);

    SocialRegisterCompleteCtrl.$inject = ['$stateParams',"$state","$scope", '$q', '$log', 'universityService','identityService','userService','referralService','responseService','securityService','wishListService'];

    function SocialRegisterCompleteCtrl($stateParams,$state,$scope, $q, $log, universityService,identityService,userService,referralService,responseService,securityService,wishListService) {

        $scope.user = $stateParams.user;

        if($scope.user==undefined){
            $state.go('app.login');
        }

        $scope.completeRegistration = _completeRegistration;


        setUpForm();


        function setUpForm(){

            referralService.getReferralList().then(function(response){
                $scope.referrals = response.data.success.successData;
            }).catch(function(response){
                responseService.showErrorToast("Something Went Wrong","Please Reload Again");
            });

            $scope.states        = null;
            $scope.querySearch   = querySearch;
            $scope.selectedItemChange = selectedItemChange;
            $scope.searchTextChange   = searchTextChange;
            $scope.selectedItem = null;



            function querySearch (query) {

                var data ={'query':query};
                var deferred = $q.defer();
                universityService.getUniversitiesForAutocomplete(data).then(function(response){
                    deferred.resolve(response.data.success.successData);
                }).catch(function(response){
                    responseService.showErrorToast("Something Went Wrong","Please Reload Again");
                });
                return deferred.promise;

            }

            function searchTextChange(text) {
                $log.info('Text changed to ' + text);
            }
            function selectedItemChange(item) {
                $scope.selectedItem = item;
                $log.info('Item changed to ' + JSON.stringify(item));
            }

        }

        function _completeRegistration(valid){

            if(valid){
                $scope.user.campus = $scope.selectedItem.value;
                var data =
                {
                    'user':$scope.user
                };
                var json = JSON.stringify(data);
                securityService.updateSocialUser(json).then(function (response){

                    identityService.getSocialPluginAccessToken(response.data.success.successData.serviceId).then(getAuthorizedUserData).catch(showUnknownError);

                }).catch(function(response){
                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
                });



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

            if(response.data.success.successData.role.indexOf("ROLE_ADMIN_USER")>=0){
                $scope.$parent.adminUser=true;
            }else{
                $scope.$parent.adminUser=false;
            }
            $scope.$parent.loggedIn = true;
            $scope.$parent.username = response.data.success.successData.username;

            if($scope.bookId!=undefined){
                wishListService.addBookToWishList(identityService.getAccessToken(),{bookId:$scope.bookId}).then(function(response){
                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
                }).catch(function(response){
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                });
            }
            $state.go('app.dashboard');

        }
        function showUnknownError(){
            responseService.showErrorToast("Login Unsuccessful","Sorry, we couldn't log you in. Please Try again");
        }



    }


})();


