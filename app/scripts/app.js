'use strict';



/*jshint -W079 */

var app = angular
    .module('student2studentApp', [

//        'satellizer',

        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
//        'ngTouch',
//        'ngMessages',
        'picardy.fontawesome',
        'ui.bootstrap',
        'ui.router',
        'ui.utils',
        'angular-loading-bar',
//        'angular-momentjs',
//        'FBAngular',
//        'lazyModel',
        'toastr',
//        'angularBootstrapNavTree',
        'oc.lazyLoad',
        'ui.select',
//        'ui.tree',
//        'textAngular',
//        'colorpicker.module',
//        'angularFileUpload',
//        'ngImgCrop',
//        'datatables',
//        'datatables.bootstrap',
//        'datatables.colreorder',
//        'datatables.colvis',
//        'datatables.tabletools',
//        'datatables.scroller',
//        'datatables.columnfilter',
//        'ui.grid',
//        'ui.grid.resizeColumns',
//        'ui.grid.edit',
//        'ui.grid.moveColumns',
        'ngTable',
//        'smart-table',
//        'angular-flot',
//        'angular-rickshaw',
//        'easypiechart',
//        'uiGmapgoogle-maps',
//        'ui.calendar',
//        'ngTagsInput',
        'pascalprecht.translate',
        'ngMaterial',
//        'localytics.directives',
//        'leaflet-directive',
//        'wu.masonry',
//        'ipsum',
//        'angular-intro',
//        'dragularModule'

//        'angular-parallax'
        'ngParallax',
//        'noCAPTCHA'
        'vcRecaptcha',
        'cgBusy'
    ])
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {

            event.targetScope.$watch('$viewContentLoaded', function () {

                angular.element('html, body, #content').animate({ scrollTop: 0 }, 200);

                setTimeout(function () {
                    angular.element('#wrap').css('visibility', 'visible');

                    if (!angular.element('.dropdown').hasClass('open')) {
                        angular.element('.dropdown').find('>ul').slideUp();
                    }
                }, 200);
            });
            $rootScope.containerClass = toState.containerClass;
        });




    }])

//    .config(["$locationProvider", function($locationProvider) {
//        $locationProvider.html5Mode({
//            enabled: true/*,
//            requireBase: false*/
//        });
//    }])
    .config(['uiSelectConfig', function (uiSelectConfig) {
        uiSelectConfig.theme = 'bootstrap';
    }])
    .config(['vcRecaptchaServiceProvider',function(vcRecaptchaServiceProvider){
        vcRecaptchaServiceProvider.setSiteKey('6LfXfBwTAAAAAIvMDpHcvLIK4N7lBCXmM87xrsXw')
        vcRecaptchaServiceProvider.setTheme('dark')
    }])
    /*.config(['noCAPTCHAProvider', function (noCaptchaProvider) {
        noCaptchaProvider.setSiteKey('6LfXfBwTAAAAAIvMDpHcvLIK4N7lBCXmM87xrsXw');
        noCaptchaProvider.setTheme('dark');
    }])*/


    //angular-language
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });
        $translateProvider.useLocalStorage();
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy(null);
    }])
//    .controller('authenticationCtrl', function($scope, facebook) {
//
//        $scope.login = function() {
//            // From now on you can use the Facebook service just as Facebook api says
//            facebook.login(function(response) {
//                // Do something with response.
//            });
//        };
//
//        $scope.getLoginStatus = function() {
//            Facebook.getLoginStatus(function(response) {
//                if(response.status === 'connected') {
//                    $scope.loggedIn = true;
//                } else {
//                    $scope.loggedIn = false;
//                }
//            });
//        };
//
//        $scope.me = function() {
//            Facebook.api('/me', function(response) {
//                $scope.user = response;
//            });
//        };
//    })

//    .config(function($authProvider) {
//        $authProvider.google({
//            clientId: '799265882325-g4jnl097bbst3popc0ainrstrtelicbk.apps.googleusercontent.com'
////            url: 'app/dashboard'
////            redirectUri: "http://localhost:8080/SymfonyReal2/web/app_dev.php/login/check-google",
////            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/token'
//        });
////        $authProvider.baseUrl = null;
//    })

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
//        $locationProvider.html5Mode(true);
        $urlRouterProvider
//            .when('/:', '/contacts/:id')
//            .when('/access_token=:accessToken','')
            .otherwise('/');
        $stateProvider
//            .state('code', {
//                abstract: true,
//                url: '/?code',
//                controller: 'TestCtrl'
////                templateUrl: 'views/tmpl/app.html'
//            })

            .state('app', {
                abstract: true,
                url: '/',
                controller: 'StartCtrl',
                templateUrl: 'views/web/app.html'
            })
            //dashboard
            .state('app.dashboard', {
                url: '^/',
                controller: 'DashboardCtrl',
                templateUrl: 'views/web/dashboard.html'
            })
            //how It Work page
            .state('app.howItWorks', {
                url: '^/howItWorks',
                controller: 'HowItWorksCtrl',
                templateUrl: 'views/web/howItWorks.html'
            })

            //concept Video page
            .state('app.conceptVideo', {
                url: '^/conceptVideo',
                controller: 'ConceptVideoCtrl',
                templateUrl: 'views/web/conceptVideo.html'
            })

            //login
            .state('app.login', {
                url: '^/login',
                controller: 'LoginCtrl',
                templateUrl: 'views/security/login.html',
                params: {
                    "bookId": null
                }
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'https://apis.google.com/js/client.js'
//                        ]);
//                    }]
//                }
            })

            // Add University Public
            .state('app.addUniversity', {
                url: '^/addUniversity',
                controller: 'UniversityCtrl',
                templateUrl: 'views/university/university.html'
            })
            // University Map
            .state('app.universityMap', {
                url: '^/universityMap',
                controller: 'UniversityMapCtrl',
                templateUrl: 'views/university/university_map.html'
            })

            //Registration
            .state('app.signup', {
                url: '^/signup',
                controller: 'SignupCtrl',
                templateUrl: 'views/security/signup.html'
            })
            //Registration Confirm
            .state('app.confirm', {
                url: '^/confirmRegistration/:code',
                controller: 'SignupConfirmCtrl'
            })
            //forgot password
            .state('app.forgotPassword', {
                url: '^/forgotPassword',
                controller: 'ForgotPasswordCtrl',
                templateUrl: 'views/security/forgotpassword.html'
            })
            //reset Password password
            .state('app.resetPassword', {
                url: '^/resetPassword/:code',
                controller: 'ResetPasswordCtrl',
                templateUrl: 'views/security/resetpassword.html'
            })

            //book Buy
            .state('app.bookBuy', {
                url: '^/bookBuy',
                controller: 'BookBuyCtrl',
                templateUrl: 'views/book/buy_book.html'
            })
            //book Search
            .state('app.bookBuy.bookSearch', {
                url: '^/bookSearch/:searchQuery?pageNumber&campus',
                views:{
                    'searchResultView@app.bookBuy':{
                        templateUrl: 'views/book/search_result.html',
                        controller: 'BookSearchCtrl'
                    }
                }

            })
            //compare page
            .state('app.bookComparePrice', {
                url: '^/bookComparePrice/:asin?isbn',
                controller: 'BookCompareCtrl',
//                templateUrl: 'views/book/compare.html'
                templateUrl: 'views/book/compare_book_price.html'
            })
            //If Buy From Amazon
            .state('app.buyFromAmazon', {
                url: '^/buyFromAmazon/:bookOfferId',
                controller: 'BookBuyFromAmazonCtrl'
            })
            //Contact BuyerToSeller
            .state('app.contact', {
                url: '^/contact',
                controller: 'ContactCtrl',
                templateUrl: 'views/contact/contact.html',
                params: {
                    "deal": null
                }
            })
            //Contacted Book List
            .state('app.contactedBookList', {
                url: '^/contactedBookList',
                controller: 'ContactedBookListCtrl',
                templateUrl: 'views/book/contacted_book_list.html'
            })
            //Selling Book List
            .state('app.sellingBookList', {
                url: '^/sellingBookList',
                controller: 'SellingBookListCtrl',
                templateUrl: 'views/book/selling_book_list.html'
            })
            //Sell Archive
            .state('app.sellArchive', {
                url: '^/sellArchive',
                controller: 'SellArchiveCtrl',
                templateUrl: 'views/book/sell_archive.html'
            })
            //Buy Archive
            .state('app.buyArchive', {
                url: '^/buyArchive',
                controller: 'BuyArchiveCtrl',
                templateUrl: 'views/book/buy_archive.html'
            })
            //BUY FROM AMAZON
            .state('app.buy_from_amazon', {
                url: '^/buy_from_amazon:bookOfferId',
                controller: 'BookBuyFromAmazonCtrl'
            })
            //Safety First
            .state('app.safetyFirst', {
                url: '^/safetyFirst',
                controller: 'SafetyFirstCtrl',
                templateUrl: 'views/web/safety_first.html'
            })
            //Scam & Fraud
            .state('app.scamAndFraud', {
                url: '^/scamAndFraud',
                controller: 'ScamFraudCtrl',
                templateUrl: 'views/web/scam_fraud.html'
            })
            //Wishlist
            .state('app.wishList', {
                url: '^/wishList',
                controller: 'WishListCtrl',
                templateUrl: 'views/book/wishlist.html'
            })
            //Profile
            .state('app.profile', {
                url: '^/profile',
                controller: 'ProfileCtrl',
                templateUrl: 'views/account/profile.html'
            })
            //Change Password
            .state('app.changePassword', {
                url: '^/changePassword',
                controller: 'ChangePasswordCtrl',
                templateUrl: 'views/account/change_password.html'
            })
            //AdminUserList
            .state('app.userList', {
                url: '^/userList',
                controller: 'UserManagementCtrl',
                templateUrl: 'views/admin/user/user_list.html'
            })
            //Add User
            .state('app.userList.addUser', {
                url: '^/addUser',
                views:{
                    'addUserView@app.userList':{
                        templateUrl: 'views/admin/user/add_user.html',
                        controller: 'AddUserCtrl'
                    }
                }

            })
            //Admin All Book Deals
            .state('app.allBookDeals', {
                url: '^/allBookDeals',
                controller: 'BookDealCtrl',
                templateUrl: 'views/admin/book/book_deals.html'
            })
            //Admin Quotes
            .state('app.quotes', {
                url: '^/quotes',
                controller: 'QuoteCtrl',
                templateUrl: 'views/admin/content/quotes.html'
            })
            //Add Student Quote
            .state('app.quotes.addStudentQuote', {
                url: '^/addStudentQuote',
                views:{
                    'addStudentQuoteView@app.quotes':{
                        templateUrl: 'views/admin/content/add_student_quote.html',
                        controller: 'AddQuoteCtrl'
                    }
                }

            })
            //Add University Quote
            .state('app.quotes.addUniversityQuote', {
                url: '^/addUniversityQuote',
                views:{
                    'addUniversityQuoteView@app.quotes':{
                        templateUrl: 'views/admin/content/add_university_quote.html',
                        controller: 'AddQuoteCtrl'
                    }
                }

            })
            //FAQ
            .state('app.faq', {
                url: '^/faq',
                controller: 'FaqCtrl',
                templateUrl: 'views/web/faq.html'
            })













            //Sell Book Main Page
            .state('app.sellBook', {
                url: '^/sellBook',
                controller: 'BookSellMainCtrl',
                templateUrl: 'views/book/sell_book.html'
//                controller: 'BookSellCtrl',
//                templateUrl: 'views/book/sell_page.html'

            })




            //Sell Book
            .state('app.sellBookByIsbn', {
                url: '^/sellBookByIsbn',
                controller: 'BookSellCtrl',
                templateUrl: 'views/book/sell_page.html',
                params: {
                    "book": null
                }
            })
            //Sell Book Custom
            .state('app.sellBookCustom', {
                url: '^/sellBookCustom',
                controller: 'BookSellCustomCtrl',
                templateUrl: 'views/book/sell_page_custom.html'
            })






















































            .state('registration', {
                abstract: true,
                url: '/registration',
                template: '<div ui-view></div>'

            })
            //login
            .state('registration.complete', {
                url: '/complete',
                controller: 'OAuthCtrl',
//                controller: 'LoginCtrl',
                templateUrl: 'views/registration/complete_registration.html'

            })

            //Admin
            .state('admin', {
                abstract:true,
                url: '/admin',
                controller:'StartCtrl',
                templateUrl: 'views/web/app.html'
            })
            //UserList
            .state('admin.userlist', {
                url: '/userlist',
//                controller: 'UserManagementCtrl',
                templateUrl: 'views/admin/user/user_list.html'
            })




            .state('app.university', {
                url: '^/university',
                controller: 'UniversityManagementCtrl',
                templateUrl: 'views/admin/university/university_list.html'

            })
            .state('app.university.new', {
                url: '/new',
                views: {
                    'universityUtilityView@admin.university': {
                        templateUrl: 'views/admin/university/new_university.html',
                        controller: 'UniversityCreateCtrl'
                    }
                }
            })
            .state('admin.view_university', {
                url: '/view_university',
                templateUrl: 'views/admin/university/university_view.html',
                controller: 'UniversityViewCtrl',
                params: {
                    obj: null
                }

            })
            .state('admin.view_university.add_campus', {
                url: '/add_campus',
                views:{
                    'campusUtilityView@admin.view_university':{
                        templateUrl: 'views/admin/campus/new_campus.html',
                        controller: 'CampusCreateCtrl'
                    }
                }

            })

//            .state('security', {
//                abstract: true,
//                url: '/security',
////                controller: 'StartCtrl',
//                template: '<div ui-view></div>'
//            })

            //signup
//            .state('app.signup', {
//                url: '/signup',
//                controller: 'SignupCtrl',
//                templateUrl: 'views/registration/signup.html'
//            })
            .state('security.confirm', {
                url: '/confirm/:code',
                controller: 'SignupConfirmCtrl'
//                templateUrl: 'views/registration/signup.html'
            })
            //forgot password
            .state('security.forgotpassword', {
                url: '/forgotpassword',
                controller: 'ForgotPasswordCtrl',
                templateUrl: 'views/security/forgotpassword.html'
            })

            .state('security.reset', {
                url: '/reset/:code',
                controller: 'ResetPasswordCtrl',
                templateUrl: 'views/security/resetpassword.html'
            })


            //University
//            .state('university', {
//                abstract: true,
//                url: '/university',
////                controller: 'StartCtrl',
//                template: '<div ui-view></div>'
//            })
//            .state('university.add', {
//                url: '/add',
//                controller: 'UniversityCtrl',
//                templateUrl: 'views/university/university.html'
//            })

            .state('book', {
                abstract: true,
                url: '/book',
                controller: 'StartCtrl',
                templateUrl: 'views/web/app.html'
            })
            .state('book.search', {
                url: '/search',
                controller: 'BookSearchCtrl',
                templateUrl: 'views/book/search.html'
            })
            .state('book.compare', {
                url: '/compare',
                controller: 'BookCompareCtrl',
                templateUrl: 'views/book/compare.html',
                params: {
                    "asin": null,
                    "isbn": null,
                    "ean": null
                }
            })
            .state('book.buy_from_amazon', {
                url: '/buy_from_amazon:bookOfferId',
                controller: 'BookBuyFromAmazonCtrl'
            })
            .state('book.sell', {
                url: '/sell',
                controller: 'BookSellCtrl',
                templateUrl: 'views/book/sell.html',
                resolve: {
                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../vendor/filestyle/bootstrap-filestyle.min.js'
                        ]);
                    }]
                }
            })

//            .state('app.mail', {
//                abstract: true,
//                url: '/mail',
//                controller: 'MailCtrl',
//                templateUrl: 'views/tmpl/mail/mail.html'
//            })
            //mail/inbox
//            .state('app.mail.inbox', {
//                url: '/inbox',
//                controller: 'MailInboxCtrl',
//                templateUrl: 'views/tmpl/mail/inbox.html'
//            })
//            //mail/compose
//            .state('app.mail.compose', {
//                url: '/compose',
//                controller: 'MailComposeCtrl',
//                templateUrl: 'views/tmpl/mail/compose.html'
//            })
//            //mail/single
//            .state('app.mail.single', {
//                url: '/single',
//                controller: 'MailSingleCtrl',
//                templateUrl: 'views/tmpl/mail/single.html'
//            })
//            //ui
//            .state('app.ui', {
//                url: '/ui',
//                template: '<div ui-view></div>'
//            })
//            //ui/typography
//            .state('app.ui.typography', {
//                url: '/typography',
//                controller: 'TypographyCtrl',
//                templateUrl: 'views/tmpl/ui/typography.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/google-code-prettify/prettify.css',
//                            'scripts/vendor/google-code-prettify/sons-of-obsidian.css',
//                            'scripts/vendor/google-code-prettify/prettify.js'
//                        ]);
//                    }]
//                }
//            })
//            //ui/lists
//            .state('app.ui.lists', {
//                url: '/lists',
//                controller: 'ListsCtrl',
//                templateUrl: 'views/tmpl/ui/lists.html'
//            })
//            //ui/buttons&icons
//            .state('app.ui.buttons-icons', {
//                url: '/buttons-icons',
//                controller: 'ButtonsIconsCtrl',
//                templateUrl: 'views/tmpl/ui/buttons-icons.html'
//            })
//            //ui/navs&accordions
//            .state('app.ui.navs', {
//                url: '/navs',
//                controller: 'NavsCtrl',
//                templateUrl: 'views/tmpl/ui/navs.html'
//            })
//            //ui/modals
//            .state('app.ui.modals', {
//                url: '/modals',
//                controller: 'ModalsCtrl',
//                templateUrl: 'views/tmpl/ui/modals.html'
//            })
//            //ui/tiles
//            .state('app.ui.tiles', {
//                url: '/tiles',
//                controller: 'TilesCtrl',
//                templateUrl: 'views/tmpl/ui/tiles.html'
//            })
//            //ui/portlets
//            .state('app.ui.portlets', {
//                url: '/portlets',
//                controller: 'PortletsCtrl',
//                templateUrl: 'views/tmpl/ui/portlets.html'
//            })
//            //ui/grid
//            .state('app.ui.grid', {
//                url: '/grid',
//                controller: 'GridCtrl',
//                templateUrl: 'views/tmpl/ui/grid.html'
//            })
//            //ui/widgets
//            .state('app.ui.widgets', {
//                url: '/widgets',
//                controller: 'WidgetsCtrl',
//                templateUrl: 'views/tmpl/ui/widgets.html'
//            })
//            //ui/alerts & notifications
//            .state('app.ui.alerts', {
//                url: '/alerts',
//                controller: 'AlertsCtrl',
//                templateUrl: 'views/tmpl/ui/alerts.html'
//            })
//            //ui/general
//            .state('app.ui.general', {
//                url: '/general',
//                controller: 'GeneralCtrl',
//                templateUrl: 'views/tmpl/ui/general.html'
//            })
//            //ui/tree
//            .state('app.ui.tree', {
//                url: '/tree',
//                controller: 'TreeCtrl',
//                templateUrl: 'views/tmpl/ui/tree.html'
//            })
//            //ui/masonry
//            .state('app.ui.masonry', {
//                url: '/masonry',
//                controller: 'UiMasonryCtrl',
//                templateUrl: 'views/tmpl/ui/masonry.html'
//            })
//            //ui/dragula
//            .state('app.ui.dragula', {
//                url: '/dragula',
//                controller: 'UiDragulaCtrl',
//                templateUrl: 'views/tmpl/ui/dragula.html'
//            })
//            //material
//            .state('app.material', {
//                url: '/material',
//                template: '<div ui-view></div>'
//            })
//            //material/autocomplete
//            .state('app.material.autocomplete', {
//                url: '/autocomplete',
//                controller: 'mtAutocompleteCtrl',
//                templateUrl: 'views/tmpl/material/autocomplete.html'
//            })
//            //material/bottom-sheet
//            .state('app.material.bottom-sheet', {
//                url: '/bottom-sheet',
//                controller: 'mtBottomSheetCtrl',
//                templateUrl: 'views/tmpl/material/bottom-sheet.html'
//            })
//            //material/buttons
//            .state('app.material.buttons', {
//                url: '/buttons',
//                controller: 'mtButtonsCtrl',
//                templateUrl: 'views/tmpl/material/buttons.html'
//            })
//            //material/cards
//            .state('app.material.cards', {
//                url: '/cards',
//                controller: 'mtCardsCtrl',
//                templateUrl: 'views/tmpl/material/cards.html'
//            })
//            //material/checkbox
//            .state('app.material.checkbox', {
//                url: '/checkbox',
//                controller: 'mtCheckboxCtrl',
//                templateUrl: 'views/tmpl/material/checkbox.html'
//            })
//            //material/chips
//            .state('app.material.chips', {
//                url: '/chips',
//                controller: 'mtChipsCtrl',
//                templateUrl: 'views/tmpl/material/chips.html'
//            })
//            //material/content
//            .state('app.material.content', {
//                url: '/content',
//                controller: 'mtContentCtrl',
//                templateUrl: 'views/tmpl/material/content.html'
//            })
//            //material/dialog
//            .state('app.material.dialog', {
//                url: '/dialog',
//                controller: 'mtDialogCtrl',
//                templateUrl: 'views/tmpl/material/dialog.html'
//            })
//            //material/divider
//            .state('app.material.divider', {
//                url: '/divider',
//                controller: 'mtDividerCtrl',
//                templateUrl: 'views/tmpl/material/divider.html'
//            })
//            //material/fab-speed-dial
//            .state('app.material.fab-speed-dial', {
//                url: '/fab-speed-dial',
//                controller: 'mtFabSpeedDialCtrl',
//                templateUrl: 'views/tmpl/material/fab-speed-dial.html'
//            })
//            //material/fab-toolbar
//            .state('app.material.fab-toolbar', {
//                url: '/fab-toolbar',
//                controller: 'mtFabToolbarCtrl',
//                templateUrl: 'views/tmpl/material/fab-toolbar.html'
//            })
//            //material/grid-list
//            .state('app.material.grid-list', {
//                url: '/grid-list',
//                controller: 'mtGridListCtrl',
//                templateUrl: 'views/tmpl/material/grid-list.html'
//            })
//            //material/inputs
//            .state('app.material.inputs', {
//                url: '/inputs',
//                controller: 'mtInputsCtrl',
//                templateUrl: 'views/tmpl/material/inputs.html'
//            })
//            //material/list
//            .state('app.material.list', {
//                url: '/list',
//                controller: 'mtListCtrl',
//                templateUrl: 'views/tmpl/material/list.html'
//            })
//            //material/menu
//            .state('app.material.menu', {
//                url: '/menu',
//                controller: 'mtMenuCtrl',
//                templateUrl: 'views/tmpl/material/menu.html'
//            })
//            //material/progress-circular
//            .state('app.material.progress-circular', {
//                url: '/progress-circular',
//                controller: 'mtProgressCircularCtrl',
//                templateUrl: 'views/tmpl/material/progress-circular.html'
//            })
//            //material/progress-linear
//            .state('app.material.progress-linear', {
//                url: '/progress-linear',
//                controller: 'mtProgressLinearCtrl',
//                templateUrl: 'views/tmpl/material/progress-linear.html'
//            })
//            //material/radio-button
//            .state('app.material.radio-button', {
//                url: '/radio-button',
//                controller: 'mtRadioButtonCtrl',
//                templateUrl: 'views/tmpl/material/radio-button.html'
//            })
//            //material/select
//            .state('app.material.select', {
//                url: '/select',
//                controller: 'mtSelectCtrl',
//                templateUrl: 'views/tmpl/material/select.html'
//            })
//            //material/sidenav
//            .state('app.material.sidenav', {
//                url: '/sidenav',
//                controller: 'mtSidenavCtrl',
//                templateUrl: 'views/tmpl/material/sidenav.html'
//            })
//            //material/slider
//            .state('app.material.slider', {
//                url: '/slider',
//                controller: 'mtSliderCtrl',
//                templateUrl: 'views/tmpl/material/slider.html'
//            })
//            //material/subheader
//            .state('app.material.subheader', {
//                url: '/subheader',
//                controller: 'mtSubheaderCtrl',
//                templateUrl: 'views/tmpl/material/subheader.html'
//            })
//            //material/swipe
//            .state('app.material.swipe', {
//                url: '/swipe',
//                controller: 'mtSwipeCtrl',
//                templateUrl: 'views/tmpl/material/swipe.html'
//            })
//            //material/switch
//            .state('app.material.switch', {
//                url: '/switch',
//                controller: 'mtSwitchCtrl',
//                templateUrl: 'views/tmpl/material/switch.html'
//            })
//            //material/tabs
//            .state('app.material.tabs', {
//                url: '/tabs',
//                controller: 'mtTabsCtrl',
//                templateUrl: 'views/tmpl/material/tabs.html'
//            })
//            //material/toast
//            .state('app.material.toast', {
//                url: '/toast',
//                controller: 'mtToastCtrl',
//                templateUrl: 'views/tmpl/material/toast.html'
//            })
//            //material/toolbar
//            .state('app.material.toolbar', {
//                url: '/toolbar',
//                controller: 'mtToolbarCtrl',
//                templateUrl: 'views/tmpl/material/toolbar.html'
//            })
//            //material/tooltip
//            .state('app.material.tooltip', {
//                url: '/tooltip',
//                controller: 'mtTooltipCtrl',
//                templateUrl: 'views/tmpl/material/tooltip.html'
//            })
//            //material/whiteframe
//            .state('app.material.whiteframe', {
//                url: '/whiteframe',
//                controller: 'mtWhiteframeCtrl',
//                templateUrl: 'views/tmpl/material/whiteframe.html'
//            })
//            //shop
//            .state('app.shop', {
//                url: '/shop',
//                template: '<div ui-view></div>'
//            })
//            //shop/orders
//            .state('app.shop.orders', {
//                url: '/orders',
//                controller: 'OrdersCtrl',
//                templateUrl: 'views/tmpl/shop/orders.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/datatables/datatables.bootstrap.min.css',
//                            'scripts/vendor/datatables/Pagination/input.js',
//                            'scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
//                        ]);
//                    }]
//                }
//            })
//            //shop/products
//            .state('app.shop.products', {
//                url: '/products',
//                controller: 'ProductsCtrl',
//                templateUrl: 'views/tmpl/shop/products.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/datatables/datatables.bootstrap.min.css',
//                            'scripts/vendor/datatables/Pagination/input.js',
//                            'scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
//                        ]);
//                    }]
//                }
//            })
//            //shop/invoices
//            .state('app.shop.invoices', {
//                url: '/invoices',
//                controller: 'InvoicesCtrl',
//                templateUrl: 'views/tmpl/shop/invoices.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/datatables/datatables.bootstrap.min.css',
//                            'scripts/vendor/datatables/Pagination/input.js',
//                            'scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
//                        ]);
//                    }]
//                }
//            })
//            //shop/single-order
//            .state('app.shop.single-order', {
//                url: '/single-order',
//                controller: 'SingleOrderCtrl',
//                templateUrl: 'views/tmpl/shop/single-order.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/datatables/datatables.bootstrap.min.css',
//                            'scripts/vendor/datatables/Pagination/input.js',
//                            'scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
//                        ]);
//                    }]
//                }
//            })
//            //shop/single-product
//            .state('app.shop.single-product', {
//                url: '/single-product',
//                controller: 'SingleProductCtrl',
//                templateUrl: 'views/tmpl/shop/single-product.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/datatables/datatables.bootstrap.min.css',
//                            'scripts/vendor/datatables/Pagination/input.js',
//                            'scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js',
//                            'scripts/vendor/touchspin/jquery.bootstrap-touchspin.js',
//                            'scripts/vendor/touchspin/jquery.bootstrap-touchspin.css',
//                            'scripts/vendor/magnific/magnific-popup.css',
//                            'scripts/vendor/magnific/jquery.magnific-popup.min.js'
//                        ]);
//                    }]
//                }
//            })
//            //shop/single-invoice
//            .state('app.shop.single-invoice', {
//                url: '/single-invoice',
//                controller: 'SingleInvoiceCtrl',
//                templateUrl: 'views/tmpl/shop/single-invoice.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/datatables/datatables.bootstrap.min.css',
//                            'scripts/vendor/datatables/Pagination/input.js',
//                            'scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
//                        ]);
//                    }]
//                }
//            })
//            //forms
//            .state('app.forms', {
//                url: '/forms',
//                template: '<div ui-view></div>'
//            })
//            //forms/common
//            .state('app.forms.common', {
//                url: '/common',
//                controller: 'FormsCommonCtrl',
//                templateUrl: 'views/tmpl/forms/common.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/slider/bootstrap-slider.js',
//                            'scripts/vendor/touchspin/jquery.bootstrap-touchspin.js',
//                            'scripts/vendor/touchspin/jquery.bootstrap-touchspin.css',
//                            'scripts/vendor/filestyle/bootstrap-filestyle.min.js'
//                        ]);
//                    }]
//                }
//            })
//            //forms/validate
//            .state('app.forms.validate', {
//                url: '/validate',
//                controller: 'FormsValidateCtrl',
//                templateUrl: 'views/tmpl/forms/validate.html'
//            })
//            //forms/wizard
//            .state('app.forms.wizard', {
//                url: '/wizard',
//                controller: 'FormWizardCtrl',
//                templateUrl: 'views/tmpl/forms/wizard.html'
//            })
//            //forms/upload
//            .state('app.forms.upload', {
//                url: '/upload',
//                controller: 'FormUploadCtrl',
//                templateUrl: 'views/tmpl/forms/upload.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/filestyle/bootstrap-filestyle.min.js'
//                        ]);
//                    }]
//                }
//            })
//            //forms/imgcrop
//            .state('app.forms.imgcrop', {
//                url: '/imagecrop',
//                controller: 'FormImgCropCtrl',
//                templateUrl: 'views/tmpl/forms/imgcrop.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/filestyle/bootstrap-filestyle.min.js'
//                        ]);
//                    }]
//                }
//            })
//            //tables
//            .state('app.tables', {
//                url: '/tables',
//                template: '<div ui-view></div>'
//            })
//            //tables/bootstrap
//            .state('app.tables.bootstrap', {
//                url: '/bootstrap',
//                controller: 'TablesBootstrapCtrl',
//                templateUrl: 'views/tmpl/tables/bootstrap.html'
//            })
//            //tables/datatables
//            .state('app.tables.datatables', {
//                url: '/datatables',
//                controller: 'TablesDatatablesCtrl',
//                templateUrl: 'views/tmpl/tables/datatables.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/datatables/ColReorder/css/dataTables.colReorder.min.css',
//                            'scripts/vendor/datatables/ColReorder/js/dataTables.colReorder.min.js',
//                            'scripts/vendor/datatables/Responsive/dataTables.responsive.css',
//                            'scripts/vendor/datatables/Responsive/dataTables.responsive.js',
//                            'scripts/vendor/datatables/ColVis/css/dataTables.colVis.min.css',
//                            'scripts/vendor/datatables/ColVis/js/dataTables.colVis.min.js',
//                            'scripts/vendor/datatables/TableTools/css/dataTables.tableTools.css',
//                            'scripts/vendor/datatables/TableTools/js/dataTables.tableTools.js',
//                            'scripts/vendor/datatables/datatables.bootstrap.min.css'
//                        ]);
//                    }]
//                }
//            })
//            //tables/uiGrid
//            .state('app.tables.ui-grid', {
//                url: '/ui-grid',
//                controller: 'TablesUiGridCtrl',
//                templateUrl: 'views/tmpl/tables/ui-grid.html'
//            })
//            //tables/ngTable
//            .state('app.tables.ng-table', {
//                url: '/ng-table',
//                controller: 'TablesNgTableCtrl',
//                templateUrl: 'views/tmpl/tables/ng-table.html'
//            })
//            //tables/smartTable
//            .state('app.tables.smart-table', {
//                url: '/smart-table',
//                controller: 'TablesSmartTableCtrl',
//                templateUrl: 'views/tmpl/tables/smart-table.html'
//            })
//            //tables/fooTable
//            .state('app.tables.footable', {
//                url: '/footable',
//                controller: 'TablesFootableCtrl',
//                templateUrl: 'views/tmpl/tables/footable.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/footable/dist/footable.all.min.js',
//                            'scripts/vendor/footable/css/footable.core.min.css'
//                        ]);
//                    }]
//                }
//            })
//            //charts
//            .state('app.charts', {
//                url: '/charts',
//                controller: 'ChartsCtrl',
//                templateUrl: 'views/tmpl/charts.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/flot/jquery.flot.resize.js',
//                            'scripts/vendor/flot/jquery.flot.orderBars.js',
//                            'scripts/vendor/flot/jquery.flot.stack.js',
//                            'scripts/vendor/flot/jquery.flot.pie.js',
//                            'scripts/vendor/gaugejs/gauge.min.js'
//                        ]);
//                    }]
//                }
//            })
//            //layouts
//            .state('app.layouts', {
//                url: '/layouts',
//                template: '<div ui-view></div>'
//            })
//            //layouts/boxed
//            .state('app.layouts.boxed', {
//                url: '/boxed',
//                controller: 'BoxedlayoutCtrl',
//                templateUrl: 'views/tmpl/layouts/boxed.html',
//                containerClass: 'boxed-layout'
//            })
//            //layouts/fullwidth
//            .state('app.layouts.fullwidth', {
//                url: '/fullwidth',
//                controller: 'FullwidthlayoutCtrl',
//                templateUrl: 'views/tmpl/layouts/fullwidth.html'
//            })
//            //layouts/sidebar-sm
//            .state('app.layouts.sidebar-sm', {
//                url: '/sidebar-sm',
//                controller: 'SidebarsmlayoutCtrl',
//                templateUrl: 'views/tmpl/layouts/sidebar-sm.html',
//                containerClass: 'sidebar-sm-forced sidebar-sm'
//            })
//            //layouts/sidebar-xs
//            .state('app.layouts.sidebar-xs', {
//                url: '/sidebar-xs',
//                controller: 'SidebarxslayoutCtrl',
//                templateUrl: 'views/tmpl/layouts/sidebar-xs.html',
//                containerClass: 'sidebar-xs-forced sidebar-xs'
//            })
//            //layouts/offcanvas
//            .state('app.layouts.offcanvas', {
//                url: '/offcanvas',
//                controller: 'OffcanvaslayoutCtrl',
//                templateUrl: 'views/tmpl/layouts/offcanvas.html',
//                containerClass: 'sidebar-offcanvas'
//            })
//            //layouts/hz-menu
//            .state('app.layouts.hz-menu', {
//                url: '/hz-menu',
//                controller: 'HzmenuCtrl',
//                templateUrl: 'views/tmpl/layouts/hz-menu.html',
//                containerClass: 'hz-menu'
//            })
//            //layouts/rtl-layout
//            .state('app.layouts.rtl', {
//                url: '/rtl',
//                controller: 'RtlCtrl',
//                templateUrl: 'views/tmpl/layouts/rtl.html',
//                containerClass: 'rtl'
//            })
//            //maps
//            .state('app.maps', {
//                url: '/maps',
//                template: '<div ui-view></div>'
//            })
//            //maps/vector
//            .state('app.maps.vector', {
//                url: '/vector',
//                controller: 'VectorMapCtrl',
//                templateUrl: 'views/tmpl/maps/vector.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/jqvmap/jqvmap/jquery.vmap.min.js',
//                            'scripts/vendor/jqvmap/jqvmap/maps/jquery.vmap.world.js',
//                            'scripts/vendor/jqvmap/jqvmap/maps/jquery.vmap.usa.js',
//                            'scripts/vendor/jqvmap/jqvmap/maps/jquery.vmap.europe.js',
//                            'scripts/vendor/jqvmap/jqvmap/maps/jquery.vmap.germany.js'
//                        ]);
//                    }]
//                }
//            })
//            //maps/google
//            .state('app.maps.google', {
//                url: '/google',
//                controller: 'GoogleMapCtrl',
//                templateUrl: 'views/tmpl/maps/google.html'
//            })
//            //maps/leaflet
//            .state('app.maps.leaflet', {
//                url: '/leaflet',
//                controller: 'LeafletMapCtrl',
//                templateUrl: 'views/tmpl/maps/leaflet.html'
//            })
//            //calendar
//            .state('app.calendar', {
//                url: '/calendar',
//                controller: 'CalendarCtrl',
//                templateUrl: 'views/tmpl/calendar.html'
//            })
//            //app core pages (errors, login,signup)
//            .state('core', {
//                abstract: true,
//                url: '/core',
//                template: '<div ui-view></div>'
//            })
//            //login
//            .state('core.login', {
//                url: '/login',
//                controller: 'LoginCtrl',
//                templateUrl: 'views/tmpl/pages/login.html'
//            })
//            //signup
//            .state('core.signup', {
//                url: '/signup',
//                controller: 'SignupCtrl',
//                templateUrl: 'views/tmpl/pages/signup.html'
//            })
//            //forgot password
//            .state('core.forgotpass', {
//                url: '/forgotpass',
//                controller: 'ForgotPasswordCtrl',
//                templateUrl: 'views/tmpl/pages/forgotpass.html'
//            })
//            //page 404
//            .state('core.page404', {
//                url: '/page404',
//                templateUrl: 'views/tmpl/pages/page404.html'
//            })
//            //page 500
//            .state('core.page500', {
//                url: '/page500',
//                templateUrl: 'views/tmpl/pages/page500.html'
//            })
//            //page offline
//            .state('core.page-offline', {
//                url: '/page-offline',
//                templateUrl: 'views/tmpl/pages/page-offline.html'
//            })
//            //locked screen
//            .state('core.locked', {
//                url: '/locked',
//                templateUrl: 'views/tmpl/pages/locked.html'
//            })
//            //example pages
//            .state('app.pages', {
//                url: '/pages',
//                template: '<div ui-view></div>'
//            })
//            //gallery page
//            .state('app.pages.gallery', {
//                url: '/gallery',
//                controller: 'GalleryCtrl',
//                templateUrl: 'views/tmpl/pages/gallery.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/mixitup/jquery.mixitup.js',
//                            'scripts/vendor/magnific/magnific-popup.css',
//                            'scripts/vendor/magnific/jquery.magnific-popup.min.js'
//                        ]);
//                    }]
//                }
//            })
//            //timeline page
//            .state('app.pages.timeline', {
//                url: '/timeline',
//                controller: 'TimelineCtrl',
//                templateUrl: 'views/tmpl/pages/timeline.html'
//            })
//            //chat page
//            .state('app.pages.chat', {
//                url: '/chat',
//                controller: 'ChatCtrl',
//                templateUrl: 'views/tmpl/pages/chat.html'
//            })
//            //search results
//            .state('app.pages.search-results', {
//                url: '/search-results',
//                controller: 'SearchResultsCtrl',
//                templateUrl: 'views/tmpl/pages/search-results.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/slider/bootstrap-slider.js'
//                        ]);
//                    }]
//                }
//            })
//            //profile page
//            .state('app.pages.profile', {
//                url: '/profile',
//                controller: 'ProfileCtrl',
//                templateUrl: 'views/tmpl/pages/profile.html',
//                resolve: {
//                    plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            'scripts/vendor/filestyle/bootstrap-filestyle.min.js'
//                        ]);
//                    }]
//                }
//            })
//            //intro page
//            .state('app.pages.intro', {
//                url: '/intro',
//                controller: 'IntroPageCtrl',
//                templateUrl: 'views/tmpl/pages/intro.html'
//            })
//            //documentation
//            .state('app.help', {
//                url: '/help',
//                controller: 'HelpCtrl',
//                templateUrl: 'views/tmpl/help.html'
//            });
    }]);

