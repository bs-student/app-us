'use strict';

app
    .directive("fileInput", ["$parse",
        function ($parse) {

            return {

                restrict: "A",
                link: function (scope, element, attrs) {

                    element.bind("change",function(e){

                        var model = attrs.fileInput;
                        var fileIdModel = attrs.fileIdentifier;
                        var fileDataModel = attrs.fileData;
                        if(scope.model==undefined){
                            scope.model=[]
                        }
                        angular.forEach(element[0].files,function(file){
                            var reader = new FileReader();
                            reader.onload = function ( loadEvent ) {
                                file[fileDataModel]=loadEvent.target.result;
                                file[fileIdModel] = Math.floor((Math.random() * 1000000) + 1);


                                scope.$apply(function(){
                                    scope.model.push(file);
                                });
                            };
                            reader.readAsDataURL(file);

                        });
                        $parse(model).assign(scope, scope.model);

                    });


                }
            };
        }]);

