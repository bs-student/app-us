(function () {

    'use strict';

    app
        .controller('WishListCtrl', WishListCtrl);

    WishListCtrl.$inject = ['$scope','identityService','responseService','wishListService','imageModalService','SERVER_CONSTANT'];

    function WishListCtrl($scope, identityService,responseService,wishListService,imageModalService,SERVER_CONSTANT) {

        if(!$scope.$parent.loggedIn){
            $state.go("app.login");
        }

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "user";
        $scope.wishListBooks=[];

        $scope.imageHostPath = SERVER_CONSTANT.IMAGE_HOST_PATH;
        $scope.viewImage = _viewImage;
        $scope.showDeleteModal = _showDeleteModal;
        $scope.deleteBookFromWishList=_deleteBookFromWishList;

        init();


        function init(){
            wishListService.getMyWishList(identityService.getAccessToken()).then(function(response){
                $scope.wishListBooks = response.data.success.successData;

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        init();
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });



        }
        function _viewImage(event, size) {
            imageModalService.showModal(event, size);
        }

        function _showDeleteModal(event, modalTemplate,data){
            imageModalService.showPromptModal(event, modalTemplate,data,$scope);
        }

        function _deleteBookFromWishList(data){

            var json={
                accessToken:identityService.getAccessToken(),
                bookId:data.book.bookId
            }
            wishListService.removeWishListItem(json).then(function(response){
                responseService.showSuccessToast(response.data.success.successTitle);

                $scope.wishListBooks.splice($scope.wishListBooks.indexOf(data.book),1);

            }).catch(function (response) {

                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        _deleteBookFromWishList(data);
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }

            });

        }

    }


})();


