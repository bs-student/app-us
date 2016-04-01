(function () {

    'use strict';

    app
        .controller('BookSellCtrl', BookSellCtrl);

    BookSellCtrl.$inject = ['$scope','bookService','identityService','responseService'];

    function BookSellCtrl($scope,bookService,identityService,responseService) {

        $scope.searchByIsbn = _searchByIsbn;
        $scope.book = null;

        $scope.addNewSellBook =false;
        $scope.addCustomNewSellBook =false;
        $scope.user = identityService.getAuthorizedUserData();
        $scope.sellBook = _sellBook;
        $scope.sellCustomBook = _sellCustomBook;
        $scope.userDetails = identityService.getAuthorizedUserData();
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


//        $scope.changePage =_changePage;
//        $scope.bookSearchResult = null;
//
//        $scope.maxSize = 10;
//        $scope.totalSearchResults = 0;
//        $scope.currentPage = 1;
//
//
//
//        function _changePage(currentPage){
//            console.log(currentPage);
//            var data = {
//                'keyword':$scope.searchText,
//                'page':currentPage,
//                'accessToken': identityService.getAccessToken()
//            }
//            bookService.searchBooks(data).then(function(response){
//                $scope.bookSearchResult = response.data.result.books;
////                $scope.totalSearchResults= parseInt(response.data.result.totalSearchResults, 10);
//            });
//        }

        function _sellBook(valid){

//            console.log($scope.book);


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
            bookData.bookPublishDate = $scope.book.bookPublisherDate;
            bookData.bookBinding = $scope.book.bookBinding;
            bookData.bookPage = $scope.book.bookPages;
            bookData.bookPriceSell = $scope.book.sellingPrice;
            bookData.bookLanguage = $scope.book.bookLanguage;
            bookData.bookDescription = $scope.book.bookDescription;
            bookData.bookCondition = $scope.book.bookCondition;
            bookData.bookIsHighlighted = $scope.book.textHighlighted;
            bookData.bookHasNotes = $scope.book.notesOnTextbook;
            bookData.bookComment = $scope.book.comment;
            bookData.bookContactMethod = $scope.book.contactMethod;
            bookData.bookContactHomeNumber = $scope.book.contactInfoHomePhone;
            bookData.bookContactCellNumber = $scope.book.contactInfoCellPhone;
            bookData.bookContactEmail = $scope.book.contactInfoEmail;

            bookData.bookIsAvailablePublic = $scope.book.availablePublic;
            bookData.bookPaymentMethodCaShOnExchange = $scope.book.paymentMethodCashOnExchange;
            bookData.bookPaymentMethodCheque = $scope.book.paymentMethodCheque;
            bookData.bookAvailableDate = $scope.book.availableDate;

            bookData.bookMediumImageUrl = $scope.book.bookMediumImageUrl;
            bookData.bookLargeImageUrl = $scope.book.bookLargeImageUrl ;
            bookData.bookTitleImage = null;



            formData.append("book",JSON.stringify(bookData));


            bookService.addSellBook(identityService.getAccessToken(),formData).then(function(response){
               if(response.data.success!=undefined){
                   responseService.showSuccessToast(response.data.success.successTitle);
               }else if(response.data.error!=undefined){
                   responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
               }
            });


        }


        function _sellCustomBook(valid){

//            console.log($scope.book);
            var formData = new FormData();

            var bookData={};

            var i=0;
            angular.forEach($scope.files, function (file) {

                if(file.fileId  == parseInt($scope.book.titleImage,10)){
                    bookData.bookTitleImage = i;
                }
                formData.append("file"+ i.toString(),file);
                i++;
            });




            bookData.bookTitle = $scope.book.bookTitle;
            bookData.bookDirectorAuthorArtist = $scope.book.bookDirectorAuthorArtist;
            bookData.bookEdition = $scope.book.bookEdition;
            bookData.bookIsbn10 = $scope.book.bookIsbn;
            bookData.bookIsbn13 = $scope.book.bookEan;
            bookData.bookPublisher = $scope.book.bookPublisher;
            bookData.bookPublishDate = $scope.book.bookPublishDate;
            bookData.bookBinding = $scope.book.bookBinding;
            bookData.bookPage = $scope.book.bookPages;
            bookData.bookPriceSell = $scope.book.sellingPrice;
            bookData.bookLanguage = $scope.book.bookLanguage;
            bookData.bookDescription = $scope.book.bookDescription;
            bookData.bookCondition = $scope.book.bookCondition;
            bookData.bookIsHighlighted = $scope.book.textHighlighted;
            bookData.bookHasNotes = $scope.book.notesOnTextbook;
            bookData.bookComment = $scope.book.comment;
            bookData.bookContactMethod = $scope.book.contactMethod;
            bookData.bookContactHomeNumber = $scope.book.contactInfoHomePhone;
            bookData.bookContactCellNumber = $scope.book.contactInfoCellPhone;
            bookData.bookContactEmail = $scope.book.contactInfoEmail;

            bookData.bookIsAvailablePublic = $scope.book.availablePublic;
            bookData.bookPaymentMethodCaShOnExchange = $scope.book.paymentMethodCashOnExchange;
            bookData.bookPaymentMethodCheque = $scope.book.paymentMethodCheque;
            bookData.bookAvailableDate = $scope.book.availableDate;

            bookData.bookMediumImageUrl = $scope.book.bookMediumImageUrl;
            bookData.bookLargeImageUrl = $scope.book.bookLargeImageUrl ;




            formData.append("book",JSON.stringify(bookData));

//            console.log(bookData);

            bookService.addSellBook(identityService.getAccessToken(),formData).then(function(response){
                if(response.data.success!=undefined){
                    responseService.showSuccessToast(response.data.success.successTitle);
                }else if(response.data.error!=undefined){
                    responseService.showErrorToast(response.data.error.errorTitle,response.data.error.errorDescription);
                }
            });

        }


        function _searchByIsbn(){

            var data = {
                'isbn':$scope.isbn,
                'accessToken': identityService.getAccessToken()
            }
            bookService.searchBooksByIsbnAmazon(data).then(function(response){
                $scope.book = response.data.result.books[0];

                if(response.data.result.books.length==1){
                    $scope.addNewSellBook =true;
                }else{
                    $scope.addCustomNewSellBook =true;
                }
                console.log($scope.addNewSellBook);
//                $scope.totalSearchResults= parseInt(response.data.result.totalSearchResults, 10);
//                console.log(response.data.result.books.length);
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
