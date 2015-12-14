'use strict';

// Requires
var $ = require( 'jquery' );
var SmoothScroll = require( './components/smooth-scroll' );

var windowHeight = $(window).height();

// set intro to be window height and have full size bg image
$('.section--intro').height(windowHeight);
$(".section--intro").backstretch("/assets/img/header.jpg");


// add bg colour to header if user scrolls
$(document).scroll(function() {
  if ($(document).scrollTop() === 0) {
  	$('.header').removeClass('not-top');
  } else {
  	$('.header').addClass('not-top');
  }
});

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
    isOriginLeft: false,
	cellsByRow: {
      columnWidth: 260,
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



