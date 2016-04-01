(function () {

    'use strict';


    app
        .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['$q','$log','$scope', 'identityService', '$state', "securityService", 'userService','referralService','universityService','responseService'];

    function SignupCtrl($q,$log,$scope, identityService, $state, securityService, userService,referralService,universityService,responseService) {


        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "signup";
        setUpForm();
        $scope.showCreateNewUniversity = _showCreateNewUniversity;
        $scope.register=_register;
        $scope.createUniversityCampusName=false;



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


        function _register(valid){


            if(valid){

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
                        responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
                        $state.go('app.dashboard');
                    }

                }).catch(showError);
            }

        }

        function showError(response){
            var errorDescription="";
            if(response.data.error.errorData.children!=undefined){
                $scope.user.password=null;
                $scope.user.passwordConfirm=null;
                if(response.data.error.errorData.children.username.errors!=undefined){
                    errorDescription+= response.data.error.errorData.children.username.errors[0]+". ";
                }
                if(response.data.error.errorData.children.email.errors!=undefined){
                    errorDescription+= response.data.error.errorData.children.email.errors[0]+". ";
                }
            }

            responseService.showErrorToast(response.data.error.errorTitle,errorDescription+". "+response.data.error.errorDescription);
        }

        function _showCreateNewUniversity(){
            $state.go('university.add');

        }


    }


})();
