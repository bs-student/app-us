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
        .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['$q','$log','$scope', 'identityService', '$state', "securityService", 'userService','referralService','universityService','toastr', 'toastrConfig'];

    function SignupCtrl($q,$log,$scope, identityService, $state, securityService, userService,referralService,universityService,toastr,toastrConfig) {


        checkIfUserLoggedIn();
        var clientCredentialAccessToken = null;
        $scope.referralFieldError = false;
        $scope.campusFieldError= false;
        $scope.clearLastToast = _clearLastToast;
        $scope.clearToasts = _clearToasts;
        var openedToasts = [];
        $scope.toast = {
            colors: [
                {name:'success'},
                {name:'error'}
            ]
        };
        $scope.options = {
            position: 'toast-top-right',
            type: 'success',
            iconClass: $scope.toast.colors[0],
            timeout: '5000',
            extendedTimeout: '2000',
            html: false,
            closeButton: true,
            tapToDismiss: true,
            closeHtml: '<i class="fa fa-times"></i>'
        };


        $scope.register=_register;
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
            }else if(response.data.error_description=="The access token provided is invalid."){
                identityService.getClientCredentialAccessToken().then(setClientCredentialAccessToken);
            }
        }

        function setClientCredentialAccessToken(response){
            clientCredentialAccessToken = response.data.access_token;

            setUpForm()

        }
        function setAccessToken(response){
            identityService.setAccessToken(response.data);
            checkIfUserLoggedIn();
        }


        function setUpForm(){

            referralService.getReferralList(clientCredentialAccessToken).then(function(response){
                $scope.referrals = response.data;
            });

            $scope.states        = null;
            $scope.querySearch   = querySearch;
            $scope.selectedItemChange = selectedItemChange;
            $scope.searchTextChange   = searchTextChange;
            $scope.selectedItem = null;



            function querySearch (query) {

                var data ={'query':query,'access_token':clientCredentialAccessToken};
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

        }


        function _register(){
            $scope.referralFieldError = false;
            $scope.campusFieldError= false;
            campusValue = null;
            if($scope.selectedItem!=null)var campusValue = $scope.selectedItem;
            var data =
            {
                'fullName': $scope.user.fullName,
                'username':$scope.user.username,
                'email': $scope.user.email,
                'referral':$scope.user.referral,
                'campus':campusValue.value,
                'new_password': $scope.user.password,
                'confirm_password': $scope.user.passwordConfirm
            };

            var json = JSON.stringify(data);
            securityService.registerUser(data).then(function (response){
                if(response.data.success!=undefined){
                    openSuccessToast(response.data.success);

                }
                if(response.data.children!=undefined){
                    $scope.user.password=null;
                    $scope.user.passwordConfirm=null;
                    if(response.data.children.campus.errors!=undefined){
                        $scope.campusFieldError= true;
                    }
                    if(response.data.children.referral.errors!=undefined){
                        $scope.referralFieldError = true;
                    }
                }

            });
        }

        function openSuccessToast(data){
                var toast = toastr[$scope.options.type](data.messageBody, data.messageTitle, {
                    iconClass: 'toast-'+$scope.options.iconClass.name + ' ' + 'bg-'+$scope.options.iconClass.name
                });
                openedToasts.push(toast);
                $state.go('app.dashboard');
        }
        function _clearLastToast(){
            var toast = openedToasts.pop();
            toastr.clear(toast);
        }

        function _clearToasts () {
            toastr.clear();
        };


//
//
//
//        var vm = this;
//
//        $scope.loginViaGoogle = _loginViaGoogle;
//        $scope.loginViaFacebook = _loginViaFacebook;
//
//
//        /*if (identityService.getAccessToken() != null) {
//         $state.go('app.dashboard');
//         }*/
//        $scope.login = loginUser;
//
//        securityService.getLoginPage().then(setLoginPage);
//
//
//        function loginUser() {
//            vm.user._username = $scope.user._username;
//            vm.user._password = $scope.user._password;
//            vm.user._submit = "Login";
//            securityService.loginUser(vm.user).then(showDashboardPage);
//        }
//
//
//        function setLoginPage(response) {
//            vm.user = {};
//            vm.user._csrf_token = response.data.page_data.csrf_token;
//        }
//
//
//        function showDashboardPage(response) {
//
//            $scope.credential_error = null;
//            if (typeof response.data.page_data != "undefined") {
//                $scope.credential_error = response.data.page_data.error;
//            } else if (typeof response.data.user != "undefined") {
//                if (response.data.user.message = "Login Successful") {
//                    identityService.getInitialAccessToken(vm.user).then(getAuthorizedUserData);
//
//                }
//
//            }
//        }
//
//        function getAuthorizedUserData(response) {
//            identityService.setAccessToken(response.data);
//            userService.getAuthorizedUserData(response.data.access_token).then(setAuthorizedUserData);
//
//        }
//
//        function setAuthorizedUserData(response) {
//            identityService.setAuthorizedUserData(response.data.user);
//            $state.go('app.dashboard');
//        }
//
//        function _loginViaGoogle() {
//
//            securityService.fetchGoogleAccessToken().then(function(token_response){
//                securityService.fetchGoogleUserData(token_response.access_token).then(function(response){
//
//                    var requestData={
//                        'socialService':'google',
//                        'email':response.data.email,
//                        'googleId':response.data.id,
//                        'username':response.data.given_name+response.data.family_name+Math.floor(Math.random() * 100000) + 1,
//                        'fullName': response.data.name,
//                        'googleEmail':response.data.email,
//                        'googleToken': token_response.access_token
//                    }
//
//                    securityService.loginUserViaSocialService(requestData).then(loginViaSocialServiceNextStep);
//
//                });
//
//            });
//
//
//        }
//
//        function _loginViaFacebook(){
//            securityService.fetchFacebookAccessToken().then(function(token_response) {
//                    console.log(token_response.authResponse);
//                    securityService.fetchFacebookUserData(token_response.authResponse.userID).then(function(response){
//
//                        var requestData={
//                            'socialService':'facebook',
//                            'email':response.email,
//                            'facebookId':response.id,
//                            'username':response.first_name+response.last_name+Math.floor(Math.random() * 100000) + 1,
//                            'fullName': response.name,
//                            'facebookEmail':response.email,
//                            'facebookToken': token_response.authResponse.accessToken
//                        }
//
//                        console.log(response);
//                        securityService.loginUserViaSocialService(requestData).then(loginViaSocialServiceNextStep);
//                    });
//
//                }
//            );
//        }
//
//        function loginViaSocialServiceNextStep(response){
//
//            if(response.data.userData!=undefined){
//                identityService.getSocialPluginAccessToken(response.data.userData.userId).then(function(tokenResponse){
//                    identityService.setAccessToken(tokenResponse.data);
//                    identityService.setAuthorizedUserData(response.data.userData);
//
//                    if(response.data.userData.registrationStatus=="incomplete"){
//                        $state.go('registration.complete');
//                    }else{
//                        $state.go('app.dashboard');
//                    }
//
//                });
//            }
//
//
//
//        }


    }


})();
