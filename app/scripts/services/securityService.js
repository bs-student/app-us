(function () {

    'use strict';

    app
        .factory('securityService', securityService);

    securityService.$inject = [ 'apiService', 'SERVER_CONSTANT', 'LOGIN_CONSTANT', 'SECURITY_CONSTANT'];

    function securityService( apiService, SERVER_CONSTANT, LOGIN_CONSTANT, SECURITY_CONSTANT) {


        return {
//            getLoginPage: _getLoginPage,
            loginUser: _loginUser,
            logoutUser: _logoutUser,
//            fetchGoogleAccessToken: _fetchGoogleAccessToken,
//            fetchGoogleUserData: _fetchGoogleUserData,
//            loginUserViaSocialService: _loginUserViaSocialService,
//            fetchFacebookAccessToken: _fetchFacebookAccessToken,
//            fetchFacebookUserData: _fetchFacebookUserData,
            registerUser:_registerUser,
            confirmRegistration:_confirmRegistration,
//            checkIfUsernameExist: _checkIfUsernameExist,
//            checkIfEmailExist:_checkIfEmailExist,
            forgotPassword: _forgotPassword,
            resetPassword: _resetPassword,
            updateSocialUser:_updateSocialUser

        };

//        function _getLoginPage() {
//            return apiService.get(SERVER_CONSTANT.HOST + LOGIN_CONSTANT.PAGE);
//        }

        function _loginUser(data) {
            return apiService.post(SERVER_CONSTANT.HOST + LOGIN_CONSTANT.SUBMIT, data);
        }

        function _logoutUser() {
            return apiService.post(SERVER_CONSTANT.HOST + SECURITY_CONSTANT.LOGOUT);
        }

//        function _fetchGoogleAccessToken() {
//
//            var config = {
//                'client_id': SOCIAL_PLUGIN_GOOGLE_CONSTANTS.GOOGLE_CLIENT_ID,
//                'scope': SOCIAL_PLUGIN_GOOGLE_CONSTANTS.GOOGLE_SCOPE,
//                'response_type': SOCIAL_PLUGIN_GOOGLE_CONSTANTS.GOOGLE_RESPONSE_TYPE
//            };
//            return gapi.auth.authorize(config);
//        }
//
//        function _fetchGoogleUserData(access_token) {
//
//            return apiService.get(SOCIAL_PLUGIN_GOOGLE_CONSTANTS.GOOGLE_USER_INFO_LINK + "&access_token=" + access_token);
//        }
//
//        function _loginUserViaSocialService(data) {
//            return apiService.post(SERVER_CONSTANT.HOST + LOGIN_CONSTANT.LOGIN_WITH_SOCIAL_SERVICE_LINK, data);
//        }
//
//        function _fetchFacebookAccessToken() {
//            var deferred = $q.defer();
//            FB.login(function(response) {
//                if (!response || response.error) {
//                    deferred.reject('Error occured');
//                } else {
//                    deferred.resolve(response);
//                }
//            });
//            return deferred.promise;
//
//        }
//        function _fetchFacebookUserData(){
//            var deferred = $q.defer();
//            FB.api('/me', {
//                fields: 'name,email,first_name,last_name'
//            },function(response) {
//                if (!response || response.error) {
//                    deferred.reject('Error occured');
//                } else {
//                    deferred.resolve(response);
//                }
//            });
//            return deferred.promise;
//        }

        function _registerUser(data){
            return apiService.post(SERVER_CONSTANT.HOST + SECURITY_CONSTANT.REGISTER, data);
        }

//        function _checkIfUsernameExist(query){
//            return apiService.post(SERVER_CONSTANT.HOST + SECURITY_CONSTANT.CHECK_IF_USERNAME_EXIST, query);
//        }
//
//        function _checkIfEmailExist(query){
//            return apiService.post(SERVER_CONSTANT.HOST + SECURITY_CONSTANT.CHECK_IF_EMAIL_EXIST, query);
//        }

        function _confirmRegistration(code){
            return apiService.get(SERVER_CONSTANT.HOST + SECURITY_CONSTANT.CONFIRM_REGISTRATION+"/"+code);
        }
        function _forgotPassword(email){
            return apiService.post(SERVER_CONSTANT.HOST + SECURITY_CONSTANT.FORGOT_PASSWORD, email);
        }
        function _resetPassword(data){
            return apiService.post(SERVER_CONSTANT.HOST + SECURITY_CONSTANT.RESET_PASSWORD+"/"+data.token,data);
        }

        function _updateSocialUser(data) {
            return apiService.post(SERVER_CONSTANT.HOST + SECURITY_CONSTANT.UPDATE_SOCIAL_USER,data);
        }

       /* function _loginUserViaFacebook(){
            return apiService.post(SERVER_CONSTANT.HOST + LOGIN_CONSTANT.LOGIN_WITH_GOOGLE_LINK, data);
        }*/

//        window.fbAsyncInit = function () {
//            // Executed when the SDK is loaded
//
//            FB.init({
//                appId: SOCIAL_PLUGIN_FACEBOOK_CONSTANTS.FACEBOOK_CLIENT_ID,
//                status: true,
//                cookie: true,
//                xfbml: true,
//                version: 'v2.4'
//            });
//        };
//
//
//        (function (d) {
//            // load the Facebook javascript SDK
//
//            var js,
//                id = 'facebook-jssdk',
//                ref = d.getElementsByTagName('script')[0];
//
//            if (d.getElementById(id)) {
//                return;
//            }
//
//            js = d.createElement('script');
//            js.id = id;
//            js.async = true;
//            js.src = "//connect.facebook.net/en_US/sdk.js";
//
//            ref.parentNode.insertBefore(js, ref);
//
//        }(document));


    }


})();
