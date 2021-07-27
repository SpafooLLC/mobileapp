$(document).foundation()

$(window).load(function() {
	// executes when complete page is fully loaded, including all frames, objects and images
	$("body").mCustomScrollbar();
});


$(document).ready(function() {
// Search Panel



    // Scroll button on home slide
    $(".scrollDown").click(function(){
        $('html,body').animate({scrollTop:$('.movedown').position().top}, 'slow');
        // $('html,body').stop().animate({scrollTop: $('.our-company').position().top - 0}, 'slow');
        // alert('111');
    }); // Scroller End

    $(window).resize(function() {
	    $(".circle-icon").each(function(){
	       $(this).height($(this).parent().width());
	    });
    });
    $(window).trigger('resize');
    
    var slider = $('.header-revo-slider .tp-banner');
    var cont = $('.header-revo-slider .tp-banner-container');
    var headerHeight = $('#main_header').innerHeight() + 2;
    var bannerHeight = $(window.top).height() - headerHeight;
    // var height = (App.getViewPort().width < App.getBreakpoint('md') ? 400 : 620);
	console.log(bannerHeight);
    var api = slider.show().revolution({
        sliderType:"standard",
        sliderLayout:"fullwidth",
        delay: 15000,    
        autoHeight: 'off',
        //gridheight: bannerHeight,
        minHeight: bannerHeight,

        navigation: {
            keyboardNavigation:"off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation:"off",
            onHoverStop:"on",
            bullets:{
				style:"round",
				enable:true,
				container:"slider",
				rtl:false,
				hide_onmobile:true,
				hide_onleave:true,
				hide_delay:2000,
				hide_delay_mobile:1200,
				hide_under:0,
				hide_over:9999,
				tmp:'<span class="tp-dot"></span>', 
				direction:"horizontal",
				space:10,       
				h_align:"center",
				v_align:"bottom",
				h_offset:0,
				v_offset:0
			},    
            touch:{
                touchenabled:"on",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: false
            },     
        },
        viewPort: {
            enable:true,
            outof:"pause",
            visible_area:"80%"
        },

        shadow: 0,

        spinner: "spinner2",

        disableProgressBar:"on",

        fullScreenOffsetContainer: '.tp-banner-container',

        hideThumbsOnMobile: "on",
        hideNavDelayOnMobile: 1500,
        hideBulletsOnMobile: "on",
        hideArrowsOnMobile: "on",
        hideThumbsUnderResolution: 0,
    
    });

    
	

   
   


});