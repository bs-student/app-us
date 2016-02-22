(function () {

    'use strict';

    app
        .controller('UserManagementCtrl', UserManagementCtrl);

    UserManagementCtrl.$inject = ['identityService', 'userService', '$scope', '$filter', '$q', 'ngTableParams'];

    function UserManagementCtrl(identityService, userService, $scope, $filter, $q, ngTableParams) {


        userService.getAllUserData(identityService.getAccessToken()).then(addDataToTable);
//        $scope.user.edit = false;
        $scope.saveUsername = _saveUsername;
        $scope.editSelectedUsers = _editSelectedUsers;
        $scope.saveEditedSelectedUsers = _saveEditedSelectedUsers;
        var selected_all = false;

        var selectedUserList = [];

        function addDataToTable(response) {
//            console.log(response.data.users);
            var data = response.data.users;


//            var data = [
//
//                {id: 1, username: 'Moroni', fullName: 50, email: -10},
//                {id: 2, username: 'Tiancum', fullName: 43,email: 120},
//                {id: 3, username: 'Jacob', fullName: 27, email: 5.5},
//                {id: 4, username: 'Nephi', fullName: 29,email: -54}
//            ];


//            var data = [
//
//             {id: 1, name: 'Moroni', age: 50, money: -10},
//             {id: 2, name: 'Tiancum', age: 43,money: 120},
//             {id: 3, name: 'Jacob', age: 27, money: 5.5},
//             {id: 4, name: 'Nephi', age: 29,money: -54},
//             {id: 5, name: 'Enos', age: 34,money: 110},
//             {id: 6, name: 'Tiancum', age: 43, money: 1000},
//             {id: 7, name: 'Jacob', age: 27,money: -201},
//             {id: 8, name: 'Nephi', age: 29, money: 100},
//             {id: 9, name: 'Enos', age: 34, money: -52.5},
//             {id: 10, name: 'Tiancum', age: 43, money: 52.1},
//             {id: 11, name: 'Jacob', age: 27, money: 110},
//             {id: 12, name: 'Nephi', age: 29, money: -55},
//             {id: 13, name: 'Enos', age: 34, money: 551},
//             {id: 14, name: 'Tiancum', age: 43, money: -1410},
//             {id: 15, name: 'Jacob', age: 27, money: 410},
//             {id: 16, name: 'Nephi', age: 29, money: 100},
//             {id: 17, name: 'Enos', age: 34, money: -100}
//             ];

            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,           // count per page
                sorting: {
                    username: 'asc'     // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(data, params.orderBy()) :
                        data;

                    $defer.resolve($scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

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
                    if (inArray(item.username, arr) === -1) {
                        arr.push(item.username);
                        names.push({
                            'id': item.username,
                            'title': item.username
                        });
                    }
                });
                def.resolve(names);
                return def;
            };

            $scope.checkboxes = { 'checked': false, items: {} };


            $scope.addOrRemoveSelectedUsers = function (user) {
                if (selectedUserList.indexOf(user) > -1) {
                    selectedUserList.splice(selectedUserList.indexOf(user), 1);
                } else {
                    selectedUserList.push(user);
                }
            }


            // watch for check all checkbox
            $scope.$watch('checkboxes.checked', function (value) {

                selected_all = value;
                console.log(value);
                angular.forEach($scope.users, function (item) {
                    if (angular.isDefined(item.id)) {
//                        console.log($scope.checkboxes.items[item.id]);
                        $scope.checkboxes.items[item.id] = value;
                    }
                });
            });

            // watch for data checkboxes
            $scope.$watch('checkboxes.items', function () {
//                console.log("calling individual");
                if (!$scope.users) {
                    return;
                }

                var checked = 0, unchecked = 0,
                    total = $scope.users.length;
                angular.forEach($scope.users, function (item) {
                    checked += ($scope.checkboxes.items[item.id]) || 0;
                    unchecked += (!$scope.checkboxes.items[item.id]) || 0;
                });
                if ((unchecked === 0) || (checked === 0)) {
                    $scope.checkboxes.checked = (checked === total);

                }
                if(unchecked>0)selected_all=false;
//                console.log("Unchecked: "+unchecked+", Total: "+total);
                // grayed checkbox
                angular.element(document.getElementById('select_all')).prop('indeterminate', (checked !== 0 && unchecked !== 0));
            }, true);


        }

        function _saveUsername(user) {
            saveEditedUser(user);
        }

        function _editSelectedUsers() {

            if (selected_all) {
                $scope.selected_edit = true;
                angular.forEach($scope.users, function (item) {
//                console.log(item);
                    item.$edit = true;
                });
            } else {
                if (selectedUserList.length) {
                    $scope.selected_edit = true;
                    angular.forEach(selectedUserList, function (item) {
//                console.log(item);
                        item.$edit = true;
                    });
                }
            }


        }

        function _saveEditedSelectedUsers() {
            $scope.selected_edit = false;
            angular.forEach($scope.users, function (item) {
                if(item.$edit==true){
                    saveEditedUser(item);
                }

            });

        }


        function saveEditedUser(user){
            user.$edit = false;
            user.message = "";
            var data = {
                username: user.username,
                id: user.id
            }
            userService.saveUpdatedUserDataAdmin(identityService.getAccessToken(), data).then(function (response) {
                if (response.data.success != undefined) {
                    user.message = response.data.success;
                    user.message_class = "text-greensea";
                } else {
                    user.message = response.data.error;
                    user.message_class = "text-hotpink";
                    user.username = response.data.username;
                }
//                console.log(response.data);
            });
        }


    }


})();


