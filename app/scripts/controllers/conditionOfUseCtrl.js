(function () {

    'use strict';

    app
        .controller('DisclaimerCtrl', DisclaimerCtrl);

    DisclaimerCtrl.$inject = ['$scope'];

    function DisclaimerCtrl($scope) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "user";


    }


})();


