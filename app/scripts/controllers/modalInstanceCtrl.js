(function () {

    'use strict';


    app
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['$scope','$uibModalInstance','src'];

    function ModalInstanceCtrl($scope, $uibModalInstance, src) {
        $scope.src = src;


        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }


})();
