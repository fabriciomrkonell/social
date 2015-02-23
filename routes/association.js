var db = require('../models');

function refresh(userFollowing, userFollowers){
  db.Association.count({
    where: {
      UserId: userFollowing
    }
  }).success(function(count){
    db.User.find({
      where: {
        id: userFollowing
      }
    }).success(function(entityFollowing){
      entityFollowing.updateAttributes({ following: count });
    });
  });
  db.Association.count({
    where: {
      userFollow: userFollowers
    }
  }).success(function(count){
    db.User.find({
      where: {
        id: userFollowers
      }
    }).success(function(entityFollowers){
      entityFollowers.updateAttributes({ followers: count });
    });
  });
};

exports.follow = function(req, res, next) {
  var persist = {
    UserId: req.user.id,
    userFollow: parseInt(req.param('user'))
  };
  db.Association.find({
    where: persist
  }).success(function(entityAssociation){
    if(entityAssociation){
      res.json({ success: 1 });
    }else{
      db.Association.create(persist).success(function(entity) {
        refresh(req.user.id, parseInt(req.param('user')));
        res.json({ success: 1 });
      }).error(function(error){
        res.json({ success: 2 });
      });
    }
  });
};

exports.unfollow = function(req, res, next) {
  var persist = {
    UserId: req.user.id,
    userFollow: parseInt(req.param('user'))
  };
  db.Association.find({
    where: persist
  }).success(function(entityAssociation){
    if(entityAssociation){
      entityAssociation.destroy().success(function(entity) {
        refresh(req.user.id, parseInt(req.param('user')));
        res.json({ success: 1 });
      }).error(function(error){
        res.json({ success: 2 });
      });
    }else{
      res.json({ success: 1 });
    }
  });
};