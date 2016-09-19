(function () {

    'use strict';

    app
        .controller('CampusCreateCtrl', CampusCreateCtrl);

    CampusCreateCtrl.$inject = ['$state','$scope','identityService','countryService','stateService','responseService','campusService'];

    function CampusCreateCtrl($state,$scope,identityService,countryService,stateService,responseService,campusService) {

        $scope.fetchStates = _fetchStates;
        $scope.saveNewCampus = _saveNewCampus;
        $scope.cancelAddingCampus = _cancelAddingCampus;


        countryService.getCountryList(identityService.getAccessToken()).then(function(response){
            console.log(response.data);
            $scope.countries = response.data;
        });

        function _fetchStates(countryId){
            var data={'countryId':countryId}
            stateService.getStateListByCountry(identityService.getAccessToken(),data).then(function(response){
                $scope.states = response.data;
            });
        }

        function _saveNewCampus(campus){
            campus.universityId = $scope.$parent.universityId;
            campusService.addCampus(identityService.getAccessToken(),campus).then(function (response){
                if(response.data.error!=undefined){
                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorBody);


                }else if(response.data.success!=undefined){
                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successBody);
                    $scope.$parent.data.push(campus);
                    $scope.$parent.tableParams.reload();
                    $state.go('admin.view_university');
                }
            });

        }
        function _cancelAddingCampus(){
            $state.go('admin.view_university');
        }



    }


})();


