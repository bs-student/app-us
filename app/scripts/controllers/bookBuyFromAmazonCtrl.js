(function () {

    'use strict';

    app
        .controller('BookBuyFromAmazonCtrl', BookBuyFromAmazonCtrl);

    BookBuyFromAmazonCtrl.$inject = ['$stateParams','$scope','bookService','identityService'];

    function BookBuyFromAmazonCtrl($stateParams,$scope,bookService,identityService) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "buyBook";

        var data={
            'bookOfferId':$stateParams.bookOfferId
        };
        bookService.getAmazonCartCreateUrl(data).then(function(response){
            window.location.replace(response.data.success.successData.cartUrl);
        });

    }


})();
