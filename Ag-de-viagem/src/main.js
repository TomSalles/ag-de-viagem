// MAIN.JS
//--------------------------------------------------------------------------------------------------------------------------------
//This is main JS file that contains custom JS scipts and initialization used in this template*/
// -------------------------------------------------------------------------------------------------------------------------------
// Template Name: Mach
// Author: Fabcode.
// Version 1.0 - Initial Release
// Website: http://www.fabcode.net
// Copyright: (C) 2016
// -------------------------------------------------------------------------------------------------------------------------------

/*global $:false */
/*global window: false */






(function() {
        "use strict";

        //Vieport height and width calculation
        var vH = $(window).height();

        var vW = $(window).width();

        $(document).ready(function() {

            // Vertical Navigation Type 1

            $('.main-vertical-nav-wrap .vertical-nav-container').height(vH);

            $('.main-vertical-nav-wrap .vertical-nav-trigger').on('click',function() {
                $('.main-vertical-nav-wrap .vertical-nav-container').toggleClass('vertical-nav-container-expnd');
                $('.mastwrap').toggleClass('main-vertical-nav-on');
                $('.vertical-nav-container .vertical-logo-section').toggleClass('vertical-logo-on');
                $('.vertical-nav-container .vertical-img-section').toggleClass('vertical-img-on');
            });

            $('#menu-toggle').on('click',function(){
              $(this).toggleClass('open');
            });

            $('.main-vertical-nav-wrap .vertical-menu-section a:not(.sub-menu-trigger)').on('click',function() {
                setTimeout(function() {
                    $('#menu-toggle').removeClass('open');
                    $('.main-vertical-nav-wrap .vertical-nav-container').removeClass('vertical-nav-container-expnd');
                    $('.mastwrap').removeClass('main-vertical-nav-on');
                    $('.vertical-nav-container .vertical-logo-section').removeClass('vertical-logo-on');
                    $('.vertical-nav-container .vertical-img-section').removeClass('vertical-img-on');
                },600);
                
            });

            $('.vertical-nav-container .vertical-menu-section').height(vH);

            // $('.main-vertical-nav-wrap .vertical-menu-section ul li a').click(function() {
            //     $('.main-vertical-nav-wrap .vertical-nav-container').removeClass('vertical-nav-container-expnd');
            // });

            //Sub Menu Trigger
            $('.main-menu li a.sub-menu-trigger').on('mouseenter', function(){
                $(this).next('.sub-menu').stop().slideDown(400);
            });
            $('.main-menu li').on('mouseleave', function(){
                $('.sub-menu').stop().slideUp(400);
            });

            //Horizontal Navigation Type 1

            if( vW > 1024 ) {

                $('.horizontal-nav-trigger').css('display','none');

                var windowW = $(window).width(),
                    menuH = $('.main-horizontal-nav-wrap .menu').height();

                //Drodown Menu Position Adjustment
                $('.main-horizontal-nav-wrap .menu-container > ul.menu > li:not(.megamenu) > .dropdown').each(function() {
                    $(this).css('top', menuH);
                    var child1Width = 0;

                    if ($(this).find('.dropdown > li > .dropdown').width() !== null) {
                        child1Width = $(this).find('.dropdown').width();
                        var child2Width = $(this).find('.dropdown > li > .dropdown').width(),
                            child2offSetLeft = $(this).find('.dropdown > li > .dropdown').offset().left;

                        if (child2offSetLeft + child2Width > windowW) {
                            $(this).find('.dropdown').css({
                                'left': -child1Width + 'px'
                            });
                            $(this).find('.dropdown > li > .dropdown').css({
                                'left': -child2Width + 'px'
                            });
                        }
                    } else if ($(this).find('.dropdown').width() !== null) {
                        var child1offSetLeft = $(this).find('.dropdown').offset().left;

                        if (child1offSetLeft + child1Width > windowW) {
                            $(this).find('.dropdown').css({
                                'left': -child1Width + 'px'
                            });
                        }
                    } else if ($(this).width() !== null) {
                        var offSetLeft = $(this).offset().left;

                        if ($(this).width() + offSetLeft > windowW) {
                            $(this).css({
                                'left': 'auto',
                                'right': '0',
                            });
                            $(this).find('.dropdown').css({
                                'left': -child1Width + 'px'
                            });
                        }
                    } else {

                    }
                });

                // MegaMenu Styling
                $('.main-horizontal-nav-wrap .megamenu').each(function(){
                    var $this = $(this),
                        offSetLeft = $this.offset().left,
                        megaMenuWidth = (windowW-200),
                        megaMenuCols = $this.find('> .dropdown > li.has-dropdown').length,
                        dropdownWidth = megaMenuWidth / megaMenuCols,
                        longestMenuH = 0,
                        posAdjust = (windowW - megaMenuWidth)/2,
                        megaMenuRight = offSetLeft-posAdjust;

                    $this.find('> .dropdown > li.has-dropdown').css('width', dropdownWidth + 'px');
                    $this.find('> .dropdown > li.has-dropdown > .dropdown').each(function(){
                        var menuItemH = $(this).find('> li').height(),
                            currentLength = $(this).find('> li').length,
                            currentHeight = currentLength * menuItemH;

                        if(currentHeight > longestMenuH){
                            longestMenuH = currentHeight;
                        }

                        $(this).css({
                            'width': dropdownWidth + 'px',
                            'height': longestMenuH + 'px'
                         });

                    });

                    $this.find('> .dropdown').each(function () {

                        var ulHeight = $this.height(),
                            megaMenuH = ulHeight + longestMenuH;
                        $(this).css({
                            'top': menuH + 'px',
                            'height': megaMenuH + 'px',
                            'width': megaMenuWidth + 'px',
                            'left': -megaMenuRight + 'px'
                        });

                    });

                });

                //set hover delay for mega menu item in case mouse is hovering on other menu items
                (function hoverdelay(){
                    $('.main-horizontal-nav-wrap .menu li.has-dropdown').each(function(){
                        var $this = $(this),
                            menuTimeoutShow,
                            menuTimeoutHide;
                            $this.children('ul').css({
                                'visibility': 'hidden',
                                'opacity': 0
                            });
                        $this.on("mouseenter", function(e) {
                            if(e.type == "tap") e.stopPropagation();
                            clearTimeout(menuTimeoutShow);
                            clearTimeout(menuTimeoutHide);

                            menuTimeoutShow = setTimeout(function() {
                            $this.addClass("hippo-menu-hovered");
                                if( $this.hasClass("hippo-menu-hovered")){
                                    $this.children('ul').stop().css("visibility", "visible").animate({
                                        "opacity": 1
                                    }, 200);
                                }
                            }, 300);
                        });

                        $this.on("mouseleave", function(e) {
                            clearTimeout(menuTimeoutShow);
                            clearTimeout(menuTimeoutHide);
                            menuTimeoutHide = setTimeout(function() {
                            $this.removeClass("hippo-menu-hovered");
                                if(!$this.hasClass("hippo-menu-hovered")){
                                    $this.children("ul").css({
                                        "opacity": 0,
                                        "visibility": "hidden"
                                    });
                                }
                            }, 300);
                        });
                    });
                })();//end hippo menu hover function

                // Main Horizontal Nav to be sticky

                $('.sticky-nav-section').waypoint(function (direction) {
                        
                    if (direction === 'down') {
                        $('.main-horizontal-nav-wrap').addClass('nav-sticky-on');
                        $('.main-horizontal-nav-wrap').css('display','none');
                        $('.main-horizontal-nav-wrap.nav-sticky-on').slideDown(300);
                        
                    } 
                    else {
                        $('.main-horizontal-nav-wrap.nav-sticky-on').slideUp(200);
                        setTimeout(function() {
                            $('.main-horizontal-nav-wrap').removeClass('nav-sticky-on');
                            $('.main-horizontal-nav-wrap').css('display','block');
                        },300);
                        

                    }
                }, { offset: 10 }); 

            }
            else{

                $('.horizontal-nav-trigger, .mobile-menu-brand-section').css('display','block');
                $('.main-horizontal-nav-wrap').addClass('on-mob-nav');
                $('.main-horizontal-nav-wrap').css('display','none');
                $('.horizontal-nav-trigger').on('click',function() {
                    $('.main-horizontal-nav-wrap').slideToggle(700);
                });
                $('.main-horizontal-nav-wrap .menu-container li.has-dropdown > a').on('click', function(){
                    var this_menu_item = $(this).closest('li');

                    if(!this_menu_item.data('sub-menu-open')){
                        if(this_menu_item.siblings('li').hasClass('sub-menu-open')){
                            this_menu_item.siblings('li.sub-menu-open').find('ul').stop().slideUp(500);
                            this_menu_item.siblings('li.sub-menu-open').data('sub-menu-open', false);
                            this_menu_item.siblings('li.sub-menu-open').find('li').removeClass('sub-menu-open');
                            this_menu_item.siblings('li.sub-menu-open').find('li').data('sub-menu-open', false);
                            this_menu_item.siblings('li.sub-menu-open').removeClass('sub-menu-open');
                            this_menu_item.find('> .dropdown').first().stop().slideDown(500);
                            this_menu_item.addClass('sub-menu-open');
                            this_menu_item.data('sub-menu-open', true);
                        }
                        else{
                            this_menu_item.find('> .dropdown').first().stop().slideDown(500);
                            this_menu_item.addClass('sub-menu-open');
                            this_menu_item.data('sub-menu-open', true);
                        }
                    }
                    else{
                        this_menu_item.find('ul').stop().slideUp(500);
                        this_menu_item.find('li').data('sub-menu-open', false);
                        this_menu_item.removeClass('sub-menu-open');
                        this_menu_item.data('sub-menu-open', false);
                    }
                    return false;
                });

            }

            //To-top position adjustment on scroll

            $('#mastwrap').waypoint(function (direction) {
                if (direction === 'down')
                    $(".mach-to-top").addClass('mach-to-top-scale');
                else
                    $(".mach-to-top").removeClass('mach-to-top-scale');
            },{ offset: -vH });
            

            // Page Header Background background-image

            $('.section-bgimg').each(function() {
                var sectionBgImg = $(this).attr('data-sectionBgImg');
                $(this).css('background-image','url('+sectionBgImg+')');
            });
            

            // Fade Effect Of the Blocks on scroll

            $('.fade-on-scroll-wrap').each(function() {
                $(window).scroll(function(){
                    var top = ($(window).scrollTop() > 0) ? $(window).scrollTop() : 1;
                    if(top < 1500) {
                        $('.fader-fast').stop(true, true).fadeTo(0, 10 / top);
                        $('.fader-more').stop(true, true).fadeTo(0, 40 / top);
                        $('.fader').stop(true, true).fadeTo(0, 100 / top);
                        $('.fade-mover').css('top', top * 1.3); 
                    }
                                
                });
            });

            // YT PLayer Initialization and Generates Video Thumbnail
            if (!device.tablet() && !device.mobile()) {
                // Playes video on non-mobile and non-tablet devices
                $(".bgplayer").each(function() {
                    $(this).mb_YTPlayer();
                });

                // Generates Video Thumbnail and Adds to Video Background
                $('.bgplayer').each(function() {
                    var videoSec = $(this);
                    var videoSec_vLink = videoSec.data('property');
                    var youtube_video_id = videoSec_vLink.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

                    if (youtube_video_id.length == 11) {
                        videoSec.css('background', 'url(http://img.youtube.com/vi/' + youtube_video_id + '/hqdefault.jpg)');
                    }
                });

                // Play Pause Button Animation 
                /* global d3, document */
                var playButton = {
                    el: document.querySelector(".js-button"),

                    iconEls: {
                        playing: document.querySelector("#pause-icon"),
                        paused:  document.querySelector("#play-icon")
                    },

                    nextState: {
                        playing: "paused",
                        paused:  "playing"
                    },

                    animationDuration: 350,

                    init: function () {
                        this.setInitialState();
                        this.replaceUseEl();
                        this.el.addEventListener("click", this.toggle.bind(this));
                    },

                    setInitialState: function () {
                      var initialIconRef = this.el.querySelector("use").getAttribute("xlink:href");
                      this.state = this.el.querySelector(initialIconRef).getAttribute("data-state");
                    },

                    replaceUseEl: function () {
                        d3.select(this.el.querySelector("use")).remove();
                        d3.select(this.el.querySelector("svg")).append("path")
                            .attr("class", "js-icon")
                            .attr("d", this.stateIconPath());
                    },

                    toggle: function () {
                        this.goToNextState();

                        d3.select(this.el.querySelector(".js-icon")).transition()
                            .duration(this.animationDuration)
                            .attr("d", this.stateIconPath());
                    },

                    goToNextState: function () {
                        this.state = this.nextState[this.state];
                    },

                    stateIconPath: function () {
                        return this.iconEls[this.state].getAttribute("d");
                    }
                };

                $('.play-pause-svg').each(function(){
                    playButton.init();
                });
                

                // Play / Pause On click
                var player_flag = false;
                $(".ytp-play-button").on('click', function() {
                    if(player_flag == false) {
                        $(this).closest('.video-section').children('.bgplayer').playYTP();
                        $(this).closest('.video-section').addClass('playing');
                        player_flag = true;
                    } else {
                        $(this).closest('.video-section').children('.bgplayer').pauseYTP();
                        $(this).closest('.video-section').removeClass('playing');
                        player_flag = false;
                    }
                });


            } else {
                // Generates Video Thumbnail and Adds to Video Background
                $('.bgplayer').each(function() {
                    var videoSec = $(this);
                    var videoSec_vLink = videoSec.data('property');
                    var youtube_video_id = videoSec_vLink.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

                    if (youtube_video_id.length == 11) {
                        videoSec.css('background', 'url(http://img.youtube.com/vi/' + youtube_video_id + '/hqdefault.jpg)');
                    }
                });
            }
            

            // Synced Owl Carousel Type One

            $('.synced-owl-section').each(function() {

                // Synced Owl Carousel Type 1: dots of sync1-owl is hidden using css, while only the dots of sync2-owl is
                // only visible
                var sync1 = $(this).find(".sync1-owl");
                var sync2 = $(this).find(".sync2-owl");

                sync1.on(' initialized.owl.carousel', function(event) {
                    var sync_order = 0;
                    sync1.find('.owl-dot').each(function() {
                        $(this).attr('dataitemno',sync_order);
                        sync_order++;
                    });
                });

                sync1.owlCarousel({
                    animateOut: 'fadeOutRight',
                    animateIn: 'fadeInLeft',
                    center : false,
                    loop : false,
                    items : 1,
                    margin:0,
                    nav : false,
                    dots: true,
                    touchDrag:false,
                    mouseDrag:false
                });

                sync2.on(' initialized.owl.carousel', function(event) {
                    var sync_order = 0;
                    sync2.find('.owl-dot').each(function() {
                        $(this).attr('dataitemno',sync_order);
                        sync_order++;
                    });
                });

                sync2.owlCarousel({
                    animateOut: 'fadeOutLeft',
                    animateIn: 'fadeInRight',
                    center : false,
                    loop : false,
                    items : 1,
                    autoplay:false,
                    margin:0,
                    dots: true,
                    nav:false,
                    touchDrag:false,
                    mouseDrag:false
                });    

                sync2.find('.owl-dot').on('click', function() {

                    var number = $(this).attr("dataitemno"); 
                    sync1.find(".owl-dot[dataitemno="+number+"]").trigger('click');
                });
            });

            

            // Skillset Initialization

            $('.skill-bars').each(function() {
                var _this = $(this);

                // Checking whether the skillbar is insidea a carousel
                if($(this).closest('.owl-carousel').length) {
                    // Triggering the skillbar if it is the first slide
                    if($(this).closest('.owl-item').hasClass('active')) {
                        setTimeout(function() {
                            _this.find('.level-full').each(function() {
                                var value = $(this).data('percent');
                                $(this).children('.actual-level').css('width',value);
                                $(this).children('.amount').css('visibility','visible');
                            });
                        },300);
                    }
                    // Triggering the skillbar on clicking the dots
                    $('.owl-carousel .owl-controls .owl-dot').on('click',function() {
                        setTimeout(function() {
                            if(_this.closest('.owl-item').hasClass('active')) {
                                _this.find('.level-full').each(function() {
                                    var value = $(this).data('percent');
                                    $(this).children('.actual-level').css('width',value);
                                    $(this).children('.amount').css('visibility','visible');
                                });
                            }
                        },300);
                    });
                }

                else {
                    // Triggering the skillbar on waypoint if it is not inside a carousel
                    _this.waypoint(function (direction) {
                    
                        if (direction === 'down') {
                            
                            _this.find('.level-full').each(function() {
                                var value = $(this).data('percent');
                                $(this).children('.actual-level').css('width',value);
                                $(this).children('.amount').css('visibility','visible');
                            });
                            
                        } 
                        else {}
                    }, { offset: vH });    
                }
            });

            // Owl Carousel (theme carousel) Single Initialization

            $('.theme-carousel').each(function() {
                var themeCarousel = $(this);

                themeCarousel.owlCarousel({
                    animateOut: $(this).data('animateout'),
                    animateIn: $(this).data('animatein'),
                    autoplay: $(this).data('autoplay'),
                    autoplayTimeout: $(this).data('autoplaytimeout'),
                    autoplayHoverPause: $(this).data('autoplayhoverpause'),
                    autoHeight: $(this).data('autoheight'),
                    center : $(this).data('center'),
                    loop : $(this).data('loop'),
                    items : $(this).data('itemsdefault'),
                    margin:$(this).data('margin'),
                    stagePadding:$(this).data('stagepadding'),
                    startPosition:$(this).data('startposition'),
                    slideBy:$(this).data('slideby'),
                    nav : $(this).data('nav'),
                    navText : [
                            "<i class='ion-chevron-left'></i>",
                            "<i class='ion-chevron-right'></i>"
                    ],
                    dots: $(this).data('dots'),
                    touchDrag:$(this).data('touchdrag'),
                    mouseDrag:$(this).data('mousedrag'),
                    responsive:{
                      0:{
                          items:1
                      },
                      361:{
                          items: themeCarousel.data('xsnumber')
                      },
                      768:{
                          items: themeCarousel.data('smnumber')
                      },
                      1025:{
                          items: themeCarousel.data('mdnumber')
                      }
                    }
                });
            });

            // Tab Owl Carousel (tab carousel) Initialization

            $('.tab-carousel').each(function() {
                var tabCarousel = $(this);
                var pageDataArray = [];
                var i = 0;

                // Carousel Initialization

                tabCarousel.owlCarousel({
                    animateOut: $(this).data('animateout'),
                    animateIn: $(this).data('animatein'),
                    autoplay: false,
                    autoHeight: $(this).data('autoheight'),
                    loop : false,
                    items : 1,
                    startPosition:$(this).data('startposition'),
                    nav : false,
                    dots: true,
                    touchDrag:false,
                    mouseDrag:true
                });

                // Dumping content to Pagination

                tabCarousel.find('.owl-item').each(function() {
                    var pageData = $(this).find('.item').attr('data-pagedata');
                    pageDataArray.push(pageData);
                });

                tabCarousel.find('.owl-dot').each(function(){
                    $(this).html(pageDataArray[i]);
                    i++;
                });

                // Pagination to get on top

                var owlControls = tabCarousel.find('.owl-controls');
                var elem = tabCarousel;
                owlControls.prependTo(elem);

            });
            

            // CountTo Initialization on scroll

            setTimeout(function() {
                var entry = false; 

                $('.counter-section').each(function() {
                    if($(this).hasClass('carousel-counter')) {
                    }
                    else {

                        $('.counter-section').waypoint(function (direction){
                            if (direction === 'down') {
                                if(entry === false)
                                {
                                  $('.timer').countTo({
                                    speed: 2000
                                    });
                                entry = true;
                                }                      
                            }
                        }, { offset: vH });

                    }
                });
            },1000);

            //Parallax INIT

            function parallaxInit() {
                $('.parallax-layer').each(function() {
                    $(this).parallax("30%", 0.1);
                });
            }
            if (!device.tablet() && !device.mobile()) {
                parallaxInit(); //Activating Parallax effect if non-mobile device is detected

            } else {
                $('.parallax-layer').addClass('no-parallax'); //Dectivate Parallax effect if mobile device is detected
            }

            //Accordions

            if($('.accordion-box').length){

                var accordionBoxHt = $('.accordion-box').outerHeight();
                $('.accordion-image-wrap').height(accordionBoxHt);

                var accordionFirstImage = $('.accordion-box .acc-btn.active').attr('data-accordionImgPath');
                var accordionName = $('.accordion-box .acc-btn.active').attr('data-accordionName');
                var accordionDesignation = $('.accordion-box .acc-btn.active').attr('data-accordionDesignation');

                $('.accordion-image-wrap').css('background-image','url('+accordionFirstImage+')');
                $('.accordion-image-wrap .name').html(accordionName);
                $('.accordion-image-wrap .desig').html(accordionDesignation);

                $('.accordion-box .acc-btn').on('click', function() {

                    var _this = $(this);

                    if($(this).hasClass('active')!==true){
                        $('.accordion-box .acc-btn').removeClass('active');
                    }
                    
                    if ($(this).next('.acc-content').is(':visible')){
                        // $(this).removeClass('active');
                        // $(this).next('.acc-content').slideUp(500);
                    }

                    else{
                        $(this).addClass('active');
                        $('.accordion-box .acc-content').slideUp(500);
                        $(this).next('.acc-content').slideDown(500);    

                        $('.accordion-image-wrap').fadeOut(500,function(){
                            accordionFirstImage = _this.attr('data-accordionImgPath');
                            accordionName = _this.attr('data-accordionName');
                            accordionDesignation = _this.attr('data-accordionDesignation');
                            $('.accordion-image-wrap').css('background-image','url('+accordionFirstImage+')');
                            $('.accordion-image-wrap .name').html(accordionName);
                            $('.accordion-image-wrap .desig').html(accordionDesignation);
                        });
                        
                        $('.accordion-image-wrap').fadeIn(300);

                    }
                });
            }

            //Contact Form Type Two Section Height Calculation

            // var contHt = $('.contact-form-type-two-container').height();
            // $('.contact-one-address-container.type-two').height(contHt);

            // FORM VALIDATION
            $("#contactform #submit").on('click', function() {
                //name
                var name = $("#contactform input#name").val();
                var name_base = 'Provide Valid Name';

                //email (check if entered anything)
                var email = $("#contactform input#email").val();
                var email_base = 'Provide Valid E-mail';
                //email (check if entered anything)

                // comments
                var comments = $("#contactform textarea#message").val();
                var comments_base = 'Message must not be empty';

                function isValidEmailAddress(emailAddress) {
                    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
                    return pattern.test(emailAddress);
                }

                if (name == "") {
                    $("#contactform input#name").focus();
                    $('#contactform input#name').attr('placeholder', name_base);
                    $('#contactform input#name').addClass('error-msg');
                    return false;
                } else if (email == "") {
                    //$("#error").fadeIn().text("Email required");
                    $("#contactform input#email").focus();
                    $('#contactform input#email').attr('placeholder', email_base);
                    $('#contactform input#email').addClass('error-msg');
                    return false;
                } else if (email != "") { // If something was entered
                    if (!isValidEmailAddress(email)) {
                        $("#contactform input#email").focus();
                        $('#contactform input#email').val('');
                        $('#contactform input#email').attr('placeholder', email_base);
                        $('#contactform input#email').addClass('error-msg');
                        return false;
                    }
                }
                if (comments == "") {
                    $("#contactform textarea#message").focus();
                    $('#contactform textarea#message').attr('placeholder', comments_base);
                    $('#contactform textarea#message').addClass('error-msg');
                    return false;
                } else {

                    return true;
                }
            });


            // on success...
            function success() {
                $("#success").fadeIn();
                $("#contactForm").fadeOut();
            }

            // Contact Form Ajax Section
            $('#contactform').submit(function() {
                $('.md-content').hide();
                $('.launch_modal').trigger("click");

                $.ajax({
                    type: $("#contactform").attr('method'),
                    url: $("#contactform").attr('action'),
                    data: $("#contactform").serialize(),
                    success: function(data) {
                        if (data == 'success') {
                            $('#contactform').each(function() {
                                this.reset();
                            });

                            $('#contactform input#name').attr('placeholder', $('#contactform input#name').data('placeholder'));
                            $('#contactform input#name').removeClass('error-msg');

                            $('#contactform input#email').attr('placeholder', $('#contactform input#email').data('placeholder'));
                            $('#contactform input#email').removeClass('error-msg');

                            $('#contactform textarea#message').attr('placeholder', $('#contactform textarea#message').data('placeholder'));
                            $('#contactform textarea#message').removeClass('error-msg');

                            $('.md-content').show();
                            $('.md-close').on('click', function() {
                                $('.contact-form-wrap').fadeOut(1000);
                            });
                        } else {
                            $('.md-content').show();
                            $('.md-content h3').html('Something went wrong!');
                            $('.md-content p').html('Please try again.');
                        }
                    }
                });
                return false;
            });

            // Pricing Section

            $('.pricing-each-block').each(function(){
                $(this).find('.pricing-type-section').outerHeight($(this).find('.pricing-content-section').outerHeight());
                $(this).find('.pricing-type-section p').width($(this).find('.pricing-content-section').outerHeight());
            });

        }); 

        $(window).load(function() {


            // Preloader 
            // will first fade out the loading animation
            $("#status").fadeOut();
            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(1000).fadeOut(1000);

            setTimeout(function(){
                $('body').removeClass('preloader-running');
            }, 1000);

            $('body').addClass('preloader-done');
            $("#mastwrap").css('visibility','visible');
            
             
            // Vegas Background Slideshow

            $('.vegas-body-bg-slider').each(function () {
                var vegas_item = [];
          

                $(this).find('.body-bg-image').each(function () {
                    vegas_item.push(this.src);
                });

              

                var item_length = vegas_item.length;
                var image_slides = [];

                for(var i=0; i<item_length; i++){
                    var valueToPush = { };
                    valueToPush["src"] = vegas_item[i];
                    image_slides.push(valueToPush);
                }


                var trans_style = $(this).find('.body-bg-image-wrap').data('transition');
                if(trans_style != undefined)
                {
                    trans_style.push("abc");
                }

                var animation_style = $(this).find('.body-bg-image-wrap').data('animation');
               if(animation_style != undefined)
                {
                    animation_style.push("abc");
                }

                $(this).vegas({
                    slides:image_slides,
                    transitionDuration: $(this).find('.body-bg-image-wrap').data('transitionduration'),
                    transition: trans_style,
                    animation: animation_style,
                    animationDuration: $(this).find('.body-bg-image-wrap').data('animationduration'),
                    timer: false,
                    delay: 10000
                });

            });
            

                // Shuffle With & Without Gutter
                $('.gutter-grid, .no-gutter-grid').each(function() {
                    var $grid = $(this),
                        sizer = '',
                        colNo = $(this).data('col-no'),
                        gutter = $(this).data('gutter');

                    if (gutter.indexOf('%') === -1) {

                        var gutterPixel = parseFloat(gutter, 10),
                            pixelWidth = ($(this).width() - ((colNo - 1) * gutterPixel)) / colNo;

                        $grid.find('.sizer').each(function() {
                            $(this).css({
                                'width': pixelWidth + 'px',
                                'margin-left': gutterPixel + 'px'
                            });
                        });

                        $grid.find('.sizer-2x').each(function() {
                            $(this).css({
                                'width': ((pixelWidth * 2) + gutterPixel) + 'px',
                                'margin-left': gutterPixel + 'px'
                            });
                        });

                        $grid.find('.sizer-3x').each(function() {
                            $(this).css({
                                'width': ((pixelWidth * 3) + gutterPixel * 2) + 'px',
                                'margin-left': gutterPixel + 'px'
                            });
                        });

                    } else {
                        var gutterPercent = parseFloat(gutter, 10),
                            percentWidth = (100 - ((colNo - 1) * gutterPercent)) / colNo;

                        $grid.find('.sizer').each(function() {
                            $(this).css({
                                'width': percentWidth + '%',
                                'margin-left': gutterPercent + '%'
                            });
                        });

                        $grid.find('.sizer-2x').each(function() {
                            $(this).css({
                                'width': ((percentWidth * 2) + gutterPercent) + '%',
                                'margin-left': gutterPercent + '%'
                            });
                        });

                        $grid.find('.sizer-3x').each(function() {
                            $(this).css({
                                'width': ((percentWidth * 3) + gutterPercent * 2) + '%',
                                'margin-left': gutterPercent + '%'
                            });
                        });

                    }
                    sizer = $(this).find(".sizer");

                    // set margin bottom
                    var margin = parseInt(sizer.css('margin-left'), 10);
                    $grid.find('.shuf-item').css({
                        'margin-bottom': margin
                    });

                    // Shuffle Initialization
                    setTimeout(function() {
                        $grid.imagesLoaded(function() {
                            $grid.shuffle({
                                itemSelector: '.shuf-item', // the selector for the items in the grid
                                sizer: sizer,
                                speed: 750
                            });
                        });
                    }, 200);

                    // Shuffle Filter
                    $(this).closest('.portfolio-wrap').find('#filter li a').on('click', function(e) {
                        e.preventDefault();
                        $('#filter li a').removeClass('active'); // set active class
                        $(this).addClass('active');
                        var groupName = $(this).attr('data-group'); // get group name from clicked item
                        $grid.shuffle('shuffle', groupName); // reshuffle grid
                    });
                });

                // FeatherLight Video Initialization
                $('.popup-video, .lightbox-content').each(function() {
                    $(this).featherlight({
                        iframeMaxWidth: '100%',
                        iframeWidth: $(this).data('frame-width'),
                        iframeHeight: $(this).data('frame-height'),
                        closeOnClick: 'background',
                        closeIcon: "<i class='ion-close'></i>"
                    });
                });

                $('a.feather-single').featherlight({
                    closeIcon: "<i class='ion-close'></i>",
                    closeOnClick: 'background'
                });    

                // FeatherLight Gallery Initialization
                $('a.feather-gallery').each(function() {
                    var gallery_id = $(this).data('gallery');
                    $('[data-gallery="' + gallery_id + '"]').featherlightGallery({
                        previousIcon: "<i class='ion-ios-arrow-back'></i>",
                        /* Code that is used as previous icon */
                        nextIcon: "<i class='ion-ios-arrow-forward'></i>",
                        /* Code that is used as next icon */
                        closeIcon: "<i class='ion-close'></i>",
                        /* Code that is used as close icon */
                        openSpeed: 300,
                        closeSpeed: 300,
                        closeOnClick: 'background'
                    });
                });

                // FeatherLight LightBox Content Only
                var i = 0;
                $('.lightbox-content').each(function() {
                    var lig_bx_ticker = '#lightbox_' + i;
                    var lig_bx_ticker_dock = 'lightbox_' + i;
                    $(this).attr('data-featherlight',lig_bx_ticker);
                    $(this).siblings('.lightbox-content-dock').attr('id',lig_bx_ticker_dock);
                    i += 1;
                });

            


            // Parallax Grid Portfolio Section

            imagesLoaded( document.querySelector('body'), function( instance ) {
      
        
                var $container = $('#parallax-random-grid-container');
                // Packery init for Grid
                $container.packery({
                  itemSelector: '.works-item',
                  "columnWidth": ".gutter-sizer",
                });

                $('.parallax-random-grid .portfolio-filter-nav li a').on('click', function(e) {
                    e.preventDefault();
                    $('.parallax-random-grid .portfolio-filter-nav li a').removeClass('active'); // set active class
                    $(this).addClass('active');
                    var filterTarg = $(this).attr('data-group');
                    $('.works-item').addClass('works-item-fade');
                    $(filterTarg).removeClass('works-item-fade');
                });
            
            });

            // Portfolio Grid Filter Open Close Button Animation Class

            var anchor = document.querySelectorAll('.grid-button');
    
            [].forEach.call(anchor, function(anchor){
              var open = false;
              anchor.onclick = function(event){
                event.preventDefault();
                if(!open){
                  this.classList.add('to-close');
                  open = true;
                }
                else{
                  this.classList.remove('to-close');
                  open = false;
                }
              }
            }); 

            $('.grid-button').on('click', function() {
                var _this = $(this);
                setTimeout(function() {
                    if(_this.hasClass('to-close')) {
                        $('.portfolio-filter-nav').addClass('filter-hide');
                    }
                    else {
                        $('.portfolio-filter-nav').removeClass('filter-hide');
                    }
                },100);
            });

            // Fixed Footer 

            var footer_height = $('.footer-section').outerHeight();
            $('.mastwrap').css('margin-bottom',footer_height);

            // Header Section To be Fixed

            imagesLoaded( document.querySelector('body'), function( instance ) {
                setTimeout(function() {


                    $('.section-fixed-header-wrap').each(function() {

                        var _this = $(this);
                        var section_offset = $(this).offset().top;
                        var section_ht = $(this).height();

                        var fixed_section_releaser = section_offset + section_ht - vH;

                        $(window).scroll(function(){
                            if($(window).scrollTop() >= section_offset && $(window).scrollTop() < fixed_section_releaser) {
                                _this.find('.fixed-header').addClass('fixing-class');
                            } else {
                                _this.find('.fixed-header').removeClass('fixing-class');
                            }  

                            if ($(window).scrollTop() >= fixed_section_releaser) {
                                _this.find('.fixed-header').removeClass('fixing-class');
                                _this.find('.fixed-header').addClass('fixing-releaser');
                            }

                            if ($(window).scrollTop() <= section_offset) {
                                _this.find('.fixed-header').removeClass('fixing-releaser');
                            }
                        }); 

                        // Function for first keeping the letter away from visible viewport

                        _this.find('.letter-text').animate(
                            {'foo':-30},
                            {
                                step: function(foo){
                                    $(this).attr('x', foo+'%');
                                },
                                duration: 2000
                            }
                        ); 

                        // WayPoint function for the sliding function of the header Letter

                        _this.waypoint(function (direction) {
                                    
                            if (direction === 'down') {
                                _this.find('.letter-text').animate(
                                    {'foo':50},
                                    {
                                        step: function(foo){
                                            $(this).attr('x', foo+'%');
                                        },
                                        duration: 2000
                                    }
                                );     

                                _this.find('.header-text').addClass('visible');              
                            } 
                            else {
                               
                            }
                        }, { offset: vH/2 }); 

                        // To vertical align the content if there is no enough content

                        var content_ht = _this.find('.fixed-aside-section .content-section').outerHeight();

                        if(content_ht < vH) {
                            _this.find('.fixed-aside-section').height(vH);
                        } else {
                            _this.find('.main-aligner').removeClass('vertical-align');
                        }


                    });

                    // Function to scroll the page by 1px on window load for the correct working of the fixed header image on load 
            
                    if($(window).scrollTop() > 1) {
                      $(window).scrollTop($(window).scrollTop()+1);  
                    }
                    
                },200);  
            });  

            // Equi Height 

            if(vW > 767) {

                $('.equi-height-container').each(function() {   
                    var maxHeight = -1;
                    $(this).find('.equi-height-each').each(function() {
                        maxHeight = maxHeight > $(this).outerHeight() ? maxHeight : $(this).outerHeight();
                    });
                    $(this).find('.equi-height-each').each(function() {
                        $(this).outerHeight(maxHeight);
                    });    
                });
              
            }

            // Height equals to width

            $('.height-equals-width').each(function() {
                $(this).height($(this).width());
            });

            // Navigation To work From Other Page
              var locationUrl = $(location).attr('href');
              var targetLocation = locationUrl.split('#');
              var targetId = '#'+targetLocation[1];
              setTimeout(function() {
                $('.vertical-menu-section li a[href='+targetId+']').trigger('click');
              },500); 


        });


        
        


           

 

})();        