(function () {

    'use strict';

    app
        .controller('NewsletterCtrl', NewsletterCtrl);

    NewsletterCtrl.$inject = ['$state','identityService', 'newsletterService', '$scope', '$filter', '$q', 'ngTableParams','responseService'];

    function NewsletterCtrl($state,identityService, newsletterService, $scope, $filter, $q, ngTableParams,responseService) {


        if(!$scope.$parent.adminUser){
            $state.go("app.login");
        }

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "user";

//        $scope.editRow=_editRow;
//        $scope.cancelEditRow=_cancelEditRow;
//        $scope.saveEditedRow = _saveEditedRow;
//        $scope.approveSelectedUsers = _approveSelectedUsers;

//        $scope.addOrRemoveSelectedUsers = _addOrRemoveSelectedUsers;

//        var selectedUserList = [];
//        var selected_all = false;
//        $scope.checkboxes = { 'checked': false, items: {} };

        $scope.subscribedEmails=[];
//        $scope.approvedUsers=[];
//        $scope.adminUsers=[];

        init();

        function init(){
//            selectedUserList=[];
            getSubscribedEmails();
//            getApprovedUsers();
//            getAdminUsers();
        }

        function getSubscribedEmails(){
            $scope.tableParams = new ngTableParams(
                {
                    page: 1,            // show first page
                    count: 10,           // count per page
                    filter: {
                        email: ''       // initial filter
                    },
                    sorting: {
                        lastUpdateDateTime: 'desc'     // initial sorting
                    }
                },

                {
                    total: $scope.subscribedEmails.length, // length of data
                    getData: getData
                });



            function getData($defer, params) {

                var queryData =
                {
                    "searchQuery": params.filter().email,
                    "pageNumber": params.page(),
                    "pageSize": params.count(),
                    "sort":params.sorting()
                };
                newsletterService.adminGetAllNewsletterEmails(identityService.getAccessToken(), queryData).then(function (response) {
                    $scope.subscribedEmails = response.data.success.successData.newsletterEmails.totalNewsletterEmails;
                    $defer.resolve($scope.subscribedEmails);
                    params.total(response.data.success.successData.newsletterEmails.totalNumber);

                }).catch(function (response) {

                    if (response.data.error_description == "The access token provided is invalid.") {
//                        $scope.$parent.logout();
                    } else if (response.data.error_description == "The access token provided has expired.") {
                        identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
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

//        function getApprovedUsers(){
//            $scope.approvedTableParams = new ngTableParams(
//                {
//                    page: 1,            // show first page
//                    count: 10,           // count per page
//                    filter: {
//                        username: ''       // initial filter
//                    },
//                    sorting: {
//                        username: 'asc'     // initial sorting
//                    }
//                },
//
//                {
//                    total: $scope.approvedUsers.length, // length of data
//                    getData: getApprovedData
//                });
//
//
//
//            function getApprovedData($defer, params) {
//
//                var queryData =
//                {
//                    "searchQuery": params.filter().username,
//                    "pageNumber": params.page(),
//                    "pageSize": params.count(),
//                    "sort":params.sorting()
//                };
//                adminUserService.getAllApprovedUsers(identityService.getAccessToken(), queryData).then(function (response) {
//                    $scope.approvedUsers = response.data.success.successData.users.totalUsers;
//                    $scope.approvedUsers= $filter('orderBy')($scope.approvedUsers, params.orderBy());
//                    $defer.resolve($scope.approvedUsers);
//                    params.total(response.data.success.successData.users.totalNumber);
//
//                }).catch(function (response) {
//
//                    if (response.data.error_description == "The access token provided is invalid.") {
////                        $scope.$parent.logout();
//                    } else if (response.data.error_description == "The access token provided has expired.") {
//                        identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
//                            identityService.setAccessToken(response.data);
//                            getApprovedData($defer, params);
//                        });
//                    } else if (response.data.error != undefined) {
//                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
//
//                    } else {
//                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
//                    }
//
//                });
//            }
//        }
//
//        function getAdminUsers(){
//            $scope.adminTableParams = new ngTableParams(
//                {
//                    page: 1,            // show first page
//                    count: 10,           // count per page
//                    filter: {
//                        username: ''       // initial filter
//                    },
//                    sorting: {
//                        username: 'asc'     // initial sorting
//                    }
//                },
//
//                {
//                    total: $scope.adminUsers.length, // length of data
//                    getData: getAdminData
//                });
//
//
//
//            function getAdminData($defer, params) {
//
//                var queryData =
//                {
//                    "searchQuery": params.filter().username,
//                    "pageNumber": params.page(),
//                    "pageSize": params.count(),
//                    "sort":params.sorting()
//                };
//                adminUserService.getAllAdminUsers(identityService.getAccessToken(), queryData).then(function (response) {
//                    $scope.adminUsers = response.data.success.successData.users.totalUsers;
//                    $scope.adminUsers= $filter('orderBy')($scope.adminUsers, params.orderBy());
//                    $defer.resolve($scope.adminUsers);
//                    params.total(response.data.success.successData.users.totalNumber);
//
//                }).catch(function (response) {
//
//                    if (response.data.error_description == "The access token provided is invalid.") {
////                        $scope.$parent.logout();
//                    } else if (response.data.error_description == "The access token provided has expired.") {
//                        identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
//                            identityService.setAccessToken(response.data);
//                            getAdminData($defer, params);
//                        });
//                    } else if (response.data.error != undefined) {
//                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
//
//                    } else {
//                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
//                    }
//
//                });
//            }
//        }
//
//
//        function _editRow(row){
//            row.$edit = true;
//            row.usernameOnEdit = row.username ;
//            row.statusOnEdit = row.enabled;
//        }
//        function _cancelEditRow(row){
//            row.$edit = false;
//            row.username =  row.usernameOnEdit;
//            row.enabled = row.statusOnEdit;
//        }
//
//        function _saveEditedRow(valid,row){
//
//            if(valid){
//                row.$edit=false;
//                if(row.enabled=="true"){
//                    row.enabled=true;
//                }else{
//                    row.enabled=false;
//                }
//                adminUserService.saveUpdatedUserDataAdmin(identityService.getAccessToken(),row).then(function (response) {
//                    responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);
//                    $scope.nonApprovedUsers.splice($scope.nonApprovedUsers.indexOf(row),1);
//
//                }).catch(function (response) {
//                    row.username =  row.usernameOnEdit;
//                    row.enabled = row.statusOnEdit;
//                    if (response.data.error_description == "The access token provided is invalid.") {
//
//                    } else if (response.data.error_description == "The access token provided has expired.") {
//                        identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
//                            identityService.setAccessToken(response.data);
//                            _saveEditedRow(valid,row);
//                        });
//                    } else if (response.data.error != undefined) {
//                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
//
//                    } else {
//                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
//                    }
//
//                });
//
//            }
//
//        }
//
//        function _addOrRemoveSelectedUsers(user){
//            if (selectedUserList.indexOf(user) > -1) {
//                selectedUserList.splice(selectedUserList.indexOf(user), 1);
//            } else {
//                selectedUserList.push(user);
//            }
//        }
//        // watch for check all checkbox
//        $scope.$watch('checkboxes.checked', function (value) {
//
//            selected_all = value;
//            angular.forEach($scope.nonApprovedUsers, function (item) {
//                if (angular.isDefined(item.userId)) {
//                    $scope.checkboxes.items[item.userId] = value;
//                }
//            });
//
//            if(value){
//                selectedUserList=[];
//                angular.forEach($scope.nonApprovedUsers, function (item) {
//                    selectedUserList.push(item);
//                });
//            }else{
//                selectedUserList=[];
//            }
//
//        });
//
//
//        function _approveSelectedUsers(){
//
//            if(selectedUserList.length>0){
//
//                adminUserService.approveUsers(identityService.getAccessToken(),selectedUserList).then(function(response){
//
//                    responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);
//                    init();
//                }).catch(function(response){
//                    if (response.data.error_description == "The access token provided is invalid.") {
//
//                    } else if (response.data.error_description == "The access token provided has expired.") {
//                        identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
//                            identityService.setAccessToken(response.data);
//                            _approveSelectedUsers();
//                        });
//                    } else if (response.data.error != undefined) {
//                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
//
//                    } else {
//                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
//                    }
//                });
//            }
//
//
//        }
//


    }


})();


