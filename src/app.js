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
    }

    function checkSize() {

        var width = $(window).width();
        var height = $(window).height();


        if (width < 500 &&width < height) {
            var $vid = $(".gc-intro-video-content video");

            $vid.attr("src", "./res/mov/portrait.mp4");
        }
    }

    function registerIntroVideoEndListener(callback) {
        var $vid = $(".gc-intro-video-content video");
        $vid.on("ended", callback);
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

        });
    }


    constructor();
}