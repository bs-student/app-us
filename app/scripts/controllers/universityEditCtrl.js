(function () {

    'use strict';

    app
        .controller('UniversityManagementCtrl', UniversityManagementCtrl);

    UniversityManagementCtrl.$inject = ['$state', 'identityService', 'universityService', '$scope', '$filter', '$q', 'ngTableParams', 'responseService'];

    function UniversityManagementCtrl($state, identityService, universityService, $scope, $filter, $q, ngTableParams, responseService) {

//        start
        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "user";
//        end
        $scope.saveSingleUniversity = _saveSingleUniversity;
        $scope.editSelectedUniversities = _editSelectedUniversities;
        $scope.saveEditedSelectedUniversities = _saveEditedSelectedUniversities;
//        $scope.addOrRemoveSelectedUniversities = _addOrRemoveSelectedUniversities;
        $scope.showAddUniversityPage = _showAddUniversityPage;
        $scope.viewUniversityDetails = _viewUniversityDetails;
        $scope.activateSelectedUniversities = _activateSelectedUniversities;
        $scope.deleteUniversity = _deleteUniversity;
//        var selected_all = false;
//        var selectedUniversityList = [];
        var data = [];


//start
        $scope.editRow=_editRow;
        $scope.cancelEditRow=_cancelEditRow;
        $scope.addOrRemoveSelectedUniversities = _addOrRemoveSelectedUniversities;

        var selectedUniversityList = [];
        var selected_all = false;
        $scope.checkboxes = { 'checked': false, items: {} };

        $scope.nonApprovedUniversities = [];
        $scope.activatedUniversities = [];
        $scope.deactivatedUniversities = [];

        init();

        function init() {

            selectedUniversityList = [];
            getPendingUniversities();
            getActivatedUniversities();
            getDeactivatedUiversities();
        }


        function getPendingUniversities() {
            $scope.tableParams = new ngTableParams(
                {
                    page: 1,            // show first page
                    count: 10,           // count per page
                    filter: {
                        campus: '' // initial filter
                    },
                    sorting: {
                        creationDateTime: 'desc'// initial sorting
                    }
                },

                {
                    total: $scope.nonApprovedUniversities.length, // length of data
                    getData: getData
                });

            function getData($defer, params) {
                var queryData =
                {
                    "searchQuery": params.filter().campus,
                    "pageNumber": params.page(),
                    "pageSize": params.count(),
                    "sort": params.sorting()
                };

                ($scope.universityPromise = universityService.getAllNonApprovedUniversities(identityService.getAccessToken(), queryData)).then(function (response) {

                    $scope.nonApprovedUniversities = response.data.success.successData.universities.totalUniversities;
                    $defer.resolve($scope.nonApprovedUniversities);
                    params.total(response.data.success.successData.universities.totalNumber);

                }).catch(function (response) {

                    if (response.data.error_description == "The access token provided is invalid.") {
                        $scope.$parent.logout();
                    } else if (response.data.error_description == "The access token provided has expired.") {
                        ($scope.universityPromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
                            identityService.setAccessToken(response.data);
                            getData($defer, params);
                        });
                    } else if (response.data.error != undefined) {
                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);

                    } else {
                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                    }

                });
            }
        }


        function getActivatedUniversities() {

            $scope.activatedTableParams = new ngTableParams(
                {
                    page: 1,            // show first page
                    count: 10,           // count per page
                    filter: {
                        campus: '' // initial filter
                    },
                    sorting: {
                        creationDateTime: 'desc'// initial sorting
                    }
                },

                {
                    total: $scope.activatedUniversities.length, // length of data
                    getData: getData
                });

            function getData($defer, params) {
                var queryData =
                {
                    "searchQuery": params.filter().campus,
                    "pageNumber": params.page(),
                    "pageSize": params.count(),
                    "sort": params.sorting()
                };

                ($scope.activatedUniversityPromise = universityService.getAllActivatedUniversities(identityService.getAccessToken(), queryData)).then(function (response) {

                    $scope.activatedUniversities = response.data.success.successData.universities.totalUniversities;
                    $defer.resolve($scope.activatedUniversities);
                    params.total(response.data.success.successData.universities.totalNumber);

                }).catch(function (response) {

                    if (response.data.error_description == "The access token provided is invalid.") {
                        $scope.$parent.logout();
                    } else if (response.data.error_description == "The access token provided has expired.") {
                        ($scope.activatedUniversityPromise= identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
                            identityService.setAccessToken(response.data);
                            getData($defer, params);
                        });
                    } else if (response.data.error != undefined) {
                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);

                    } else {
                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                    }

                });
            }
        }

        function getDeactivatedUiversities() {

            $scope.deactivatedTableParams = new ngTableParams(
                {
                    page: 1,            // show first page
                    count: 10,           // count per page
                    filter: {
                        campus: '' // initial filter
                    },
                    sorting: {
                        creationDateTime: 'desc'// initial sorting
                    }
                },

                {
                    total: $scope.deactivatedUniversities.length, // length of data
                    getData: getData
                });

            function getData($defer, params) {
                var queryData =
                {
                    "searchQuery": params.filter().campus,
                    "pageNumber": params.page(),
                    "pageSize": params.count(),
                    "sort": params.sorting()
                };

                ($scope.deactivatedUniversityPromise = universityService.getAllDeactivatedUniversities(identityService.getAccessToken(), queryData)).then(function (response) {

                    $scope.deactivatedUniversities = response.data.success.successData.universities.totalUniversities;
                    $defer.resolve($scope.deactivatedUniversities);
                    params.total(response.data.success.successData.universities.totalNumber);

                }).catch(function (response) {

                    if (response.data.error_description == "The access token provided is invalid.") {
                        $scope.$parent.logout();
                    } else if (response.data.error_description == "The access token provided has expired.") {
                        ($scope.deactivatedUniversityPromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
                            identityService.setAccessToken(response.data);
                            getData($defer, params);
                        });
                    } else if (response.data.error != undefined) {
                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);

                    } else {
                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                    }

                });
            }
        }


        function _editRow(row){
            row.$edit = true;
            row.universityNameOnEdit = row.universityName;
            row.universityUrlOnEdit = row.universityUrl;
//            row.statusOnEdit = row.enabled;
        }
        function _cancelEditRow(row){
            row.$edit = false;
            row.universityName = row.universityNameOnEdit;
            row.universityUrl = row.universityUrlOnEdit;
//            row.enabled = row.statusOnEdit;
        }
//end


//        $scope.tableParams = new ngTableParams(
//            {
//                page: 1,            // show first page
//                count: 10,           // count per page
//                filter: {
//                    universityName: ''       // initial filter
//                },
//                sorting: {
//                    universityStatus: 'desc' // initial sorting
//                }
//            },
//
//            {
//                total: data.length, // length of data
//                getData: function ($defer, params) {
//
//                    var queryData =
//                    {
//                        "searchQuery": params.filter().universityName,
//                        "pageNumber": params.page(),
//                        "pageSize": params.count()
//                    };
//                    universityService.getSearchUniversities(identityService.getAccessToken(), queryData).then(function (response) {
//
//                        data = response.data.universities;
//                        $scope.universities = data;
//
//                        $defer.resolve(params.sorting() ?  $filter('orderBy')(data, params.orderBy()) : data);
//                        params.total(response.data.totalNumber)
//                    });
//
//                }
//            });

        var inArray = Array.prototype.indexOf ?
            function (val, arr) {
                return arr.indexOf(val);
            } :
            function (val, arr) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === val) {
                        return i;
                    }
                }
                return -1;
            };

        $scope.names = function () {
            var def = $q.defer(),
                arr = [],
                names = [];
            angular.forEach(data, function (item) {
                if (inArray(item.universityName, arr) === -1) {
                    arr.push(item.universityName);
                    names.push({
                        'id': item.universityName,
                        'title': item.universityName
                    });
                }
            });
            def.resolve(names);
            return def;
        };

        $scope.checkboxes = { 'checked': false, items: {} };

        // watch for check all checkbox
        $scope.$watch('checkboxes.checked', function (value) {

            selected_all = value;
//                console.log(value);
            angular.forEach($scope.universities, function (item) {
                if (angular.isDefined(item.universityId)) {
//                        console.log($scope.checkboxes.items[item.id]);
                    $scope.checkboxes.items[item.universityId] = value;
                }
            });
        });

        // watch for data checkboxes
        $scope.$watch('checkboxes.items', function () {
//                console.log("calling individual");
            if (!$scope.universities) {
                return;
            }

            var checked = 0, unchecked = 0,
                total = $scope.universities.length;
            angular.forEach($scope.universities, function (item) {
                checked += ($scope.checkboxes.items[item.universityId]) || 0;
                unchecked += (!$scope.checkboxes.items[item.universityId]) || 0;
            });
            if ((unchecked === 0) || (checked === 0)) {
                $scope.checkboxes.checked = (checked === total);

            }
            if (unchecked > 0)selected_all = false;
//                console.log("Unchecked: "+unchecked+", Total: "+total);
            // grayed checkbox
            angular.element(document.getElementById('select_all')).prop('indeterminate', (checked !== 0 && unchecked !== 0));
        }, true);


        function _saveSingleUniversity(university) {
            saveEditedUniversity(university);
        }

        function _editSelectedUniversities() {
            if (selected_all) {
                $scope.selected_edit = true;
                angular.forEach($scope.universities, function (item) {
                    item.$edit = true;
                });
            } else {
                if (selectedUniversityList.length) {
                    $scope.selected_edit = true;
                    angular.forEach(selectedUniversityList, function (item) {
                        item.$edit = true;
                    });
                }
            }


        }

        function _saveEditedSelectedUniversities() {
            $scope.selected_edit = false;
            var data = [];
            angular.forEach($scope.universities, function (item) {
                if (item.$edit == true) {
                    data.push(item);
                }
            });

            console.log(data);
            universityService.saveUpdatedUniversityDataAdmin(identityService.getAccessToken(), data).then(setUniversityUpdateResponseToView);

        }

        function _activateSelectedUniversities() {
            var data = [];
            if (selected_all) {
                angular.forEach($scope.universities, function (item) {
                    item.universityStatus = "Activated";
                    data.push(item);
                });
            } else {
                if (selectedUniversityList.length) {
                    angular.forEach(selectedUniversityList, function (item) {
                        item.universityStatus = "Activated";
                        data.push(item);
                    });
                }
            }
            console.log(data);
            universityService.saveUpdatedUniversityDataAdmin(identityService.getAccessToken(), data).then(setUniversityUpdateResponseToView);

        }

        function _addOrRemoveSelectedUniversities(row) {
            if (selectedUniversityList.indexOf(row) > -1) {
                selectedUniversityList.splice(selectedUniversityList.indexOf(row), 1);
            } else {
                selectedUniversityList.push(row);
            }
        }


        function _deleteUniversity(university) {
            var data = {'deleteId': university.universityId}
            universityService.deleteUniversity(identityService.getAccessToken(), data).then(function (response) {
                console.log(response.data);
            });
        }

        function _showAddUniversityPage() {
            $state.go('admin.university.new');
        }

        function _viewUniversityDetails(university) {
            $state.go('admin.view_university', {obj: university})
        }

        function saveEditedUniversity(university) {
            var data = [];
            data.push(university);

            universityService.saveUpdatedUniversityDataAdmin(identityService.getAccessToken(), data).then(setUniversityUpdateResponseToView);
        }

        function setUniversityUpdateResponseToView(response) {

            angular.forEach(response.data, function (json) {

                if (json.children != undefined) {

                    if (json.children.universityName.errors != undefined) {


                        angular.forEach($scope.universities, function (university) {
                            if (university.universityId == json.children.universityId.value) {

                                university.university_name_message_class = "text-hotpink";
                                university.$edit = false;
                                university.university_name_message = json.children.universityName.errors[0];
                                university.universityName = json.children.universityName.value;
                                university.universityUrl = json.children.universityUrl.value;
                                university.universityStatus = json.children.universityStatus.value;
                            }
                        });
                    }
                    if (json.children.universityUrl.errors != undefined) {
                        angular.forEach($scope.universities, function (university) {
                            if (university.universityId == json.children.universityId.value) {

                                university.university_url_message_class = "text-hotpink";
                                university.$edit = false;
                                university.university_url_message = json.children.universityUrl.errors[0];
                                university.universityName = json.children.universityName.value;
                                university.universityUrl = json.children.universityUrl.value;
                                university.universityStatus = json.children.universityStatus.value;
                            }
                        });
                    }
                } else {
                    angular.forEach($scope.universities, function (university) {
                        if (university.universityId == json.universityId) {

                            university.university_name_message_class = "text-greensea";
                            university.$edit = false;
                            university.university_name_message = json.success;
                        }
                    });
                }


            });
        }


    }


})();


