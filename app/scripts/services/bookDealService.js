(function () {

    'use strict';

    app
        .factory('bookDealService', bookDealService);

    bookDealService.$inject=['SERVER_CONSTANT','BOOK_DEAL_CONSTANT','apiService'];

    function bookDealService(SERVER_CONSTANT,BOOK_DEAL_CONSTANT,apiService) {

        return {
            getBookDealsIhaveContactedFor:_getBookDealsIhaveContactedFor,
            getBookDealsOfMine:_getBookDealsOfMine,
            sellBookToUser: _sellBookToUser

        };


        function _getBookDealsIhaveContactedFor(accessToken){
            return apiService.get(SERVER_CONSTANT.HOST+BOOK_DEAL_CONSTANT.GET_BOOK_DEALS_I_HAVE_CONTACTED_FOR+"?access_token="+accessToken);
        }

        function _getBookDealsOfMine(accessToken){
            return apiService.get(SERVER_CONSTANT.HOST+BOOK_DEAL_CONSTANT.GET_BOOK_DEALS_I_HAVE_CREATED+"?access_token="+accessToken);
        }

        function _sellBookToUser(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_DEAL_CONSTANT.SELL_BOOK_TO_USER+"?access_token="+accessToken,data);
        }

    }

})();
