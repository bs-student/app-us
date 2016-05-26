(function () {

    'use strict';


    app
        .controller('OAuthCtrl', OAuthCtrl);

    OAuthCtrl.$inject = ['$stateParams',"$state","$scope", '$q', '$log', 'universityService','identityService','userService','referralService','responseService','securityService'];

    function OAuthCtrl($stateParams,$state,$scope, $q, $log, universityService,identityService,userService,referralService,responseService,securityService) {

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

//                console.log(data);
                var json = JSON.stringify(data);
                securityService.updateSocialUser(json).then(function (response){

//                    if(response.data.success!=undefined){
//                        userService.getAuthorizedUserShortData(identityService.getAccessToken()).then(setAuthorizedUserData);
//
//                    }else if(response.data.children.username.errors!=undefined){
//                        var error_message = "";
//                        for(var i=0;i<response.data.children.username.errors.length;i++){
//                            error_message+=response.data.children.username.errors[i]+"\n";
//                        }
//                        $scope.username_error_message = error_message;
//                    }else if(response.data.children.email.errors!=undefined){
//                        var error_message = "";
//                        for(var i=0;i<response.data.children.email.errors.length;i++){
//                            error_message+=response.data.children.email.errors[i]+"\n";
//                        }
//                        $scope.email_error_message = error_message;
//                    }else if(response.data.children.referral.errors!=undefined){
//                        var error_message = "";
//                        for(var i=0;i<response.data.children.referral.errors.length;i++){
//                            error_message+=response.data.children.referral.errors[i]+"\n";
//                        }
//                        $scope.referral_error_message = error_message;
//                    }else if(response.data.children.campus.errors!=undefined){
//                        var error_message = "";
//                        for(var i=0;i<response.data.children.campus.errors.length;i++){
//                            error_message+=response.data.children.campus.errors[i]+"\n";
//                        }
//                        $scope.campus_error_message = error_message;
//                    }


                }).catch(function(response){
                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
                });



            }

        }



        function setAuthorizedUserData(response) {
            identityService.setAuthorizedUserData(response.data.user);
            $state.go('app.dashboard');
        }














//        $scope.states        = null;
//        $scope.querySearch   = querySearch;
//        $scope.selectedItemChange = selectedItemChange;
//        $scope.searchTextChange   = searchTextChange;
//        $scope.selectedItem = null;
//
//
//
//        function querySearch (query) {
//
//            var data ={'query':query,'access_token':identityService.getAccessToken()};
//            var deferred = $q.defer();
//            universityService.getUniversitiesForAutocomplete(data).then(function(response){
//                deferred.resolve(response.data);
//            });
//            return deferred.promise;
//
//        }
//
//        function searchTextChange(text) {
//            $log.info('Text changed to ' + text);
//        }
//        function selectedItemChange(item) {
//            $scope.selectedItem = item;
//            $log.info('Item changed to ' + JSON.stringify(item));
//        }



        function emailNeeded(email){
            var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
            return !re.test(email);

        }


    }


})();


