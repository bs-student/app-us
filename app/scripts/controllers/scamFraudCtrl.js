(function () {

    'use strict';

    app
        .controller('ScamFraudCtrl', ScamFraudCtrl);

    ScamFraudCtrl.$inject = ['$scope'];

    function ScamFraudCtrl($scope) {


        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "helpAndSafety";



    }


})();


