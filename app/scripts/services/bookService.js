(function () {

    'use strict';

    app
        .factory('bookService', bookService);

    bookService.$inject=['SERVER_CONSTANT','BOOK_CONSTANT','apiService'];

    function bookService(SERVER_CONSTANT,BOOK_CONSTANT,apiService) {

        return {
            searchBooks:_searchBooks,
            getLowestOnlinePrice:_getLowestOnlinePrice,
            getSingleBookByAsinAmazon:_getSingleBookByAsinAmazon,
            searchBooksByIsbnAmazon:_searchBooksByIsbnAmazon,
            getSingleBookByIsbnCampusBooks:_getSingleBookByIsbnCampusBooks,
            getAmazonCartCreateUrl:_getAmazonCartCreateUrl,
            getCampusDealsByIsbn: _getCampusDealsByIsbn,
//            getOnCampusDealsByIsbn:_getOnCampusDealsByIsbn,
            addSellBook:_addSellBook,
            addCustomSellBook:_addCustomSellBook,
            addBookToWishList:_addBookToWishList
//            getUniversitiesForAutocomplete : _getUniversitiesForAutocomplete,
//            getUniversitiesNameForAutocomplete : _getUniversitiesNameForAutocomplete,
//            getSearchUniversities: _getSearchUniversities,
//            saveUpdatedUniversityDataAdmin: _saveUpdatedUniversityDataAdmin,
//            saveNewUniversities: _saveNewUniversities,
//            deleteUniversity: _deleteUniversity
        }

        function _searchBooks(data){
            if(data.access_token!=null){
                return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.SEARCH_AMAZON_API+"?access_token="+data.access_token,data);
            }else{
                return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.SEARCH_AMAZON,data);
            }

        }

        function _getLowestOnlinePrice(isbn){
            return apiService.get(SERVER_CONSTANT.HOST+BOOK_CONSTANT.GET_LOWEST_ONLINE_PRICE+"?isbn="+isbn);

        }

        function _searchBooksByIsbnAmazon(data){
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.GET_BOOK_BY_ISBN_AMAZON+"?access_token="+data.accessToken,data);
        }

        function _getSingleBookByAsinAmazon(data){
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.GET_BOOK_BY_ASIN_AMAZON,data);
        }

        function _getSingleBookByIsbnCampusBooks(data){
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.GET_BOOK_BY_ISBN_CAMPUS_BOOKS,data);
        }

        function _getAmazonCartCreateUrl(data){
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.GET_AMAZON_CART_CREATE_URL,data);
        }

        function _getCampusDealsByIsbn(data){

            if(data.access_token!=null){
                return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.GET_CAMPUS_DEALS_BY_ISBN_API+"?access_token="+data.access_token,data);
            }else{
                return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.GET_CAMPUS_DEALS_BY_ISBN,data);
            }

        }
        /*function _getOnCampusDealsByIsbn(data){
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.GET_ON_CAMPUS_DEALS_BY_ISBN+"?access_token="+data.access_token,data);
        }*/
        function _addSellBook(accessToken,data){

            var config = {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.ADD_NEW_SELL_BOOK+"?access_token="+accessToken,data,config);

        }
        function _addCustomSellBook(accessToken,data){

            var config = {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.ADD_NEW_CUSTOM_SELL_BOOK+"?access_token="+accessToken,data,config);

        }

        function _addBookToWishList(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+BOOK_CONSTANT.ADD_BOOK_TO_WISH_LIST+"?access_token="+accessToken,data);
        }

//        function _getUniversitiesNameForAutocomplete(query){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.AUTOCOMPLETE_NAME_SEARCH_LIST+"?access_token="+query.access_token,query);
//        }
//        function _getUniversitiesForAutocomplete(query){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.AUTOCOMPLETE_SEARCH_LIST+"?access_token="+query.access_token,query);
//        }
//        function _saveUpdatedUniversityDataAdmin(access_token,data){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.UPDATE_UNIVERSITY+"?access_token="+access_token,data);
//        }
//        function _getSearchUniversities(access_token, data){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.LIST_BY_SEARCH_UNIVERSITY+"?access_token="+access_token,data);
//        }
//        function _saveNewUniversities(access_token,data){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.SAVE_NEW_UNIVERSITY+"?access_token="+access_token,data);
//        }
//        function _deleteUniversity(access_token,data){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.DELETE_UNIVERSITY+"?access_token="+access_token,data);
//        }

    }

})();
