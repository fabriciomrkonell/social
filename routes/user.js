var db = require('../models');

function isValid(user, res){
  if(user.name == ''){
    res.json({ success: 0, message: "Favor preencher um nome válido!"});
    return false;
  }
  if(user.email == ''){
    res.json({ success: 0, message: "Favor preencher um email válido!"});
    return false;
  }
  if(!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/.exec(user.email)){
    res.json({ success: 0, message: "Favor preencher um email válido!"});
    return false;
  }
  if(user.password == ''){
    res.json({ success: 0, message: "Favor preencher uma senha válida!"});
    return false;
  }
  return true;
};

exports.persist = function(req, res, next) {
  if(isValid(req.body, res)){
    db.User.create(req.body).success(function(entity) {
      res.json({ success: 1, user: req.body })
    }).error(function(error){
      if(error.name == 'SequelizeUniqueConstraintError'){
        res.json({ success: 0, message: "Já existe um usuário com esse email!"})
      }else{
        res.json({ success: 0, message: "Não foi possível realizar esta operação!"})
      }
    });
  }
};