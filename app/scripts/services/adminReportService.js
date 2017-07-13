(function () {

    'use strict';

    app
        .factory('adminDashboardService', adminDashboardService);

    adminDashboardService.$inject=['SERVER_CONSTANT','ADMIN_CONSTANT','apiService'];

    function adminDashboardService(SERVER_CONSTANT,ADMIN_CONSTANT,apiService) {

        return {
            getNormalAndSocialUserData:_getNormalAndSocialUserData,
            getLoginAndRegistrationUserData:_getLoginAndRegistrationUserData,
            getBookDealAndContactData:_getBookDealAndContactData,
            getBookDealMethodData:_getBookDealMethodData
        };

        function _getNormalAndSocialUserData(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+ADMIN_CONSTANT.GET_NORMAL_AND_SOCIAL_USER_DATA+"?access_token="+accessToken,data);
        }

        function _getLoginAndRegistrationUserData(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+ADMIN_CONSTANT.GET_LOGIN_AND_REGISTRATION_USER_DATA+"?access_token="+accessToken,data);
        }
        function _getBookDealAndContactData(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+ADMIN_CONSTANT.GET_BOOK_DEAL_AND_CONTACT_DATA+"?access_token="+accessToken,data);
        }
        function _getBookDealMethodData(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+ADMIN_CONSTANT.GET_BOOK_DEAL_METHOD_DATA+"?access_token="+accessToken,data);
        }


    }

})();
