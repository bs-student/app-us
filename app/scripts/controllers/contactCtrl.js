(function () {

    'use strict';

    app
        .controller('ContactCtrl', ContactCtrl);

    ContactCtrl.$inject = ['$scope', '$stateParams','$state','identityService','contactService','responseService'];

    function ContactCtrl($scope,$stateParams,$state, identityService,contactService,responseService) {

        $scope.contactSeller = _contactSeller;

        init();

        function init(){
            if($stateParams.deal==undefined){
                $state.go("app.dashboard");
            }else{
                $scope.deal =$stateParams.deal;
            }

            $scope.contact={};
            $scope.contact.messages=[];
            if($scope.$parent.loggedIn){
                $scope.contact.buyerEmail = identityService.getAuthorizedUserData().email;
            }

        }

        function _contactSeller(valid){
            if(valid){
                $scope.contact.bookDeal =$scope.deal.bookDealId;
                var data={
                    contact: $scope.contact,
                    access_token : identityService.getAccessToken()
                }


                contactService.addContact(data).then(function (response){
                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
                    $state.go("app.contactedBookList");
                }).catch(function (response){
                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
                });

            }
        }


    }


})();


