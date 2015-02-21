'use strict';

exports.home = function(req, res, next) {
	res.render('home.html', {
		user: req.user.name,
		username: req.user.username,
		message: req.user.message,
		follow: req.user.follow,
		following: req.user.following
	});
};

exports.user = function(req, res, next) {
	res.render('home.html', {
		user: req.user.name,
		username: req.user.username,
		message: req.user.message,
		follow: req.user.follow,
		following: req.user.following
	});
};

exports.me = function(req, res, next) {
	res.render('me.html', {
		user: req.user.name,
		username: req.user.username,
		message: req.user.message,
		follow: req.user.follow,
		following: req.user.following
	});
};