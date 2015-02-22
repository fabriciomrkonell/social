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
      res.render('search.html', {
        username: req.user.username,
        users: users,
        messages: messages
      });
    });
  });
};