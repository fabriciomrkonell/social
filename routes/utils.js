var db = require('../models');

exports.search = function(req, res, next) {
  db.User.findAll({
    where: db.Sequelize.or({
      name: {
        like: '%' + req.param('data') + '%'
      }
    }, db.Sequelize.or({
        username: {
          like: '%' + req.param('data') + '%'
        }
      })
    )
  }).success(function(users) {
    db.Message.findAll({
      include: [ {
        model: db.User,
        attributes: ['id', 'name', 'username']
      }],
      where: {
        message: {
          like: '%' + req.param('data') + '%'
        }
      }
    }).success(function(messages) {
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
        res.render('search.html', {
          userid: req.user.id,
          username: req.user.username,
          users: users,
          messages: messages,
          usersFollowers: usersFollowers,
          usersFollowing: usersFollowing
        });
      });
    });
  });
};