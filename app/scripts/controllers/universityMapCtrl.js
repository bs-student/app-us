(function () {

    'use strict';

    app
        .controller('UniversityMapCtrl', UniversityMapCtrl);

    UniversityMapCtrl.$inject = ['$q','$log','$scope',  'universityService','responseService','campusService'];

    function UniversityMapCtrl($q,$log,$scope, universityService,responseService,campusService) {


        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "universityMap";


        $scope.campusDetails=null;
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
            campusService.getCampusDetailsWithUniversityAndState({campusId:item.value}).then(function(response){
                $scope.campusDetails = response.data.success.successData[0];
            }).catch(function(response){
                responseService.showErrorToast("Sorry Something Went Wrong","Please Search again");
            });
            $log.info('Item changed to ' + JSON.stringify(item));
        }


    }


})();


