'use strict';

// Requires
var $ = require( 'jquery' );
var SmoothScroll = require( './components/smooth-scroll' );
var _ = require( 'lodash' );

var windowHeight = $(window).height();

// set intro to be window height and have full size bg image
$('.section--intro').height(windowHeight);
$(".section--intro").backstretch("/assets/img/header.jpg");


// add bg colour to header if user scrolls
$(document).scroll(function() {
  if ($(document).scrollTop() === 0) {
  	$('.header, .nav, .logo, .mobile-nav-icon-container').removeClass('not-top');
  } else {
  	$('.header, .nav, .logo, .mobile-nav-icon-container').addClass('not-top');
  }
});

// toggle mobile nav 
$( '.mobile-nav-icon-container, .mobile-nav-item' ).click( function( e ) {
	e.preventDefault(  );
	$( '.mobile-nav-icon-container, .mobile-nav-container' ).toggleClass( 'open' );
} );


/**************************
TRADES
**************************/

$('.trade').on('click', function(e) {
	e.preventDefault();
 	var id = $(this).attr( 'id' );
 	var elem = '.trade-description--' + id;
 	$(elem).addClass('show').siblings().removeClass('show');
});


/*************************
GALLERY
*************************/
var gallery = $('.gallery');

gallery.isotope({ 
	layoutMode: 'cellsByRow',	
	itemSelector: '.gallery-item',
	cellsByRow: {
      columnWidth: 250,
      rowHeight: 250,
      percentPosition: true
    },
    getSortData: {
		name: '.name',
		symbol: '.symbol',
		number: '.number parseInt',
		category: '[data-category]',
		weight: function( itemElem ) {
		var weight = $( itemElem ).find('.weight').text();
		return parseFloat( weight.replace( /[\(\)]/g, '') );
		}
	}
});

// bind filter button click
$('.gallery-nav-item').click( function(e) {
	e.preventDefault();
	var filterValue = $( this ).attr('data-filter');
	gallery.isotope({ filter: filterValue });
});

// fancybox
$('.gallery-item').fancybox({
	beforeShow : function() {
	    var alt = this.element.find('img').attr('alt');
	    this.inner.find('img').attr('alt', alt);
	    this.title = alt;
	},
    openEffect  : 'fade',
    padding: 0,
    helpers: {
		overlay: {
        	locked: false,
        	closeClick : true,
       	},
       	title: {
			type: 'outside'
       }
    }
});

/***********************************
TESTIMOMIALS
***********************************/

// owl carousel
	$('.owl-carousel').owlCarousel({
	    loop:true,
	    margin:10,
	    items: 1,
	    autoplay: true
	})




