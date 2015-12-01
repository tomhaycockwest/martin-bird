'use strict';

// Requires
var $ = require( 'jquery' );

var windowHeight = $(window).height();

// set intro to be window height and have full size bg image
$('.intro').height(windowHeight);
$(".intro").backstretch("/assets/img/header.jpg");


