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

function persistData(data, user, status){
  db.Data.create({ text: data, UserId: user.id, isUser: status});
};

exports.all = function(req, res, next) {
  db.Message.findAll({
    include: [ {
      model: db.User,
      attributes: ['id', 'name', 'username', 'avatar']
    }],
    order: 'CreatedAt DESC',
    limit: 100
  }).success(function(entity){
    res.json({ success: 1, data: entity })
  });
};

exports.refresh = function(req, res, next) {
  refresh(req, res, next);
};

exports.persistData = function(data, user, status) {
  persistData(data, user, status);
};

exports.persist = function(req, res, next) {
  if(isValid(req.body, res)){
    req.body.UserId = req.user.id;
    db.Message.create(req.body).success(function(entity) {
      refresh(req.user.id, 'message');
      persistData(req.body.message, req.user, false);
      var _return = {
        id: entity.id,
        message: entity.message,
        createdAt: entity.createdAt,
        User: {
          id: req.user.id,
          name: req.user.name,
          username: req.user.username
        }
      };
      res.json({ success: 1, data: _return })
    }).error(function(error){
      res.json({ success: 2 })
    });
  }
};