(function () {

    'use strict';

    app
        .controller('UniversityViewCtrl', UniversityViewCtrl);

    UniversityViewCtrl.$inject = ['$scope','$stateParams','campusService','identityService','ngTableParams','$filter','toastr','$state'];

    function UniversityViewCtrl($scope,$stateParams,campusService,identityService,ngTableParams,$filter,toastr,$state) {


        $scope.universityName=$stateParams.obj.universityName;
        $scope.universityUrl=$stateParams.obj.universityUrl;
        $scope.universityStatus=$stateParams.obj.universityStatus;
        $scope.saveSingleCampus = _saveSingleCampus;
        $scope.showAddCampusPage = _showAddCampusPage;
        var data = [];
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
        function _clearLastToast(){
            var toast = openedToasts.pop();
            toastr.clear(toast);
        }

        function _clearToasts () {
            toastr.clear();
        }

        $scope.tableParams = new ngTableParams(
            {
                page: 1,            // show first page
                count: 10,           // count per page
                sorting: {
                    campusStatus: 'desc'
                }
            },

            {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    var universityId = {'universityId':$stateParams.obj.universityId}
                    campusService.getCampusesByUniversity(identityService.getAccessToken(),universityId).then(function (response){
                        data = response.data.campuses;
                        $scope.campuses = data;
                        $defer.resolve(params.sorting() ?  $filter('orderBy')(data, params.orderBy()) : data);
                    });
                }
            });

        function _saveSingleCampus(campus){
            campus.$edit = false;

            campusService.updateCampus(identityService.getAccessToken(),campus).then(function(response){
                if(response.data.success!=undefined){
                    var toast = toastr[$scope.options.type](response.data.success.successBody, response.data.success.successTitle, {
                        iconClass: 'toast-success'+' ' + 'bg-success'
                    });
                    openedToasts.push(toast);

                }else{
                    var toast = toastr[$scope.options.type](response.data.error.errorBody, response.data.error.errorTitle, {
                        iconClass: 'toast-error'+' ' + 'bg-error'
                    });
                    openedToasts.push(toast);
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


