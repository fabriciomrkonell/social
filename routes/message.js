var db = require('../models');

function isValid(message){
  if(message.message == ''){
    res.json({ success: 2 });
    return false;
  }
  return true;
};

function refresh(user, type){
  db.User.find({
    where: {
      id: user
    }
  }).success(function(entity){
    if(type == 'message'){
      entity.updateAttributes({ message: entity.message + 1 });
    }
  });
};

exports.all = function(req, res, next) {
  db.Message.findAll().success(function(entity){
    res.json({ success: 1, data: entity })
  });
};

exports.refresh = function(req, res, next) {
  refresh(req, res, next);
};

exports.persist = function(req, res, next) {
  if(isValid(req.body, res)){
    req.body.UserId = req.user.id;
    db.Message.create(req.body).success(function(entity) {
      refresh(req.user.id, 'message');
      res.json({ success: 1, message: entity })
    }).error(function(error){
      res.json({ success: 2 })
    });
  }
};