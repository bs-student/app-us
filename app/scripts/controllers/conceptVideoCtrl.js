(function () {

    'use strict';


    app
        .controller('ConceptVideoCtrl', ConceptVideoCtrl);

    ConceptVideoCtrl.$inject = ['$scope'];

    function ConceptVideoCtrl($scope) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "howItWorks";


    }


})();
