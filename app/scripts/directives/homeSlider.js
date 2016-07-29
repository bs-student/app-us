'use strict';


app
    .directive('homeSlider', function () {
        return {
            restrict: 'E',
            link: function postLink(scope, element) {




                var apiRevoSlider = $('.tp-banner').show().revolution(
                    {
                        dottedOverlay: "none",
                        delay: 9000,
                        startwidth: 1140,
                        startheight: 700,
                        hideThumbs: 200,

                        thumbWidth: 100,
                        thumbHeight: 50,
                        thumbAmount: 3,

                        navigationType: "none",
                        navigationArrows: "solo",
                        navigationStyle: "preview1",

                        touchenabled: "off",
                        onHoverStop: "on",

                        swipe_velocity: 0.7,
                        swipe_min_touches: 1,
                        swipe_max_touches: 1,
                        drag_block_vertical: false,


                        parallax: "mouse",
                        parallaxBgFreeze: "on",
                        parallaxLevels: [8, 7, 6, 5, 4, 3, 2, 1],
                        parallaxDisableOnMobile: "on",


                        keyboardNavigation: "off",

                        navigationHAlign: "center",
                        navigationVAlign: "bottom",
                        navigationHOffset: 0,
                        navigationVOffset: 20,

                        soloArrowLeftHalign: "left",
                        soloArrowLeftValign: "center",
                        soloArrowLeftHOffset: 20,
                        soloArrowLeftVOffset: 0,

                        soloArrowRightHalign: "right",
                        soloArrowRightValign: "center",
                        soloArrowRightHOffset: 20,
                        soloArrowRightVOffset: 0,

                        shadow: 0,
                        fullWidth: "off",
                        fullScreen: "on",

                        spinner: "spinner3",

                        stopLoop: "off",
                        stopAfterLoops: -1,
                        stopAtSlide: -1,

                        shuffle: "off",

                        forceFullWidth: "off",
                        fullScreenAlignForce: "off",
                        minFullScreenHeight: "400",

                        hideThumbsOnMobile: "off",
                        hideNavDelayOnMobile: 1500,
                        hideBulletsOnMobile: "off",
                        hideArrowsOnMobile: "off",
                        hideThumbsUnderResolution: 0,

                        hideSliderAtLimit: 0,
                        hideCaptionAtLimit: 0,
                        hideAllCaptionAtLilmit: 0,
                        startWithSlide: 0,
                        fullScreenOffsetContainer: ".header"
                    });

                apiRevoSlider.bind("revolution.slide.onchange", function (e, data) {
                    if ($(window).width() > 992) {
                        if ($('#slider ul > li').eq(data.slideIndex - 1).hasClass('light')) {
                            $('#header:not(.sticky-header)').addClass('light');
                        } else {

                            $('#header:not(.sticky-header)').removeClass('light');
                        }
                    }
                });

                $(window).on('scroll', function () {

                    sliderParallax();

                });

                function sliderParallax(){
                    if (( $('body').hasClass('device-lg') || $('body').hasClass('device-md') )) {
                        var parallaxOffsetTop = sliderParallaxOffset();
                        if ($(window).scrollTop() > parallaxOffsetTop) {
                            $('.slider-parallax').css({ 'transform': 'translate(0,' + (($(window).scrollTop() - parallaxOffsetTop) / 1.5 ) + 'px)' });
                        } else {
                            $('.slider-parallax').css({ 'transform': 'translate(0,0)' });
                        }
                    } else {
                        $('.slider-parallax').css({ 'transform': 'translate(0,0)' });
                    }
                }



                function sliderParallaxOffset () {
                    var sliderParallaxOffsetTop = 0;
                    var headerHeight = $('#header').outerHeight();
                    if ($('body').hasClass('side-header') || $('#header').hasClass('transparent-header')) {
                        headerHeight = 0;
                    }
                    if ($('#page-title').length > 0) {
                        var pageTitleHeight = $('#page-title').outerHeight();
                        sliderParallaxOffsetTop = pageTitleHeight + headerHeight;
                    } else {
                        sliderParallaxOffsetTop = headerHeight;
                    }

                    if ($('#slider').next('#header').length > 0) {
                        sliderParallaxOffsetTop = 0;
                    }

                    return sliderParallaxOffsetTop;
                }

                scope.rotateSlide=function(){

                    if(scope.firstSlide){
                        scope.secondSlide = true;
                        scope.firstSlide = false;
                        $('.tp-bgimg').animate({opacity:.9}, 'fast', function() {
                            $(this)
                                .css({'background-image': 'url(' + "assets/images/slider/2.jpg" + ')'})
                                .animate({opacity:1});
                        });

                    }else if(scope.secondSlide){
                        scope.secondSlide = false;
                        scope.thirdSlide = true;

                        $('.tp-bgimg').animate({opacity:.9}, 'fast', function() {
                            $(this)
                                .css({'background-image': 'url(' + "assets/images/slider/3.jpg" + ')'})
                                .animate({opacity:1});
                        });

                    }else if(scope.thirdSlide){
                        scope.thirdSlide = false;
                        scope.fourthSlide = true;

                        $('.tp-bgimg').animate({opacity:.9}, 'fast', function() {
                            $(this)
                                .css({'background-image': 'url(' + "assets/images/slider/4.jpg" + ')'})
                                .animate({opacity:1});
                        });

                    }
                    else if(scope.fourthSlide){
                        scope.firstSlide = true;
                        scope.fourthSlide = false;
                        $('.tp-bgimg').animate({opacity:.7}, 'fast', function() {
                            $(this)
                                .css({'background-image': 'url(' + "assets/images/slider/1.jpg" + ')'})
                                .animate({opacity: 1});
                        });

                    }
                };
            }


        };
    });
