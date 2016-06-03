(function () {

    'use strict';

    app
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope','$state', 'identityService', 'userService', 'responseService', 'universityService', '$log', '$q'];

    function ProfileCtrl($scope, $state,identityService, userService, responseService, universityService, $log, $q) {

        if(!$scope.$parent.loggedIn){
            $state.go("app.login");
        }

        $scope.updatingProfile=false;

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "user";

        $scope.editProfile = _editProfile;
        $scope.cancelEditProfile = _cancelEditProfile;
        $scope.updateProfile = _updateProfile;

        $scope.querySearch = _querySearch;
        $scope.selectedItemChange = _selectedItemChange;
        $scope.searchTextChange = _searchTextChange;
        $scope.selectedItem = null;


        init();


        function init() {

            ($scope.profilePromise = userService.getAuthorizedUserFullData(identityService.getAccessToken())).then(function (response) {
                $scope.user = response.data.success.successData;

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    ($scope.profilePromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
                        identityService.setAccessToken(response.data);
                        init();
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }
            });

        }

        function _editProfile(user) {
            $scope.standardCellPhoneOnEdit = user.standardCellPhone;
            $scope.standardHomePhoneOnEdit = user.standardHomePhone;
            $scope.standardEmailOnEdit = user.standardEmail;
            $scope.updatingProfile = true;
        }

        function _cancelEditProfile() {
            $scope.user.standardCellPhone= $scope.standardCellPhoneOnEdit;
            $scope.user.standardHomePhone= $scope.standardHomePhoneOnEdit ;
            $scope.user.standardEmail = $scope.standardEmailOnEdit ;
            $scope.updatingProfile = false;
        }


        function _querySearch(query) {

            var data = {'query': query, 'access_token': identityService.getAccessToken()};
            var deferred = $q.defer();
            universityService.getUniversitiesForAutocomplete(data).then(function (response) {
                deferred.resolve(response.data.success.successData);
            });
            return deferred.promise;

        }

        function _searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function _selectedItemChange(item) {
            $scope.selectedItem = item;
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        function _updateProfile(valid) {

            if (valid) {

                var data = null;

                if ($scope.selectedItem != null) {
                    data = {campus: $scope.selectedItem.value,
                        standardHomePhone: $scope.user.standardHomePhone,
                        standardCellPhone: $scope.user.standardCellPhone,
                        standardEmail: $scope.user.standardEmail
                    }
                } else {
                    data = {campus:$scope.user.campusId, standardHomePhone: $scope.user.standardHomePhone,
                        standardCellPhone: $scope.user.standardCellPhone,
                        standardEmail: $scope.user.standardEmail}
                }

//                $scope.editingFullName = false;
//                $scope.editingUniversityCampus = false;

                ($scope.profilePromise =  userService.updateUserProfile(identityService.getAccessToken(), data)).then(function (response) {
                    $scope.user.campusId = response.data.success.successData.campusId;
                    $scope.user.campusName = response.data.success.successData.campusName;
                    $scope.user.universityName = response.data.success.successData.universityName;
                    $scope.user.stateName = response.data.success.successData.stateName ;
                    $scope.user.stateShortName = response.data.success.successData.stateShortName  ;
                    $scope.updatingProfile=false;
                    responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);


                }).catch(function (response) {
                    if (response.data.error_description == "The access token provided is invalid.") {
                        $scope.user.fullName = $scope.fullNameOnEdit;
                    } else if (response.data.error_description == "The access token provided has expired.") {
                        ($scope.profilePromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
                            identityService.setAccessToken(response.data);
                            _updateProfile(valid);
                        });
                    } else if (response.data.error != undefined) {
                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
//                        $scope.user.fullName = $scope.fullNameOnEdit;
                    } else {
                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
//                        $scope.user.fullName = $scope.fullNameOnEdit;
                    }
                });
            }
        }



    }


})();
