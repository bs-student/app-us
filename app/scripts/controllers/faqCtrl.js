(function () {

    'use strict';

    app
        .controller('FaqCtrl', FaqCtrl);

    FaqCtrl.$inject = ['$scope'];

    function FaqCtrl($scope) {

        $scope.$parent.headerStyle = "dark";
        $scope.$parent.activePage = "helpAndSafety";

        $scope.oneAtATime = true;

        $scope.faqList = [


            {
                tabId: "tab_1",
                linkText:"about student2student",
                active:true,
                faqs: [
                    {
                        question: "Is Student 2 Student really free?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Why do I need to Sign Up at my University??",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Do I need a credit card?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "What is the COE (Cash on Exchange) concept?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }

                    ,
                    {
                        question: "How do I sell my textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Do I need an account to sell textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Can I post my textbooks on Facebook and Twitter?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },

                    {
                        question: "Does the seller see my name and contact information?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Can I sell textbooks to students at other Universities?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: 'What is the "My sell page"?',
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                ]
            },
            {
                tabId: "tab_2",
                linkText:"general",
                faqs: [
                    {
                        question: "How do I sell my textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Do I need an account to sell textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Can I post my textbooks on Facebook and Twitter?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },

                    {
                        question: "Does the seller see my name and contact information?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Can I sell textbooks to students at other Universities?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Is Student 2 Student really free?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Why do I need to Sign Up at my University??",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Do I need a credit card?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "What is the COE (Cash on Exchange) concept?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }

                    ,

                    {
                        question: 'What is the "My sell page"?',
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                ]

            },
            {
                tabId: "tab_3",
                linkText:"seller's handbook",
                faqs: [
                    {
                        question: "Can I post my textbooks on Facebook and Twitter?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },

                    {
                        question: "Does the seller see my name and contact information?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Can I sell textbooks to students at other Universities?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: 'What is the "My sell page"?',
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Is Student 2 Student really free?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Why do I need to Sign Up at my University??",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Do I need a credit card?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "What is the COE (Cash on Exchange) concept?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }

                    ,
                    {
                        question: "How do I sell my textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Do I need an account to sell textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }


                ]
            },
            {
                tabId: "tab_4",
                linkText:"buyer's handbook",
                faqs: [
                    {
                        question: "Is Student 2 Student really free?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Why do I need to Sign Up at my University??",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Do I need a credit card?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "What is the COE (Cash on Exchange) concept?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }

                    ,
                    {
                        question: "How do I sell my textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Do I need an account to sell textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Can I post my textbooks on Facebook and Twitter?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },

                    {
                        question: "Does the seller see my name and contact information?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Can I sell textbooks to students at other Universities?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: 'What is the "My sell page"?',
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                ]
            },
            {
                tabId: "tab_5",
                linkText:"how to's",
                faqs: [
                    {
                        question: "Is Student 2 Student really free?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Why do I need to Sign Up at my University??",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Do I need a credit card?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "What is the COE (Cash on Exchange) concept?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }

                    ,
                    {
                        question: "How do I sell my textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Do I need an account to sell textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Can I post my textbooks on Facebook and Twitter?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },

                    {
                        question: "Does the seller see my name and contact information?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Can I sell textbooks to students at other Universities?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: 'What is the "My sell page"?',
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                ]
            },
            {
                tabId: "tab_6",
                linkText:"policies",
                faqs: [
                    {
                        question: "Is Student 2 Student really free?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Why do I need to Sign Up at my University??",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Do I need a credit card?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "What is the COE (Cash on Exchange) concept?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }

                    ,
                    {
                        question: "How do I sell my textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Do I need an account to sell textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Can I post my textbooks on Facebook and Twitter?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },

                    {
                        question: "Does the seller see my name and contact information?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Can I sell textbooks to students at other Universities?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: 'What is the "My sell page"?',
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                ]
            },
            {
                tabId: "tab_7",
                linkText:"contact us",
                faqs: [
                    {
                        question: "Is Student 2 Student really free?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Why do I need to Sign Up at my University??",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Do I need a credit card?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "What is the COE (Cash on Exchange) concept?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }

                    ,
                    {
                        question: "How do I sell my textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Do I need an account to sell textbooks?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                    ,
                    {
                        question: "Can I post my textbooks on Facebook and Twitter?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },

                    {
                        question: "Does the seller see my name and contact information?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: "Can I sell textbooks to students at other Universities?",
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    },
                    {
                        question: 'What is the "My sell page"?',
                        answer: "Yes, Student 2 Student is absolutely free to all students. Buying, selling, comparing, contacting others is available to you at no charge! We want you to save big money!"
                    }
                ]
            }
        ];

        $scope.active=_active;

        function _active(faq){
            angular.forEach($scope.faqList,function(faqL){
                faqL.active=false;
            });
            faq.active=true;
        }
    }


})();


