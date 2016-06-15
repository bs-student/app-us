(function () {

    'use strict';

    app
        .controller('ConditionOfUseCtrl', ConditionOfUseCtrl);

    ConditionOfUseCtrl.$inject = ['$scope'];

    function ConditionOfUseCtrl($scope) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "user";

    }

})();


