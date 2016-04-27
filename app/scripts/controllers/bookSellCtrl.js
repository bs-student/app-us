(function () {

    'use strict';

    app
        .controller('BookSellCtrl', BookSellCtrl);

    BookSellCtrl.$inject = ['$state','$scope','bookService','identityService','responseService'];

    function BookSellCtrl($state,$scope,bookService,identityService,responseService) {

        if(!$scope.$parent.loggedIn){
            $state.go("app.login");

        }


        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "sellBook";

        $scope.searchByIsbn = _searchByIsbn;
        $scope.book = null;

        $scope.addNewSellBook =false;
        $scope.addCustomNewSellBook =false;
//        $scope.user = identityService.getAuthorizedUserData();
        $scope.sellBook = _sellBook;
//        $scope.sellCustomBook = _sellCustomBook;
//        $scope.userDetails = identityService.getAuthorizedUserData();
        $scope.removeFile = _removeFile;








        $scope.today = function() {
            $scope.dt = new Date();
        };

        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            'class': 'datepicker'
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];



        function _sellBook(valid){

            if(valid){
                var formData = new FormData();

                var i=0;
                angular.forEach($scope.files, function (file) {
                    formData.append("file"+ i.toString(),file);
                    i++;
                });

                var bookData={};

                bookData.bookTitle = $scope.book.bookTitle;
                bookData.bookDirectorAuthorArtist = $scope.book.bookDirectorAuthorArtist;
                bookData.bookEdition = $scope.book.bookEdition;
                bookData.bookIsbn10 = $scope.book.bookIsbn;
                bookData.bookIsbn13 = $scope.book.bookEan;
                bookData.bookPublisher = $scope.book.bookPublisher;
                bookData.bookPublishDate = $scope.book.bookPublishDate;
                bookData.bookBinding = $scope.book.bookBinding;
                bookData.bookPage = $scope.book.bookPages;
                bookData.bookLanguage = $scope.book.bookLanguage;
                bookData.bookDescription = $scope.book.bookDescription;
                if($scope.addNewSellBook){
                    bookData.bookImage = $scope.book.bookImages[0].image;
                    bookData.bookType = "newSellBook";
                }
                if($scope.addCustomNewSellBook){
                    bookData.bookType = "newSellCustomBook";
                }




                var bookDealData={};

                bookDealData.bookPriceSell = $scope.book.sellingPrice;
                bookDealData.bookCondition = $scope.book.bookCondition;
                bookDealData.bookIsHighlighted = $scope.book.textHighlighted;
                bookDealData.bookHasNotes = $scope.book.notesOnTextbook;
                bookDealData.bookComment = $scope.book.comment;
                bookDealData.bookContactMethod = $scope.book.contactMethod;
                bookDealData.bookContactHomeNumber = $scope.book.contactInfoHomePhone;
                bookDealData.bookContactCellNumber = $scope.book.contactInfoCellPhone;
                bookDealData.bookContactEmail = $scope.book.contactInfoEmail;
                bookDealData.bookIsAvailablePublic = $scope.book.availablePublic;
                bookDealData.bookPaymentMethodCaShOnExchange = $scope.book.paymentMethodCashOnExchange;
                bookDealData.bookPaymentMethodCheque = $scope.book.paymentMethodCheque;
                bookDealData.bookAvailableDate = $scope.book.availableDate;


                var data={
                    bookData:bookData,
                    bookDealData:bookDealData
                };


                formData.append("data",JSON.stringify(data));


                bookService.addSellBook(identityService.getAccessToken(),formData).then(function(response){

                    responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);

                }).catch(function(response){
                    if (response.data.error_description == "The access token provided is invalid.") {

                    } else if (response.data.error_description == "The access token provided has expired.") {
                        identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                            identityService.setAccessToken(response.data);
                            _sellBook(valid);
                        });
                    } else if (response.data.error != undefined) {
                        responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                    } else {
                        responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                    }
                });
            }
        }


//        function _sellCustomBook(valid){
//
//            var formData = new FormData();
//
//            var bookData={};
//
//            var i=0;
//            angular.forEach($scope.files, function (file) {
//
//                if(file.fileId  == parseInt($scope.book.titleImage,10)){
//                    bookData.bookTitleImage = i;
//                }
//                formData.append("file"+ i.toString(),file);
//                i++;
//            });
//
//            var bookData={};
//
//            bookData.bookTitle = $scope.book.bookTitle;
//            bookData.bookDirectorAuthorArtist = $scope.book.bookDirectorAuthorArtist;
//            bookData.bookEdition = $scope.book.bookEdition;
//            bookData.bookIsbn10 = $scope.book.bookIsbn;
//            bookData.bookIsbn13 = $scope.book.bookEan;
//            bookData.bookPublisher = $scope.book.bookPublisher;
//            bookData.bookPublishDate = $scope.book.bookPublishDate;
//            bookData.bookBinding = $scope.book.bookBinding;
//            bookData.bookPage = $scope.book.bookPages;
//            bookData.bookLanguage = $scope.book.bookLanguage;
//            bookData.bookDescription = $scope.book.bookDescription;
//
//
//            var bookDealData={};
//
//            bookDealData.bookPriceSell = $scope.book.sellingPrice;
//            bookDealData.bookCondition = $scope.book.bookCondition;
//            bookDealData.bookIsHighlighted = $scope.book.textHighlighted;
//            bookDealData.bookHasNotes = $scope.book.notesOnTextbook;
//            bookDealData.bookComment = $scope.book.comment;
//            bookDealData.bookContactMethod = $scope.book.contactMethod;
//            bookDealData.bookContactHomeNumber = $scope.book.contactInfoHomePhone;
//            bookDealData.bookContactCellNumber = $scope.book.contactInfoCellPhone;
//            bookDealData.bookContactEmail = $scope.book.contactInfoEmail;
//            bookDealData.bookIsAvailablePublic = $scope.book.availablePublic;
//            bookDealData.bookPaymentMethodCaShOnExchange = $scope.book.paymentMethodCashOnExchange;
//            bookDealData.bookPaymentMethodCheque = $scope.book.paymentMethodCheque;
//            bookDealData.bookAvailableDate = $scope.book.availableDate;
//
//            var data={
//                bookData:bookData,
//                bookDealData:bookDealData
//            };
//
//
//            formData.append("data",JSON.stringify(data));
//
//
//
////            bookData.bookTitle = $scope.book.bookTitle;
////            bookData.bookDirectorAuthorArtist = $scope.book.bookDirectorAuthorArtist;
////            bookData.bookEdition = $scope.book.bookEdition;
////            bookData.bookIsbn10 = $scope.book.bookIsbn;
////            bookData.bookIsbn13 = $scope.book.bookEan;
////            bookData.bookPublisher = $scope.book.bookPublisher;
////            bookData.bookPublishDate = $scope.book.bookPublishDate;
////            bookData.bookBinding = $scope.book.bookBinding;
////            bookData.bookPage = $scope.book.bookPages;
////            bookData.bookPriceSell = $scope.book.sellingPrice;
////            bookData.bookLanguage = $scope.book.bookLanguage;
////            bookData.bookDescription = $scope.book.bookDescription;
////            bookData.bookCondition = $scope.book.bookCondition;
////            bookData.bookIsHighlighted = $scope.book.textHighlighted;
////            bookData.bookHasNotes = $scope.book.notesOnTextbook;
////            bookData.bookComment = $scope.book.comment;
////            bookData.bookContactMethod = $scope.book.contactMethod;
////            bookData.bookContactHomeNumber = $scope.book.contactInfoHomePhone;
////            bookData.bookContactCellNumber = $scope.book.contactInfoCellPhone;
////            bookData.bookContactEmail = $scope.book.contactInfoEmail;
////
////            bookData.bookIsAvailablePublic = $scope.book.availablePublic;
////            bookData.bookPaymentMethodCaShOnExchange = $scope.book.paymentMethodCashOnExchange;
////            bookData.bookPaymentMethodCheque = $scope.book.paymentMethodCheque;
////            bookData.bookAvailableDate = $scope.book.availableDate;
////
////            bookData.bookMediumImageUrl = $scope.book.bookMediumImageUrl;
////            bookData.bookLargeImageUrl = $scope.book.bookLargeImageUrl ;
//
//
//
//
////            formData.append("book",JSON.stringify(bookData));
//
////            console.log(bookData);
//
//            bookService.addCustomSellBook(identityService.getAccessToken(),formData).then(function(response){
//                responseService.showSuccessToast(response.data.success.successTitle,response.data.success.successDescription);
//
//            }).catch(function(response){
//                if (response.data.error_description == "The access token provided is invalid.") {
//
//                } else if (response.data.error_description == "The access token provided has expired.") {
//                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
//                        identityService.setAccessToken(response.data);
//                        _sellCustomBook(valid);
//                    });
//                } else if (response.data.error != undefined) {
//                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
//                } else {
//                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
//                }
//            });;
//
//        }


        function _searchByIsbn(){

            var data = {
                'isbn':$scope.isbn,
                'accessToken': identityService.getAccessToken()
            };
            bookService.searchBooksByIsbnAmazon(data).then(function(response){

                $scope.book = response.data.success.successData.books[0];

                if(response.data.success.successData.books.length==1){
                    $scope.addNewSellBook =true;
                    $scope.addCustomNewSellBook =false;
                }else{
                    $scope.addNewSellBook =false;
                    $scope.addCustomNewSellBook =true;
                }

            }).catch(function(response){
                if (response.data.error_description == "The access token provided is invalid.") {

                } else if (response.data.error_description == "The access token provided has expired.") {
                    identityService.getRefreshAccessToken(identityService.getRefreshToken()).then(function (response) {
                        identityService.setAccessToken(response.data);
                        _searchByIsbn();
                    });
                } else if (response.data.error != undefined) {
                    responseService.showErrorToast(response.data.error.errorTitle, response.data.error.errorDescription);
                } else {
                    responseService.showErrorToast("Something Went Wrong", "Please Refresh the page again.")
                }
            });

        }




        function _removeFile(item){
            var i = 0;
            angular.forEach($scope.files,function(file){
                if(file.fileId == item.fileId){
                    $scope.files.splice($scope.files.indexOf(file), 1);
                }
                i++;
            });
            console.log($scope.files);
        }



    }


})();
