'use strict';

define(['socketio'], function(io) {
	var socket = io.connect(), events = {};

	socket.emit('likecomment', {

	});

	socket.emit('unlikecomment', {

	});

	socket.on('connect', function(data) {
		events.connect(data);
	});

	socket.on('msg', function(data) {
		console.log(data);
	});

	socket.on('userlogin', function(data) {
		events.userlogin(data);
	});

	socket.on('userlist', function(data) {
		events.userlist(data);
	});

	socket.on('makepost', function(data) {
		events.makepost(data);
	});

	socket.on('makecomment', function(data) {
		events.makecomment(data);
	});

	socket.on('likepost', function(data) {
		events.likepost(data);
	});

	socket.on('likecomment', function(data) {
		events.likecomment(data);
	});

	function userLogin(username) {
		socket.emit('userlogin', { username: username });
	};

	function makePost(post) {
		socket.emit('makepost', post);
	};

	function makeComment(comment) {
		socket.emit('makecomment', comment);
	};

	function likePost(likeData) {
		socket.emit('likepost', likeData);
	};

	function likeComment(likeData) {
		socket.emit('likecomment', likeData);
	}

	return {
		socket: socket,
		userLogin: userLogin,
		makePost: makePost,
		makeComment: makeComment,
		events: events,
		likePost: likePost,
		likeComment: likeComment
	};
});