function App() {


    function constructor() {


        initEvent();

        registerIntroVideoEndListener(function () {
            $(".gc-intro-video-content .gc-overlay").addClass("gc-show");
            $(".gc-intro-section .gc-inner-content").addClass("gc-show");

            setTimeout(function () {
                $(".gc-tab-contents").addClass("gc-active-tab");
            }, 1000);
        });

        checkSize();

        checkOrientation();

        initIframes();
    }

    function initIframes() {

        var falconContent = '\
            <iframe src="https://www.youtube.com/embed/ygpz35ddZ_4?autoplay=1&mute=1&enablejsapi=1"\
                frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"\
                allowfullscreen>\
            </iframe>\
        ';

        var playoutContent = '\
        <iframe src="https://www.youtube.com/embed/EZSdEjBvuGY?autoplay=1&mute=1&enablejsapi=1"\
            frameborder="0" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture"\
            allowfullscreen>\
        </iframe>\
        ';


        var $falcon = $(".gc-tab-contents .gc-falcon-section .gc-video-content");
        var $playout = $(".gc-tab-contents .gc-playout-section .gc-video-content");

        $falcon.append(falconContent);
        $playout.append(playoutContent);


        // $falcon.find("iframe").on("load", function () {
        //     $falcon.find(".gc-overlay").hide();
        // });
        //
        // $playout.find("iframe").on("load", function () {
        //     $playout.find(".gc-overlay").hide();
        // });
    }

    function checkSize() {

        var width = $(window).width();
        var height = $(window).height();

        if (width < 500 && width < height) {
            var $vid = $(".gc-intro-video-content video");

            $vid.attr("src", "./res/mov/portrait.mp4");

            $vid[0].play();
        }
    }

    function registerIntroVideoEndListener(callback) {

        var $container = $(".gc-intro-video-content");
        var $vid = $container.find("video");

        $vid.on("ended", callback);

        var canPlay = false;
        var suspend = false;

        function onVideoCanPlay(){
            if(canPlay) return;
            canPlay = true;



            setTimeout(function () {

                if ($vid[0].paused) {
                    $vid.remove();
                    var $img = $container.find(".gc-background");

                    var width = $(window).width();
                    var height = $(window).height();

                    if (width < 500 && width < height) {
                        $img.attr("src", "./res/img/portrait.jpg");
                    } else {
                        $img.attr("src", "./res/img/landscape.jpg");
                    }

                    $img.addClass("gc-show");

                    callback();
                }
                $(".gc-loading-content").hide();


            }, 200);

        }

        $vid.on("canplay", onVideoCanPlay);
        $vid.on("canplaythrough", onVideoCanPlay);


        // $vid[0].addEventListener("suspend", function(){
        //
        //     console.log("suspend");
        //
        // },false);
    }

    function initEvent() {

        $(document.body).on("click","[gc-show-page]", function (e) {


            var $tabContents = $(".gc-tab-contents");

            var className = $(this).attr("gc-show-page");

            var currentTabContent = $tabContents.find(".gc-active");

            if(currentTabContent.hasClass(className)) return;

            var selectedTabContent = $tabContents.find("." + className);

            selectedTabContent
                .removeClass("gc-page-out")
                .addClass("gc-page-in gc-active");


            currentTabContent
                .removeClass("gc-page-in gc-active")
                .addClass("gc-page-out");

            selectedTabContent.find("iframe").each(function(){
                this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');

            });

            currentTabContent.find("iframe").each(function(){
                this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

            });

        });


        window.addEventListener("orientationchange",checkOrientation, false);
    }

    function checkOrientation() {

        var $content = $(".gc-orientation-message");

        var orientation = window.screen.orientation ? window.screen.orientation.angle : window.orientation;

        if (typeof orientation != "undefined") {
            if (orientation !== 0) { // is not in portrait mode
                $content.addClass("gc-show");
            } else {
                $content.removeClass("gc-show");
            }
        }
    }


    constructor();
}