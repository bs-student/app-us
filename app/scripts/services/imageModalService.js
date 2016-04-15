(function () {

    'use strict';

    app
        .factory('imageModalService', imageModalService);

    imageModalService.$inject=['$uibModal'];

    function imageModalService($uibModal) {


        return {
            showModal : _showModal
        }

        function _showModal(event, size){
            var options = angular.element(event.target).data('options');
            var src = angular.element(event.target).attr('src');

            $uibModal.open({
                templateUrl: 'myModalContent',
                controller:'ModalInstanceCtrl',
                backdropClass: 'splash' + ' ' + options,
                windowClass: 'splash' + ' ' + options,
                resolve: {
                    src: function () {
                        return src;
                    }
                }
            });
        }

    }

})();
