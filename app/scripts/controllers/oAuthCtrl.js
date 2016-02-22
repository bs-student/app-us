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
        .controller('OAuthCtrl', OAuthCtrl);

    OAuthCtrl.$inject = ["$state","$scope", '$q', '$log', 'universityService','identityService','userService','referralService'];

    function OAuthCtrl($state,$scope, $q, $log, universityService,identityService,userService,referralService) {



        checkIfUserLoggedIn();

        function checkIfUserLoggedIn(){
            if (identityService.getAuthorizedUserData() == null) {
                userService.getAuthorizedUserShortData(identityService.getAccessToken()).then(setUserData).catch(checkProblem);
            } else {
                if(identityService.getAuthorizedUserData().registrationStatus=="incomplete"){

                    $scope.userId = identityService.getAuthorizedUserData().userId;
                    $scope.email_for_user = emailNeeded(identityService.getAuthorizedUserData().email);
                    $scope.user={"setting_username":identityService.getAuthorizedUserData().username};

                }else if(identityService.getAuthorizedUserData().registrationStatus=="complete"){
                    $state.go('app.dashboard');
                }

            }
        }

        function setUserData (response) {
            identityService.setAuthorizedUserData(response.data.user);
            if(identityService.getAuthorizedUserData().registrationStatus=="incomplete"){
                $scope.userId = identityService.getAuthorizedUserData().userId;
                $scope.email_for_user = emailNeeded(identityService.getAuthorizedUserData().email);
                $scope.user={"setting_username":identityService.getAuthorizedUserData().username};
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



        $scope.completeRegistration = _completeRegistration;


        referralService.getReferralList(identityService.getAccessToken()).then(function(response){
            $scope.referrals = response.data;
        });

        $scope.states        = null;
        $scope.querySearch   = querySearch;
        $scope.selectedItemChange = selectedItemChange;
        $scope.searchTextChange   = searchTextChange;
        $scope.selectedItem = null;



        function querySearch (query) {

            var data ={'query':query,'access_token':identityService.getAccessToken()};
            var deferred = $q.defer();
            universityService.getUniversitiesForAutocomplete(data).then(function(response){
                deferred.resolve(response.data);
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

        function _completeRegistration(){

            var data =
            {
                    'referral':$scope.user.referral,
                    'campus':$scope.selectedItem.value,
                    'username':$scope.user.setting_username,
                    'serviceId': $scope.userId

            };

            var json = JSON.stringify(data);
            userService.setUpdatedSocialUserData(identityService.getAccessToken(),json).then(function (response){

                if(response.data.success!=undefined){
                        userService.getAuthorizedUserShortData(identityService.getAccessToken()).then(setAuthorizedUserData);

                }else if(response.data.children.username.errors!=undefined){
                    var error_message = "";
                    for(var i=0;i<response.data.children.username.errors.length;i++){
                        error_message+=response.data.children.username.errors[i]+"\n";
                    }
                    $scope.username_error_message = error_message;
                }else if(response.data.children.email.errors!=undefined){
                    var error_message = "";
                    for(var i=0;i<response.data.children.email.errors.length;i++){
                        error_message+=response.data.children.email.errors[i]+"\n";
                    }
                    $scope.email_error_message = error_message;
                }else if(response.data.children.referral.errors!=undefined){
                    var error_message = "";
                    for(var i=0;i<response.data.children.referral.errors.length;i++){
                        error_message+=response.data.children.referral.errors[i]+"\n";
                    }
                    $scope.referral_error_message = error_message;
                }else if(response.data.children.campus.errors!=undefined){
                    var error_message = "";
                    for(var i=0;i<response.data.children.campus.errors.length;i++){
                        error_message+=response.data.children.campus.errors[i]+"\n";
                    }
                    $scope.campus_error_message = error_message;
                }


            });


            function setAuthorizedUserData(response) {
                identityService.setAuthorizedUserData(response.data.user);
                $state.go('app.dashboard');
            }
        }

        function emailNeeded(email){
            var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
            return !re.test(email);

        }


    }


})();


