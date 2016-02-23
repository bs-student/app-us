(function () {

    'use strict';


    app
        .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['$q','$log','$scope', 'identityService', '$state', "securityService", 'userService','referralService','universityService','toastr'];

    function SignupCtrl($q,$log,$scope, identityService, $state, securityService, userService,referralService,universityService,toastr) {


        checkIfUserLoggedIn();
        var clientCredentialAccessToken = null;
        $scope.referralFieldError = false;
        $scope.campusFieldError= false;
        $scope.showCreateNewUniversity = _showCreateNewUniversity;
        $scope.createUniversityCampusName=false;
        $scope.clearLastToast = _clearLastToast;
        $scope.clearToasts = _clearToasts;
//        $scope.fetchStates = _fetchStates;
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
            var data =
            {
                'fullName': $scope.user.fullName,
                'username':$scope.user.username,
                'email': $scope.user.email,
                'referral':$scope.user.referral,
                'new_password': $scope.user.password,
                'confirm_password': $scope.user.passwordConfirm
            };
            if(!$scope.createUniversityCampusName && $scope.selectedItem!=null){
                var campusValue = $scope.selectedItem;
                data['campus']=campusValue.value;
            }else{
                data['campusName']=$scope.user.campusName;
                data['state']=$scope.user.state;
                data['university']=$scope.user.university;
            }


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

        function _showCreateNewUniversity(){
            $state.go('university.add');

        }


    }


})();
