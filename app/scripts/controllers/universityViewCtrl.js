(function () {

    'use strict';

    app
        .controller('UniversityViewCtrl', UniversityViewCtrl);

    UniversityViewCtrl.$inject = ['$scope','$stateParams','campusService','identityService','ngTableParams','$filter','$state','responseService'];

    function UniversityViewCtrl($scope,$stateParams,campusService,identityService,ngTableParams,$filter,$state,responseService) {


        $scope.universityName=$stateParams.obj.universityName;
        $scope.universityUrl=$stateParams.obj.universityUrl;
        $scope.universityStatus=$stateParams.obj.universityStatus;
        $scope.universityId=$stateParams.obj.universityId;
        $scope.saveSingleCampus = _saveSingleCampus;
        $scope.showAddCampusPage = _showAddCampusPage;
        $scope.data = [];



        $scope.tableParams = new ngTableParams(
            {
                page: 1,            // show first page
                count: 10,           // count per page
                sorting: {
                    campusStatus: 'desc'
                }
            },

            {
                total: $scope.data.length, // length of data
                getData: function ($defer, params) {
                    var universityId = {'universityId':$stateParams.obj.universityId}
                    campusService.getCampusesByUniversity(identityService.getAccessToken(),universityId).then(function (response){
                        $scope.data = response.data.campuses;
                        $scope.campuses = $scope.data;
                        $defer.resolve(params.sorting() ?  $filter('orderBy')($scope.data, params.orderBy()) : $scope.data);
                    });
                }
            });

        function _saveSingleCampus(campus){
            campus.$edit = false;

            campusService.updateCampus(identityService.getAccessToken(),campus).then(function(response){
                if(response.data.success!=undefined){
                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successBody);

                }else{
                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorBody);

                    angular.forEach($scope.campuses, function(campus){
                        if(campus.id==response.data.error.campusId){
                            campus.campusName = response.data.error.campusName;
                            campus.campusStatus = response.data.error.campusStatus;
                        }
                    });
                }
            });
        }
        function _showAddCampusPage(){
            $state.go('admin.view_university.add_campus');
        }

    }


})();


