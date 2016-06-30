(function () {

    'use strict';

    app
        .constant("SERVER_CONSTANT",{
            "HOST":"http://localhost:8080/Student2StudentApi/web/app_dev.php",
            "IMAGE_HOST_PATH":"./../../Student2StudentApi/web"
//              "HOST":"http://168.61.173.224:8080/Student2Student/api/web",
//            "IMAGE_HOST_PATH":"./api/web"
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
        .constant("SOCIAL_MEDIA_CONSTANT", {
            "FACEBOOK_LINK": "https://www.facebook.com",
            "TWITTER_LINK": "https://www.twitter.com",
            "INSTAGRAM_LINK": "https://www.instagram.com"
        })

        .constant("USER_CONSTANT", {
            "CURRENT_USER_SHORT_DETAILS": "/api/current_user_short_details",
            "CURRENT_USER_FULL_DETAILS": "/api/current_user_full_details",
//            "UPDATE_FULL_NAME": "/api/update_user_full_name",
//            "UPDATE_USER_UNIVERSITY_CAMPUS": "/api/update_user_university_campus",
            "CHANGE_PASSWORD": "/profile/change-password",
            "ADMIN_ALL_USER_DATA" :"/api/admin/all_users",
            "UPDATE_PROFILE" : "/api/update_user_profile"
        })
        .constant("ADMIN_CONSTANT", {
            "GET_ALL_NON_APPROVED_USER": "/api/admin/get_all_non_approved_user",
            "GET_ALL_APPROVED_USER":"/api/admin/get_all_approved_user",
            "GET_ALL_ADMIN_USER": "/api/admin/get_all_admin_user",
            "ADMIN_UPDATE_USER_DATA": "/api/admin/update_user_data",
            "APPROVE_USERS": "/api/admin/approve_users",
            "ADD_ADMIN_USER": "/api/admin/add_admin_user",
            "GET_ALL_BOOK_DEALS": "/api/admin/get_all_book_deals",
            "GET_STUDENT_QUOTES":"/api/admin/get_student_quotes",
            "GET_UNIVERSITY_QUOTES":"/api/admin/get_university_quotes",
            "UPDATE_QUOTE":"/api/admin/update_quote",
            "ADD_QUOTE":"/api/admin/add_quote",
            "DELETE_QUOTE":"/api/admin/delete_quote",
            "GET_NEWS":"/api/admin/get_news",
            "ADD_NEWS":"/api/admin/add_news",
            "UPDATE_NEWS":"/api/admin/update_news",
            "GET_ALL_NEWSLETTER_EMAILS":"/api/admin/get_all_newsletter_emails"

        })
        .constant("QUOTE_CONSTANT", {
            "GET_ACTIVATED_STUDENT_QUOTE": "/quote/get_activated_student_quote",
            "GET_ACTIVATED_UNIVERSITY_QUOTE":"/quote/get_activated_university_quote"
        })
        .constant("UNIVERSITY_CONSTANT", {
            "AUTOCOMPLETE_SEARCH_LIST": "/university/autocomplete_activated_search_list",
            "AUTOCOMPLETE_NAME_SEARCH_LIST":"/api/university/autocomplete_university_name_search_list",
//            "UNIVERSITY_LIST": "/api/university/list",
            "UPDATE_UNIVERSITY": "/api/university/update_university",
            "LIST_BY_SEARCH_UNIVERSITY": "/api/university/search",
            "SAVE_NEW_UNIVERSITY": "/university/save_new_university",
            "DELETE_UNIVERSITY": "/api/university/delete"
        })

        .constant("CAMPUS_CONSTANT", {
//            "AUTOCOMPLETE_SEARCH_LIST": "/api/university/autocomplete_activated_search_list",
//            "AUTOCOMPLETE_NAME_SEARCH_LIST":"/api/university/autocomplete_university_name_search_list",
//            "UNIVERSITY_LIST": "/api/university/list",
//            "UPDATE_UNIVERSITY": "/api/university/update_university",
            "CAMPUS_LIST_BY_UNIVERSITY": "/api/campus/list",
            "UPDATE_CAMPUS": "/api/campus/update",
            "ADD_CAMPUS":"/api/campus/add",
            "CAMPUS_DETAILS_WITH_UNIVERSITY_AND_STATE": "/campus/details_with_university_and_state"
//            "SAVE_NEW_UNIVERSITY": "/api/university/save_new_university",
//            "DELETE_UNIVERSITY": "/api/university/delete"
        })

        .constant("REFERRAL_CONSTANT", {
            "REFERRAL_LIST": "/referral/list"
        })
        .constant("STATE_CONSTANT", {
            "STATE_LIST_BY_COUNTRY": "/state/list_by_country"
        })
        .constant("COUNTRY_CONSTANT", {
            "COUNTRY_LIST": "/country/list"
        })
        .constant("CONTACT_US_CONSTANT", {
            "SEND_CONTACT_MESSAGE": "/contactus/send_message",
            "SEND_MAILS_TO_FRIENDS":"/contactus/send_mails_to_friends",
            "SEND_MAILS_TO_USER_FRIENDS":"/api/contactus/send_mails_to_user_friends"
        })
        .constant("SECURITY_CONSTANT", {
            "LOGOUT": "/logout",
            "REGISTER":"/register",
            "UPDATE_SOCIAL_USER": "/update_social_user",
            "CONFIRM_REGISTRATION":"/confirm",
            "CHECK_IF_USERNAME_EXIST":"/check_if_username_exist",
            "CHECK_IF_EMAIL_EXIST":"/check_if_email_exist",
            "FORGOT_PASSWORD":"/resetting/send-email",
            "CHECK_RESET_PASSWORD_LINK":"/resetting/check_token",
            "RESET_PASSWORD":"/resetting/reset"
        })

        .constant("LOGIN_CONSTANT", {
//            "PAGE": "/login",
            "SUBMIT": "/login_check"
//            "LOGIN_WITH_SOCIAL_SERVICE_LINK":"/social_register"

        })
        .constant("BOOK_CONSTANT", {
            "SEARCH_AMAZON": "/book/search_by_keyword_amazon",
            "SEARCH_AMAZON_API": "/api/book/search_by_keyword_amazon_api",
            "GET_LOWEST_ONLINE_PRICE": "/book/get_lowest_price_by_isbn_campus_books",
            "GET_BOOK_BY_ASIN_AMAZON":"/book/search_by_asin_amazon",
            "GET_BOOK_BY_ISBN_AMAZON":"/api/book/search_by_isbn_amazon",
            "GET_BOOK_BY_ISBN_CAMPUS_BOOKS":"/book/search_by_isbn_campus_books",
            "GET_AMAZON_CART_CREATE_URL":"/book/get_amazon_cart_create_url",
            "GET_CAMPUS_DEALS_BY_ISBN_API":"/api/book/get_campus_deals_by_isbn_api",
            "GET_CAMPUS_DEALS_BY_ISBN":"/book/get_campus_deals_by_isbn",
//            "GET_ON_CAMPUS_DEALS_BY_ISBN":"/api/book/get_on_campus_deals_by_isbn",
            "ADD_NEW_SELL_BOOK":"/api/book/add_new_sell_book",
            "ADD_NEW_CUSTOM_SELL_BOOK": "/api/book/add_new_custom_sell_book"

//            "SUBMIT": "/login_check",
//            "LOGIN_WITH_SOCIAL_SERVICE_LINK":"/social_register"

        })
        .constant("WISHLIST_CONSTANT", {
            "ADD_BOOK_TO_WISH_LIST": "/api/wishlist/add_book_to_wish_list",
            "GET_MY_WISHLIST": "/api/wishlist/get_my_wishlist",
            "REMOVE_WISHLIST_ITEM": "/api/wishlist/remove_wishlist_item"

        })
        .constant("CONTACT_CONSTANT", {
            "ADD_CONTACT": "/contact/add_contact",
            "ADD_CONTACT_API": "/api/contact/add_contact_api",
            "GET_MESSAGES": "/api/contact/get_messages",
            "SEND_MESSAGES": "/api/contact/send_messages",
            "SEND_MESSAGES_WITHOUT_MAILING": "/api/contact/send_messages_without_mailing"

        })
        .constant("BOOK_DEAL_CONSTANT", {
            "GET_BOOK_DEALS_I_HAVE_CONTACTED_FOR": "/api/book_deal/get_book_deals_i_have_contacted_for",
            "GET_BOOK_DEALS_I_HAVE_CREATED": "/api/book_deal/get_book_deals_i_have_created",
            "SELL_BOOK_TO_USER": "/api/book_deal/sell_book_to_user",
            "GET_BOOK_DEALS_I_HAVE_CREATED_AND_SOLD": "/api/book_deal/get_book_deals_i_have_created_and_sold",
            "GET_BOOK_DEALS_I_HAVE_BOUGHT": "/api/book_deal/get_book_deals_i_have_bought",
            "CHANGE_BOOK_DEAL_STATUS":"/api/book_deal/change_book_deal_status",
            "GET_LOWEST_CAMPUS_DEAL_PRICE":"/api/book_deal/get_lowest_campus_deal_price",
            "UPDATE_BOOK_DEAL":"/api/book_deal/update_book_deal",
            "DELETE_BOOK_DEAL":"/api/book_deal/delete_book_deal",
            "GET_ACTIVATED_BOOK_DEAL_OF_USER":"/book_deal/get_activated_book_deal_of_user",

            "GET_All_ACTIVATED_SELLING_AND_CONTACTED_BOOK_OF_USER":"/api/book_del/get_all_activated_selling_and_contacted_book_of_user"
        })
        .constant("NEWS_CONSTANT", {
            "GET_ACTIVATED_NEWS": "/news/get_activated_news",
            "GET_SINGLE_NEWS":"/news/get_single_news"
        })
        .constant("NEWSLETTER_CONSTANT", {
            "ADD_NEWSLETTER_EMAIL": "/newsletter/add_newsletter_email"
        });
//        .constant("SOCIAL_PLUGIN_GOOGLE_CONSTANTS",{
//            "GOOGLE_APP_NAME":"Student2Student",
//            "GOOGLE_CLIENT_ID":"799265882325-g4jnl097bbst3popc0ainrstrtelicbk.apps.googleusercontent.com",
//            "GOOGLE_CLIENT_SECRET":"ecwlOs7uqXfte2kPoJLYxIpY",
//            "GOOGLE_SCOPE":"email profile",
//
////            "GOOGLE_REDIRECT_URL":"http://localhost:8080/SymfonyReal2/web/app_dev.php/login/check-google",
////            "GOOGLE_REDIRECT_URL":"http://localhost:8080/SymfonyClient/app/google_redirect",
//            "GOOGLE_RESPONSE_TYPE": "token",
//            "GOOGLE_ACCESS_TYPE": "online",
//            "GOOGLE_OAUTH_LINK":"https://accounts.google.com/o/oauth2/auth?",
//            "GOOGLE_USER_INFO_LINK":"https://www.googleapis.com/oauth2/v1/userinfo?alt=json"
//        })
//        .constant("SOCIAL_PLUGIN_FACEBOOK_CONSTANTS",{
//            "FACEBOOK_APP_NAME":"Student2Student",
//            "FACEBOOK_CLIENT_ID":"1102199066466109",
//            "FACEBOOK_CLIENT_SECRET":"b6178715d703f075f8c48fbf73616450",
//            "FACEBOOK_SCOPE":"email profile",
//
////            "GOOGLE_REDIRECT_URL":"http://localhost:8080/SymfonyReal2/web/app_dev.php/login/check-google",
////            "GOOGLE_REDIRECT_URL":"http://localhost:8080/SymfonyClient/app/google_redirect",
//            "GOOGLE_RESPONSE_TYPE": "token",
//            "GOOGLE_ACCESS_TYPE": "online",
//            "GOOGLE_OAUTH_LINK":"https://accounts.google.com/o/oauth2/auth?",
//            "GOOGLE_USER_INFO_LINK":"https://www.googleapis.com/oauth2/v1/userinfo?alt=json"
//        });

//    http://localhost:8080/SymfonyReal2/web/app_dev.php/login/check-google?code=4/iP1644wF5VVZlYgEtQQMupTjxHOCpQaTSGzjN4nnoO8
//    4/XNbfIbG7dT0sIfjr-omN7DyfdB0EERxNPK50A_KnHqE
})();