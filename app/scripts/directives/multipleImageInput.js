(function () {

'use strict';

app
    .directive("multipleImageInput",multipleImageInput);
multipleImageInput.$inject=["$parse","responseService"];
    function multipleImageInput($parse,responseService){


            return {

                restrict: "A",
                link: function (scope, element, attrs) {

                    element.bind("change",function(e){

                        var model = attrs.multipleImageInput;
                        var fileIdModel = attrs.fileIdentifier;
                        var fileDataModel = attrs.fileData;

                        if(scope.model==undefined){
                            scope.model=[]
                        }

                        var validFiles=[];
                        angular.forEach(element[0].files,function(file){

                            if (file.name.match(/\.(jpg|jpeg|png)$/) && (parseInt(file.size/1024,10)<=200)){
                                validFiles.push(file);
                            }else{
                                responseService.showErrorToast("Add Picture File and less than 200KB");
                            }


                        });

                        angular.forEach(validFiles,function(file){
                            var reader = new FileReader();
                            reader.onload = function ( loadEvent ) {
                                file[fileDataModel]=loadEvent.target.result;
                                file[fileIdModel] = Math.floor((Math.random() * 1000000) + 1);

                                var fileSelected= true;
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
        }

})();
