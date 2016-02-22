(function(app){
    app.directive("valEmail", function($q, $timeout, securityService) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function($scope, $element, $attrs, ctrl) {

                ctrl.$asyncValidators.valEmail = function(modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }

                    var def = $q.defer();

                    securityService.checkIfEmailExist({'query':modelValue}).then(function(response){
                        if(response.data.emailExist)def.reject();
                            else def.resolve();
                    });


                    return def.promise;
                };
            }
        };
    });
})(angular.module('minovateApp'));