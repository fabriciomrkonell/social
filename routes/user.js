var db = require('../models'),
    message = require('../routes/message');

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

    req.body.avatar = new Buffer('iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAUhSURBVHic7Z1ta+owFIDPbkbHioFAoGKhUBD8IOz//4n9gckGQiGyQqAsQ1mg7H4Ykc1dd532nJNqn09jiGnzmNO8nCZX9/f37xAxaZrCaDSCNE0hSZLt/6WUXz7nnNv+7b0H5xxsNhtYr9dk13oM19wXsIsQApRSoLX+Vsk/sftZrfX2b+ccWGuhaRpo27aza+2CaAQkSQJ5noNSCoQQnX63lBKklNC2LTRNA8YY8N53WsaxsAsQQkCe55BlGUlZWmvQWkNd12CMYW8RrAKUUlAUxZfYTkWWZaCUgqqqoGka8vIDf7gK1lrDdDplqfxAkiQwnU6/PC+oYRGgtYayLDmK/idlWbJJIBeglIqq8gNlWYJSirxcUgFJkkRZ+YGyLMlDIqmAsiw772J2iRCC/AdCJuC3AysupJSkoYhMQJ7nVEWdTFEUZGWRCFBKsXY3f0uSJGStgEQAZz/7WM5GQJhc6xtaa5IOA7qAPjx490Fx7YOAHzgLAaPRCLsING5vb9HLQBeQpil2EWj0vgX0qeu5D+wHMaqAm5sbzK8nAbsFs60HDHyAKoDiIYYNdhhFFXB9zb7kfDLYYXQIQcwMApgZBDCDKuDt7Q3z60nATm1EFRBL9tkpYCduDSGIGVQB3Gl/XYAdRlEFxJ4afgjYYXQIQcygChBC9DoMtW3b79nQ2WwWdSLW/xBCwGw2Qy0DTYDWuteLMYE0TVGzOtAEULxwQQXmvaAIEEKcxa8/gHkvKALOqfIDWOvDQzeUmUEAMygC+tz33wfWPaEIOIcpiF2w7gktBH3eOqDvYN4LmgDOd2+7xlqL9t1oAqy1Z/EsCNsbYIEmoG1bMMZgfT0Z2NsZoHZD67pGbb7YWGuhrmvUMtAzp5bLJXjvQWvdm2Rd7z1Ya0laMEnqmjEGjDEwn8+jT1d0zsFisSArj3Qk3Ieu6WazIS1vELAD9TUOAnY4awFt20YtwTlHPnYhnw2NuVvKcW3kAmLcuRDgo3VehADsof2xcF0Ty4JMjFMUXNfEIiCMNGPBWsuWyc22JBlLK+CeNGQT4L2H1WrFVfyWuq5Z32NgXZTn3kLYe8/eEtmzIpbL5UWWHWAX4JxDn3P/F6vVKopRObsAAICqqkhnITebDXvoCUQhAADg8fGRZITcti08PDygl3Mo0Qjw3qMvhLRtC4vFIqqpkGgEAHwkP2E+GKuqii5pLCoBALgzkjGNvgPRCcBcuI8xKSA6AZjbw8S4g1d0AoYWwAzmToUx7mE6CGAmKgHY2XNJkkS3kXg0ArTWJPv2F0URlYQrrrMkw0kV4ZxIDtbrNby+vkLTNGwTc6TbGqZpuj1ALYYtDNI03V5TSBao65p0tIwuIJxGMR6Po+wGBj4fc+i9h+fnZ5KXTNBCkJRye0N9xloL1lq0ENV5CwiVHmOX7xjC/YQjcbueT+pMgNYa8jyPOsycQjgSN89zMMZ0JuLkEHTuFb+PsKB/qoijBVxqxe/ivT/pSNxfhyApJUwmk7OJ8acSjsR1zh210H+wACFEdKPImAjPCGstVFV1cPf1IAFZlkGe51EMnmJHaw1KKTDGHJRu86OAcPzsEG5+R4gWSqnta7r72CtgMpnAeDwefvUnIKWE+Xz+Y2v4JkAIAdPpdPjVd8Tn1vD09PTt2fBlOlpKCXd3d0PlI7CvbrcCsizr/UarsRM2gv28DeYfgI+jxikPMb50iqLYHp1+9fLy8j6EHB6cc3D1/v7OsiI28EE0a8KXyl/sQgD//xU3tgAAAABJRU5ErkJggg==');

    db.User.create(req.body).success(function(entity) {
      message.persistData(req.body.name, entity, true);
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

exports.getImage = function(req, res, next) {
  db.User.find({
    where: {
      id: req.param('id')
    },
    attributes: ['avatar']
  }).success(function(entity) {
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(entity.avatar, 'base64');
  });
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