'use strict';

requirejs.config({
	basePath: './',
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'socketio': '/socket.io/socket.io',
		'mustache': '../bower_components/mustache/mustache'
	},
	shim: {
	 mustache: {
	 	exports: 'Mustache'
	 }
	}
});

require(['view'], function(view) {});