(function () {

    'use strict';

    app
        .controller('BookBuyCtrl', BookBuyCtrl);

    BookBuyCtrl.$inject = ['$q','$log','$scope','universityService','responseService', 'identityService','$stateParams','$state','storageService'];

    function BookBuyCtrl($q,$log,$scope, universityService,responseService,identityService,$stateParams,$state,storageService) {




        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "buyBook";

        $scope.searchingError = false;
        $scope.searchingProgress=true;
        $scope.searchBook = _searchBook;
        $scope.changePage = _changePage;

        $scope.bookSearchResult = null;

        $scope.maxSize = 10;
        $scope.totalSearchResults = 0;

        $scope.currentPage = 1;

        $scope.viewType = 'List';
        $scope.showResult = false;
        $scope.sortType = "bookTitle";


        init();

        function init(){
            $scope.searchUniversity = storageService.getValue("universityCampusDisplay");
            if($scope.searchUniversity==null){
                $scope.noUniversitySelected=true;
            }
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

                if(item!=undefined){
                    $scope.noUniversitySelected=false;
                    storageService.setValue('universityCampusDisplay',item.display);
                    storageService.setValue('universityCampusValue',item.value);
                    $scope.selectedItem = item;
                }

//                $log.info('Item changed to ' + JSON.stringify(item));
            }
        }



        function _changePage(currentPage) {
            $scope.searchingError=false;
            var campus=null;
            if($scope.$parent.loggedIn){
                campus = identityService.getAuthorizedUserData().campusId;
            }else{
                campus= storageService.getValue("universityCampusValue");
            }
            $state.go('app.bookBuy.bookSearch',{searchQuery: $scope.searchText,pageNumber:currentPage,campus:campus});

        }

        function _searchBook(valid) {

            if (valid) {

                $scope.showResult = true;
                $scope.searchingError=false;
                var campus=null;
                if($scope.$parent.loggedIn){
                    campus = identityService.getAuthorizedUserData().campusId;
                }else{
                    campus= storageService.getValue("universityCampusValue");
                }

                $state.go('app.bookBuy.bookSearch',{searchQuery: $scope.searchText,pageNumber:1,campus:campus});

            }

        }



    }


})();


