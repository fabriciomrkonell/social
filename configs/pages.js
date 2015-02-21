'use strict';

exports.home = function(req, res, next) {
	res.render('home.html', {
		user: req.user.name,
		message: req.user.message,
		follow: req.user.follow,
		following: req.user.following
	});
};