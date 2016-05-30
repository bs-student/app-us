(function () {

    'use strict';

    app
        .factory('bookDealService', bookDealService);

    bookDealService.$inject=['SERVER_CONSTANT','BOOK_DEAL_CONSTANT','apiService'];

    function bookDealService(SERVER_CONSTANT,BOOK_DEAL_CONSTANT,apiService) {

        return {
            getBookDealsIhaveContactedFor:_getBookDealsIhaveContactedFor,
            getBookDealsOfMine:_getBookDealsOfMine,
            sellBookToUser: _sellBookToUser,
            getBookDealsOfMineWhichAreSold:_getBookDealsOfMineWhichAreSold,
            getBookDealsOfMineWhichAreBought: _getBookDealsOfMineWhichAreBought

        };


        function _getBookDealsIhaveContactedFor(accessToken){
            return apiService.get(SERVER_CONSTANT.HOST+BOOK_DEAL_CONSTANT.GET_BOOK_DEALS_I_HAVE_CONTACTED_FOR+"?access_token="+accessToken);
        }

        function _getBookDealsOfMine(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_DEAL_CONSTANT.GET_BOOK_DEALS_I_HAVE_CREATED+"?access_token="+accessToken,data);
        }

        function _sellBookToUser(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_DEAL_CONSTANT.SELL_BOOK_TO_USER+"?access_token="+accessToken,data);
        }

        function _getBookDealsOfMineWhichAreSold(accessToken){
            return apiService.get(SERVER_CONSTANT.HOST+BOOK_DEAL_CONSTANT.GET_BOOK_DEALS_I_HAVE_CREATED_AND_SOLD+"?access_token="+accessToken);
        }

        function _getBookDealsOfMineWhichAreBought(accessToken){
            return apiService.get(SERVER_CONSTANT.HOST+BOOK_DEAL_CONSTANT.GET_BOOK_DEALS_I_HAVE_BOUGHT+"?access_token="+accessToken);
        }

    }

})();
