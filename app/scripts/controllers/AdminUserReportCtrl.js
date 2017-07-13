(function () {

    'use strict';

    app
        .controller('AdminDashboardCtrl', AdminDashboardCtrl);

    AdminDashboardCtrl.$inject = ['$moment', '$timeout', '$state', 'identityService', 'adminDashboardService', '$scope', '$filter', '$q', 'ngTableParams', 'responseService', 'SERVER_CONSTANT'];

    function AdminDashboardCtrl($moment, $timeout, $state, identityService, adminDashboardService, $scope, $filter, $q, ngTableParams, responseService, SERVER_CONSTANT) {


        $scope.imageHostPath = SERVER_CONSTANT.IMAGE_HOST_PATH;
        $scope.$parent.main.title = "Dashboard";
        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "user";

        $scope.init = _init;

        $scope.startDate = $moment().subtract(6, 'days').format('MMMM D, YYYY');
        $scope.endDate = $moment().format('MMMM D, YYYY');
        $scope.rangeOptions = {
            ranges: {
                Today: [$moment(), $moment()],
                Yesterday: [$moment().subtract(1, 'days'), $moment().subtract(1, 'days')],
                'Last 7 Days': [$moment().subtract(6, 'days'), $moment()],
                'Last 30 Days': [$moment().subtract(29, 'days'), $moment()],
                'This Month': [$moment().startOf('month'), $moment().endOf('month')],
                'Last Month': [$moment().subtract(1, 'month').startOf('month'), $moment().subtract(1, 'month').endOf('month')]
            },
            opens: 'left',
            startDate: $moment().subtract(6, 'days'),
            endDate: $moment(),
            parentEl: '#content'
        };


        $scope.socialUsersPieChartLabels = ["Normal Registered Users", "Facebook Users", "Google Users"];
        $scope.socialUsersPieChartData = [0, 0, 0];

        $scope.bookDealMethodPieChartLabels = ["Buyer To Seller", "Seller To Buyer", "Message Board"];
        $scope.bookDealMethodPieChartData = [0, 0, 0];

        $scope.loggedInAndRegisteredLineLabels = [];
        $scope.loggedInAndRegisteredLineSeries = ['Logged In', 'Registered'];
        $scope.loggedInAndRegisteredLineData = [];
        $scope.loggedInAndRegisteredLineOnClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.loggedInAndRegisteredLineDatasetOverride = [
            { yAxisID: 'y-axis-1' }
        ];
        $scope.loggedInAndRegisteredLineOptions = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            }
        };


        $scope.bookDealAndContactLineLabels = [];
        $scope.bookDealAndContactLineSeries = ['Book Deal', 'Contact'];
        $scope.bookDealAndContactLineData = [];





        _init();

        function _init(){
            getNormalAndSocialUserDataWithDateRange();
            getLoginAndRegisteredUserDataWithDateRange();
            getBookDealAndContactDataWithDateRange();
            getBookDealMethodDataWithDateRange();

        }

        function getNormalAndSocialUserDataWithDateRange() {
            var userData = {
                startDate: $scope.startDate,
                endDate: $scope.endDate
            };

            ($scope.socialUserPiePromise = adminDashboardService.getNormalAndSocialUserData(identityService.getAccessToken(), userData)).then(function (response) {

                $scope.totalUserCount = response.data.success.successData.userData.totalActiveUsers;
                $scope.totalSocialUserCount = response.data.success.successData.userData.totalActiveSocialUsers;
                $scope.socialUsersPieChartData = [
                    parseInt(response.data.success.successData.userData.activeNormalUsers, 10),
                    parseInt(response.data.success.successData.userData.activeFacebookUsers, 10),
                    parseInt(response.data.success.successData.userData.activeGoogleUsers, 10)];

                $scope.pieChartUsers = parseInt(response.data.success.successData.userData.activeNormalUsers, 10) +
                    parseInt(response.data.success.successData.userData.activeFacebookUsers, 10) +
                    parseInt(response.data.success.successData.userData.activeGoogleUsers, 10);

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    ($scope.socialUserPiePromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
                        identityService.setAccessToken(response.data);
                        getNormalAndSocialUserDataWithDateRange();
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, errorDescription + ". " + response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });
        }


        function getLoginAndRegisteredUserDataWithDateRange(){
            var userData = {
                startDate: $scope.startDate,
                endDate: $scope.endDate
            };

            ($scope.loggedInAndRegisteredUserLinePromise = adminDashboardService.getLoginAndRegistrationUserData(identityService.getAccessToken(), userData)).then(function (response) {
                $scope.loggedInAndRegisteredLineLabels = response.data.success.successData.userData.dateData;
                $scope.loggedInAndRegisteredLineData=[response.data.success.successData.userData.loginData,response.data.success.successData.userData.registrationData];

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    ($scope.loggedInAndRegisteredUserLinePromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
                        identityService.setAccessToken(response.data);
                        getLoginAndRegisteredUserDataWithDateRange();
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, errorDescription + ". " + response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });
        }

        function getBookDealAndContactDataWithDateRange(){
            var userData = {
                startDate: $scope.startDate,
                endDate: $scope.endDate
            };

            ($scope.bookDealAndContactLinePromise = adminDashboardService.getBookDealAndContactData(identityService.getAccessToken(), userData)).then(function (response) {
                $scope.bookDealAndContactLineLabels = response.data.success.successData.userData.dateData;
                $scope.bookDealAndContactLineData=[response.data.success.successData.userData.bookDealData,response.data.success.successData.userData.contactData];

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    ($scope.bookDealAndContactLinePromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
                        identityService.setAccessToken(response.data);
                        getBookDealAndContactDataWithDateRange();
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, errorDescription + ". " + response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });
        }

        function getBookDealMethodDataWithDateRange(){
            var userData = {
                startDate: $scope.startDate,
                endDate: $scope.endDate
            };

            ($scope.bookDealMthodPiePromise = adminDashboardService.getBookDealMethodData(identityService.getAccessToken(), userData)).then(function (response) {

                $scope.bookDealMethodPieChartData = [
                    parseInt(response.data.success.successData.bookDealData.buyerToSellerDeals, 10),
                    parseInt(response.data.success.successData.bookDealData.sellerToBuyerDeals, 10),
                    parseInt(response.data.success.successData.bookDealData.messageBoardDeals, 10)];

                $scope.bookDealMethodRows = parseInt(response.data.success.successData.bookDealData.buyerToSellerDeals, 10) +
                    parseInt(response.data.success.successData.bookDealData.sellerToBuyerDeals, 10) +
                    parseInt(response.data.success.successData.bookDealData.messageBoardDeals, 10);

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    ($scope.bookDealMthodPiePromise  = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
                        identityService.setAccessToken(response.data);
                        getBookDealMethodDataWithDateRange();
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, errorDescription + ". " + response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });
        }



//
//        var selectedUserList = [];
//        var selected_all = false;
//        $scope.checkboxes = { 'checked': false, items: {} };
//
//        $scope.nonApprovedUsers=[];
//        $scope.approvedUsers=[];
//        $scope.adminUsers=[];
//
//        $scope.verifiedStatus = [
//            {
//                'title':"Yes",
//                'id':true
//            },
//            {
//                'title':"No",
//                'id':false
//            }
//        ];
//
//        $scope.activationStatus = [
//            {
//                'title':"Activated",
//                'id':true
//            },
//            {
//                'title':"Deactivated",
//                'id':false
//            }
//        ]
//
//        init();
//
//        function init(){
//            selectedUserList=[];
//            getPendingUsers();
//            getApprovedUsers();
//            getAdminUsers();
//        }
//        function getPendingUsers(){
//            $scope.tableParams = new ngTableParams(
//                {
//                    page: 1,            // show first page
//                    count: 10,           // count per page
//                    filter: {
//                        username: '',
//                        email: '',           // initial filter
//                        fullName: '',
//                        enabled: ''
//                    },
//                    sorting: {
//                        registrationDateTime: 'desc'// initial sorting
//                    }
//                },
//
//                {
//                    total: $scope.nonApprovedUsers.length, // length of data
//                    getData: getData
//                });
//
//
//
//            function getData($defer, params) {
//
//                var queryData =
//                {
//                    "searchQuery": params.filter().username,
//                    "emailQuery": params.filter().email,
//                    "fullNameQuery": params.filter().fullName,
//                    "enabledQuery": params.filter().enabled,
//                    "pageNumber": params.page(),
//                    "pageSize": params.count(),
//                    "sort":params.sorting()
//                };
//                ($scope.userPromise = adminUserService.getAllNonApprovedUsers(identityService.getAccessToken(), queryData)).then(function (response) {
//                    $scope.nonApprovedUsers = response.data.success.successData.users.totalUsers;
//                    $defer.resolve($scope.nonApprovedUsers);
//                    params.total(response.data.success.successData.users.totalNumber);
//
//                }).catch(function (response) {
//
//                    if (response.data.error_description == "The access token provided is invalid.") {
////                        $scope.$parent.logout();
//                    } else if (response.data.error_description == "The access token provided has expired.") {
//                        ($scope.userPromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
//                            identityService.setAccessToken(response.data);
//                            getData($defer, params);
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
//        function getApprovedUsers(){
//            $scope.approvedTableParams = new ngTableParams(
//                {
//                    page: 1,            // show first page
//                    count: 10,           // count per page
//                    filter: {
//                        username: ''  ,
//                        email: '',
//                        fullName:'',
//                        universityName:'',
//                        campusName:'',
//                        enabled:''// initial filter
//                    },
//                    sorting: {
//                        registrationDateTime: 'desc'     // initial sorting
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
//                    "emailQuery": params.filter().email,
//                    "fullNameQuery": params.filter().fullName,
//                    "universityNameQuery": params.filter().universityName,
//                    "campusNameQuery": params.filter().campusName,
//                    "enabledQuery": params.filter().enabled,
//                    "pageNumber": params.page(),
//                    "pageSize": params.count(),
//                    "sort":params.sorting()
//                };
//                ($scope.userPromise = adminUserService.getAllApprovedUsers(identityService.getAccessToken(), queryData)).then(function (response) {
//                    $scope.approvedUsers = response.data.success.successData.users.totalUsers;
////                    $scope.approvedUsers= $filter('orderBy')($scope.approvedUsers, params.orderBy());
//                    $defer.resolve($scope.approvedUsers);
//                    params.total(response.data.success.successData.users.totalNumber);
//
//                }).catch(function (response) {
//
//                    if (response.data.error_description == "The access token provided is invalid.") {
////                        $scope.$parent.logout();
//                    } else if (response.data.error_description == "The access token provided has expired.") {
//                        ($scope.userPromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
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
//                        username: '',
//                        email: ''          // initial filter
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
//                    "emailQuery": params.filter().email,
//                    "pageNumber": params.page(),
//                    "pageSize": params.count(),
//                    "sort":params.sorting()
//                };
//                ($scope.userPromise = adminUserService.getAllAdminUsers(identityService.getAccessToken(), queryData)).then(function (response) {
//                    $scope.adminUsers = response.data.success.successData.users.totalUsers;
////                    $scope.adminUsers= $filter('orderBy')($scope.adminUsers, params.orderBy());
//                    $defer.resolve($scope.adminUsers);
//                    params.total(response.data.success.successData.users.totalNumber);
//
//                }).catch(function (response) {
//
//                    if (response.data.error_description == "The access token provided is invalid.") {
////                        $scope.$parent.logout();
//                    } else if (response.data.error_description == "The access token provided has expired.") {
//                        ($scope.userPromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
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
//                }else if(row.enabled=="false"){
//                    row.enabled=false;
//                }
//                ($scope.userPromise = adminUserService.saveUpdatedUserDataAdmin(identityService.getAccessToken(),row)).then(function (response) {
//                    responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);
//                    $scope.nonApprovedUsers.splice($scope.nonApprovedUsers.indexOf(row),1);
//
//                }).catch(function (response) {
//                    row.username =  row.usernameOnEdit;
//                    row.enabled = row.statusOnEdit;
//                    if (response.data.error_description == "The access token provided is invalid.") {
//
//                    } else if (response.data.error_description == "The access token provided has expired.") {
//                        ($scope.userPromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
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
//                ($scope.userPromise = adminUserService.approveUsers(identityService.getAccessToken(),selectedUserList)).then(function(response){
//
//                    responseService.showSuccessToast(response.data.success.successTitle, response.data.success.successDescription);
//                    init();
//                }).catch(function(response){
//                    if (response.data.error_description == "The access token provided is invalid.") {
//
//                    } else if (response.data.error_description == "The access token provided has expired.") {
//                        ($scope.userPromise = identityService.getRefreshAccessToken(identityService.getRefreshToken())).then(function (response) {
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


    }


})();


