(function () {

    'use strict';


    app
        .controller('HowItWorksCtrl', HowItWorksCtrl);

    HowItWorksCtrl.$inject = ['$scope'];

    function HowItWorksCtrl($scope) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "howItWorks";


    }


})();
