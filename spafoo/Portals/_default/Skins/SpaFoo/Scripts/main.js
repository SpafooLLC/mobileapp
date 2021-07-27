
/*
 * jQuery.appear
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
*/
(function($){$.fn.appear=function(f,o){var s=$.extend({one:true},o);return this.each(function(){var t=$(this);t.appeared=false;if(!f){t.trigger('appear',s.data);return;}var w=$(window);var c=function(){if(!t.is(':visible')){t.appeared=false;return;}var a=w.scrollLeft();var b=w.scrollTop();var o=t.offset();var x=o.left;var y=o.top;if(y+t.height()>=b&&y<=b+w.height()&&x+t.width()>=a&&x<=a+w.width()){if(!t.appeared)t.trigger('appear',s.data);}else{t.appeared=false;}};var m=function(){t.appeared=true;if(s.one){w.unbind('scroll',c);var i=$.inArray(c,$.fn.appear.checks);if(i>=0)$.fn.appear.checks.splice(i,1);}f.apply(this,arguments);};if(s.one)t.one('appear',s.data,m);else t.bind('appear',s.data,m);w.scroll(c);$.fn.appear.checks.push(c);(c)();});};$.extend($.fn.appear,{checks:[],timeout:null,checkAll:function(){var l=$.fn.appear.checks.length;if(l>0)while(l--)($.fn.appear.checks[l])();},run:function(){if($.fn.appear.timeout)clearTimeout($.fn.appear.timeout);$.fn.appear.timeout=setTimeout($.fn.appear.checkAll,20);}});$.each(['append','prepend','after','before','attr','removeAttr','addClass','removeClass','toggleClass','remove','css','show','hide'],function(i,n){var u=$.fn[n];if(u){$.fn[n]=function(){var r=u.apply(this,arguments);$.fn.appear.run();return r;}}});})(jQuery);

jQuery(window).load(function() {
	jQuery('.portfolio-one .portfolio-wrapper').isotope({
		// options
		itemSelector: '.portfolio-item',
		layoutMode: 'straightDown'
	});

	jQuery('.portfolio-two .portfolio-wrapper, .portfolio-three .portfolio-wrapper, .portfolio-four .portfolio-wrapper').isotope({
		// options
		itemSelector: '.portfolio-item',
		layoutMode: 'fitRows'
	});
});
jQuery(document).ready(function($) {
	// Tabs
	//When page loads...
	$('.tabs-wrapper').each(function() {
		$(this).find(".tab_content").hide(); //Hide all content
		$(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
		$(this).find(".tab_content:first").show(); //Show first tab content
	});
	
	//On Click Event
	$("ul.tabs li").click(function(e) {
		$(this).parents('.tabs-wrapper').find("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(this).parents('.tabs-wrapper').find(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(this).parents('.tabs-wrapper').find(activeTab).fadeIn(); //Fade in the active ID content
		
		e.preventDefault();
	});
	
	$("ul.tabs li a").click(function(e) {
		e.preventDefault();
	})

	$('#socialico .social-networks li, .share-box li, .social-icon, .social li').mouseenter(function(){
		$(this).find('.popup').fadeIn();
	});

	$('#socialico .social-networks li, .share-box li, .social-icon, .social li').mouseleave(function(){
		$(this).find('.popup').fadeOut();
	});

	$('#carousel').elastislide({
	    imageW: 180,
		margin: 44,
		border: 0,
		easing: 'easeInBack'
	});

	$("a[rel^='prettyPhoto']").prettyPhoto();

	var mediaQuery = 'desk';

	if (Modernizr.mq('only screen and (max-width: 600px)') || Modernizr.mq('only screen and (max-height: 520px)')) {

		mediaQuery = 'mobile';
		$("a[rel^='prettyPhoto']").unbind('click');

	} 

	// Disables prettyPhoto if screen small
	$(window).resize(function() {
		if ((Modernizr.mq('only screen and (max-width: 600px)') || Modernizr.mq('only screen and (max-height: 520px)')) && mediaQuery == 'desk') {
			$("a[rel^='prettyPhoto']").unbind('click.prettyphoto');
			mediaQuery = 'mobile';
		} else if (!Modernizr.mq('only screen and (max-width: 600px)') && !Modernizr.mq('only screen and (max-height: 520px)') && mediaQuery == 'mobile') {
			$("a[rel^='prettyPhoto']").prettyPhoto();
			mediaQuery = 'desk';
		}
	});

	$('.portfolio-tabs a').click(function(e){
		e.preventDefault();

		var selector = $(this).attr('data-filter');
		$('.portfolio-wrapper').isotope({ filter: selector });

		$(this).parents('ul').find('li').removeClass('active');
		$(this).parent().addClass('active');
	});

	$('.faq-tabs a').click(function(e){
		e.preventDefault();

		var selector = $(this).attr('data-filter');

		$('.faqs .portfolio-wrapper .faq-item').fadeOut();
		$('.faqs .portfolio-wrapper .faq-item'+selector).fadeIn();

		$(this).parents('ul').find('li').removeClass('active');
		$(this).parent().addClass('active');
	});

	$('.toggle-content').each(function() {
		if(!$(this).hasClass('default-open')){
			$(this).hide();
		}
	});

	$("h5.toggle").click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}

		return false;
	});

	$("h5.toggle").click(function(){
		$(this).next(".toggle-content").slideToggle();
	});

	$('.columns').each(function() {
		var cols = $(this).find('.col').length;
		$(this).addClass('columns-'+cols);
	});

	function isScrolledIntoView(elem)
	{
	    var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();

	    var elemTop = $(elem).offset().top;
	    var elemBottom = elemTop + $(elem).height();

	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	$('#progress-bars').appear(function() {
		$('.progress-bar').each(function() {
			var percentage = $(this).find('.progress-bar-content').data('percentage');
			$(this).find('.progress-bar-content').css('width', '0%');
			$(this).find('.progress-bar-content').animate({
				width: percentage+'%'
			}, '5000');
		});
	});

	$('.toggle-alert').click(function(e) {
		e.preventDefault();

		$(this).parent().slideUp();
	});

	// Create the dropdown base
	$('<select />').appendTo('.nav-holder');

	// Create default option 'Go to...'
	$('<option />', {
		'selected': 'selected',
		'value'   : '',
		'text'    : 'Go to...'
	}).appendTo('.nav-holder select');

	// Populate dropdown with menu items
	$('.nav-holder a').each(function() {
		var el = $(this);

		if($(el).parents('.sub-menu .sub-menu').length >= 1) {
			$('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : '-- ' + el.text()
			}).appendTo('.nav-holder select');
		}
		else if($(el).parents('.sub-menu').length >= 1) {
			$('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : '- ' + el.text()
			}).appendTo('.nav-holder select');
		}
		else {
			$('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : el.text()
			}).appendTo('.nav-holder select');
		}
	});

	$('.nav-holder select').change(function() {
		window.location = $(this).find('option:selected').val();
	});

	$('.post-content .tabset,.project-content .tabset').each(function() {
		var menuWidth = $(this).width();
	    var menuItems = $(this).find('li').size();
	    var itemWidth = (menuWidth/menuItems);

	    $(this).css({'width': menuWidth +'px'});
	    $(this).find('li').css({'width': itemWidth +'px'});
	});

	$('#sidebar .tabset').each(function() {
		var menuWidth = $(this).width();
	    var menuItems = $(this).find('li').size();
	    var itemWidth = (menuWidth/menuItems)-2;

	    $(this).css({'width': menuWidth +'px'});
	    $(this).find('li').css({'width': itemWidth +'px'});
	});
});