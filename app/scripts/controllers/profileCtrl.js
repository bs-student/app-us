(function () {

    'use strict';

    app
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope','identityService','userService','responseService','universityService','$log','$q'];

    function ProfileCtrl($scope,identityService,userService,responseService,universityService,$log,$q) {
        $scope.editFullName =false;
        $scope.editUniversityCampus =false;
        $scope.updateUniversity = _updateUniversity;
        $scope.updateFullName = _updateFullName;
        $scope.querySearch   = _querySearch;
        $scope.selectedItemChange = _selectedItemChange;
        $scope.searchTextChange   = _searchTextChange;
        $scope.selectedItem = null;


        userService.getAuthorizedUserFullData(identityService.getAccessToken()).then(function(response){
            $scope.user = response.data.user;
        });


        function _querySearch (query) {

            var data ={'query':query,'access_token':identityService.getAccessToken()};
            var deferred = $q.defer();
            universityService.getUniversitiesForAutocomplete(data).then(function(response){
                deferred.resolve(response.data);
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

        function _updateFullName(user){

            userService.updateFullName(identityService.getAccessToken(),user).then(function(response){
                $scope.editFullName = false;
                if(response.data.success!=undefined){
                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successBody);
                }
                if(response.data.error!=undefined){
                    $scope.user.fullName=response.data.error.fullName;
                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorBody);
                }
            });
        }
        function _updateUniversity(){
            $scope.editUniversityCampus = false;
            var data=null;
            if($scope.selectedItem!=null){
                data={id:$scope.user.id,'campus':$scope.selectedItem.value}
            }else{
                data={id:$scope.user.id}
            }
            userService.updateUserUniversityCampus(identityService.getAccessToken(),data).then(function(response){
                if(response.data.success!=undefined){
                    $scope.user.universityName = response.data.success.universityName;
                    $scope.user.campusName = response.data.success.campusName;
                    $scope.user.countryName = response.data.success.countryName;
                    $scope.user.stateShortName = response.data.success.stateShortName;

                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successBody);
                }
                if(response.data.error!=undefined){
//                    $scope.user.fullName=response.data.error.fullName;
                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorBody);
                }
            });
        }

    }


})();
