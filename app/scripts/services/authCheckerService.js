(function () {

    'use strict';

    app
        .factory('stateProviderService', stateProviderService);

    stateProviderService.$inject=[];

    function stateProviderService() {


        return {
            getState:_getState,
            saveState : _saveState
        };

        function _getState(){
            return localStorage["bsPreviousState"];
        }

        function _saveState(stateUrl){
            localStorage["bsPreviousState"]= stateUrl;
        }

    }

})();
