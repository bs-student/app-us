(function () {

    'use strict';

    app
        .factory('userService', userService);

    userService.$inject=['apiService','SERVER_CONSTANT','LOGIN_CONSTANT','USER_CONSTANT'];

    function userService(apiService,SERVER_CONSTANT,LOGIN_CONSTANT,USER_CONSTANT) {

        return {
            getAuthorizedUserShortData: _getAuthorizedUserShortData,
            getAuthorizedUserFullData: _getAuthorizedUserFullData,
            setUpdatedSocialUserData:_setUpdatedSocialUserData,
            getAllUserData: _getAllUserData,
            saveUpdatedUserDataAdmin: _saveUpdatedUserDataAdmin
        };

        function _getAuthorizedUserShortData(accessToken){
            return apiService.get(SERVER_CONSTANT.HOST+USER_CONSTANT.CURRENT_USER_SHORT_DETAILS+"?access_token="+accessToken);
        }

        function _getAuthorizedUserFullData(accessToken){
            return apiService.get(SERVER_CONSTANT.HOST+USER_CONSTANT.CURRENT_USER_FULL_DETAILS+"?access_token="+accessToken);
        }

        function _setUpdatedSocialUserData(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+USER_CONSTANT.UPDATE_SOCIAL_USER+"?access_token="+accessToken,data);
        }

        function _getAllUserData(accessToken){

            return apiService.post(SERVER_CONSTANT.HOST+USER_CONSTANT.ADMIN_ALL_USER_DATA+"?access_token="+accessToken);
        }

        function _saveUpdatedUserDataAdmin(accessToken,data){
            return apiService.post(SERVER_CONSTANT.HOST+USER_CONSTANT.ADMIN_UPDATE_USER_DATA+"?access_token="+accessToken,data);
        }


    }

})();
