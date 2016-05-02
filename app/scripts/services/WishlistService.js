(function () {

    'use strict';

    app
        .factory('wishlistService', wishlistService);

    wishlistService.$inject=['SERVER_CONSTANT','WISHLIST_CONSTANT','apiService'];

    function wishlistService(SERVER_CONSTANT,WISHLIST_CONSTANT,apiService) {

        return {

            addBookToWishList:_addBookToWishList
        }



        function _addBookToWishList(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+WISHLIST_CONSTANT.ADD_BOOK_TO_WISH_LIST+"?access_token="+accessToken,data);
        }


    }

})();
