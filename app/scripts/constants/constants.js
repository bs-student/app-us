(function () {

    'use strict';

    app
        .constant("SERVER_CONSTANT",{
            "HOST":"http://localhost:8080/Student2StudentApi/web/app_dev.php"
        })
        .constant("API_CLIENT_CONSTANT", {
            "CLIENT_ID": "1_1t8rtqj36wkgcw4k8wko4wo808ksok0w8wssow4k8sgw08osw8",
            "CLIENT_SECRET": "3pcvjgjoqekgwgkoc0gss4cggkoo000o40ggc8ok44ksc4ckk0"
        })
        .constant("ACCESS_TOKEN_CONSTANT", {
            "PASSWORD_GRANT_TYPE": "password",
            "REFRESH_TOKEN_GRANT_TYPE":"refresh_token",
            "CLIENT_CREDENTIALS_GRANT_TYPE":"client_credentials",
            "SOCIAL_PLUGIN_GRANT_TYPE":"http://platform.local/grants/social_plugin",
            "OAUTH_TOKEN_URL":"/oauth/v2/token"
        })

        .constant("USER_CONSTANT", {
            "CURRENT_USER_SHORT_DETAILS": "/api/current_user_short_details",
            "CURRENT_USER_FULL_DETAILS": "/api/current_user_full_details",
            "UPDATE_SOCIAL_USER": "/api/user/update_created_profile",
            "ADMIN_ALL_USER_DATA" :"/api/admin/all_users",
            "ADMIN_UPDATE_USER_DATA": "/api/admin/update_user_data"
        })
        .constant("UNIVERSITY_CONSTANT", {
            "AUTOCOMPLETE_SEARCH_LIST": "/api/university/autocomplete_activated_search_list",
            "AUTOCOMPLETE_NAME_SEARCH_LIST":"/api/university/autocomplete_university_name_search_list",
//            "UNIVERSITY_LIST": "/api/university/list",
            "UPDATE_UNIVERSITY": "/api/university/update_university",
            "LIST_BY_SEARCH_UNIVERSITY": "/api/university/search",
            "SAVE_NEW_UNIVERSITY": "/api/university/save_new_university",
            "DELETE_UNIVERSITY": "/api/university/delete"
        })

        .constant("CAMPUS_CONSTANT", {
//            "AUTOCOMPLETE_SEARCH_LIST": "/api/university/autocomplete_activated_search_list",
//            "AUTOCOMPLETE_NAME_SEARCH_LIST":"/api/university/autocomplete_university_name_search_list",
//            "UNIVERSITY_LIST": "/api/university/list",
//            "UPDATE_UNIVERSITY": "/api/university/update_university",
            "CAMPUS_LIST_BY_UNIVERSITY": "/api/campus/list",
            "UPDATE_CAMPUS": "/api/campus/update"
//            "SAVE_NEW_UNIVERSITY": "/api/university/save_new_university",
//            "DELETE_UNIVERSITY": "/api/university/delete"
        })

        .constant("REFERRAL_CONSTANT", {
            "REFERRAL_LIST": "/api/referral/list"
        })
        .constant("STATE_CONSTANT", {
            "STATE_LIST_BY_COUNTRY": "/api/state/list_by_country"
        })
        .constant("COUNTRY_CONSTANT", {
            "COUNTRY_LIST": "/api/country/list"
        })
        .constant("SECURITY_CONSTANT", {
            "LOGOUT": "/logout",
            "REGISTER":"/register",
            "CONFIRM_REGISTRATION":"/confirm/",
            "CHECK_IF_USERNAME_EXIST":"/check_if_username_exist",
            "CHECK_IF_EMAIL_EXIST":"/check_if_email_exist",
            "FORGOT_PASSWORD":"/resetting/send-email",
            "RESET_PASSWORD":"/resetting/reset/"
        })

        .constant("LOGIN_CONSTANT", {
            "PAGE": "/login",
            "SUBMIT": "/login_check",
            "LOGIN_WITH_SOCIAL_SERVICE_LINK":"/social_register"

        })
        .constant("SOCIAL_PLUGIN_GOOGLE_CONSTANTS",{
            "GOOGLE_APP_NAME":"Student2Student",
            "GOOGLE_CLIENT_ID":"799265882325-g4jnl097bbst3popc0ainrstrtelicbk.apps.googleusercontent.com",
            "GOOGLE_CLIENT_SECRET":"ecwlOs7uqXfte2kPoJLYxIpY",
            "GOOGLE_SCOPE":"email profile",

//            "GOOGLE_REDIRECT_URL":"http://localhost:8080/SymfonyReal2/web/app_dev.php/login/check-google",
//            "GOOGLE_REDIRECT_URL":"http://localhost:8080/SymfonyClient/app/google_redirect",
            "GOOGLE_RESPONSE_TYPE": "token",
            "GOOGLE_ACCESS_TYPE": "online",
            "GOOGLE_OAUTH_LINK":"https://accounts.google.com/o/oauth2/auth?",
            "GOOGLE_USER_INFO_LINK":"https://www.googleapis.com/oauth2/v1/userinfo?alt=json"
        })
        .constant("SOCIAL_PLUGIN_FACEBOOK_CONSTANTS",{
            "FACEBOOK_APP_NAME":"Student2Student",
            "FACEBOOK_CLIENT_ID":"1102199066466109",
            "FACEBOOK_CLIENT_SECRET":"b6178715d703f075f8c48fbf73616450",
            "FACEBOOK_SCOPE":"email profile",

//            "GOOGLE_REDIRECT_URL":"http://localhost:8080/SymfonyReal2/web/app_dev.php/login/check-google",
//            "GOOGLE_REDIRECT_URL":"http://localhost:8080/SymfonyClient/app/google_redirect",
            "GOOGLE_RESPONSE_TYPE": "token",
            "GOOGLE_ACCESS_TYPE": "online",
            "GOOGLE_OAUTH_LINK":"https://accounts.google.com/o/oauth2/auth?",
            "GOOGLE_USER_INFO_LINK":"https://www.googleapis.com/oauth2/v1/userinfo?alt=json"
        });

//    http://localhost:8080/SymfonyReal2/web/app_dev.php/login/check-google?code=4/iP1644wF5VVZlYgEtQQMupTjxHOCpQaTSGzjN4nnoO8
//    4/XNbfIbG7dT0sIfjr-omN7DyfdB0EERxNPK50A_KnHqE
})();