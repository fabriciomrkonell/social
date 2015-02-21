var db = require('../models');

function isValid(user, res){
  if(user.name == ''){
    res.json({ success: 0, field: "name", message: "Nome inválido!" });
    return false;
  }
  if(user.name.length > 20){
    res.json({ success: 0, field: "name", message: "O nome deve ter entre 5 e 20 caracteres!" });
    return false;
  }
  if(user.username == ''){
    res.json({ success: 0, field: "username", message: "Usuário inválido!"});
    return false;
  }
  if(user.username.length > 25){
    res.json({ success: 0, field: "username", message: "O usuário deve ter entre 5 e 25 caracteres!" });
    return false;
  }
  if(user.email == ''){
    res.json({ success: 0, field: "email", message: "Email inválido!"});
    return false;
  }
  if(!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/.exec(user.email)){
    res.json({ success: 0, field: "email", message: "Email inválido!" });
    return false;
  }
  if(user.password == ''){
    res.json({ success: 0, field: "password", message: "Senha inválida!"});
    return false;
  }
  return true;
};

exports.persist = function(req, res, next) {
  if(isValid(req.body, res)){
    req.body.message = 0;
    req.body.followers = 0;
    req.body.following = 0;
    req.body.status = true;
    req.body.location = '';
    req.body.biography = '';
    req.body.website = '';
    db.User.create(req.body).success(function(entity) {
      res.json({ success: 1, user: req.body })
    }).error(function(error){
      if(error.name == 'SequelizeUniqueConstraintError'){
        if(error.errors[0].path == "username"){
          res.json({ success: 0, field: "username", message: "Já existe um cadastro com esse usuário!"});
        }else{
          res.json({ success: 0, field: "email", message: "Já existe um cadastro com esse email!"});
        }
      }else{
        res.json({ success: 2 })
      }
    });
  }
};

exports.update = function(req, res, next) {
  db.User.find({
    where: {
      id: req.user.id
    }
  }).success(function(entity) {
    entity.updateAttributes(req.body);
  });
};