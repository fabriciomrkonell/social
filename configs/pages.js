'use strict';

var db = require('../models');

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
	db.User.find({
		where: {
			username: req.param('user')
		}
	}).success(function(entity){
		if(entity){
			db.Association.findAll({
        attributes: ['id', 'UserId', 'userFollow'],
        include: [ {
          model: db.User,
          attributes: ['id', 'name', 'username']
        }],
        where: db.Sequelize.or({
          UserId: req.user.id
        }, db.Sequelize.or({
            userFollow: req.user.id
          })
        )
      }).success(function(entities){
        var usersFollowing = [];
        var usersFollowers = [];
        for(var i = 0; i < entities.length; i++){
          if(entities[i].UserId == req.user.id){
            usersFollowing.push(entities[i]);
          }else{
            usersFollowers.push(entities[i]);
          }
        }
        res.render('user.html', {
        	userid: req.user.id,
					id: entity.id,
					user: entity.name,
					username: entity.username,
					message: entity.message,
					location: entity.location,
					website: entity.website,
					biography: entity.biography,
					created: entity.createdAt,
					followers: entity.followers,
					following: entity.following,
					usersFollowers: usersFollowers,
          usersFollowing: usersFollowing
				});
      });
		}else{
			res.render('404.html', {
				username: req.user.username
			});
		}
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