(function () {

    'use strict';

    app
        .controller('SafetyFirstCtrl', SafetyFirstCtrl);

    SafetyFirstCtrl.$inject = ['$scope'];

    function SafetyFirstCtrl($scope) {


        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "helpAndSafety";



    }


})();


