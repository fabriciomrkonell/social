'use strict';

exports.home = function(req, res, next) {
	res.render('home.html', {
		id: req.user.id,
		user: req.user.name,
		username: req.user.username,
		message: req.user.message,
		followers: req.user.followers,
		following: req.user.following
	});
};

exports.user = function(req, res, next) {
	res.render('home.html', {
		id: req.user.id,
		user: req.user.name,
		username: req.user.username,
		message: req.user.message,
		followers: req.user.followers,
		following: req.user.following
	});
};

exports.me = function(req, res, next) {
	res.render('me.html', {
		id: req.user.id,
		user: req.user.name,
		username: req.user.username,
		message: req.user.message,
		location: req.user.location,
		website: req.user.website,
		biography: req.user.biography,
		created: req.user.createdAt,
		followers: req.user.followers,
		following: req.user.following
	});
};