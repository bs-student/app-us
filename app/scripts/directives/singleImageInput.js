'use strict';

app
    .directive("singleFileInput", ["$parse",
        function ($parse) {

            return {

                restrict: "A",
                link: function (scope, element, attrs) {

                    element.bind("change",function(e){

                        var model = attrs.fileInput;
                        var singleFile = attrs.singleFile;
                        var fileIdModel = attrs.fileIdentifier;
                        var fileDataModel = attrs.fileData;
//                        scope.model=[];
                        if(scope.model==undefined){
                            scope.model=[]
                        }
                        angular.forEach(element[0].files,function(file){
                            var reader = new FileReader();
                            reader.onload = function ( loadEvent ) {
                                file[fileDataModel]=loadEvent.target.result;
                                file[fileIdModel] = Math.floor((Math.random() * 1000000) + 1);

                                var fileSelected= true;
                                scope.$apply(function(){
                                    scope.model.push(file);
                                    scope.singleFile = true;
                                });
//                                console.log(scope);
                            };
                            reader.readAsDataURL(file);

                        });
                        $parse(model).assign(scope, scope.model);

                    });


                }
            };
        }]);

