'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    path = require('path'),
    db = require('./models'),
    passport = require('passport'),
    flash = require('connect-flash'),
    LocalStrategy = require('passport-local').Strategy,
    user = require('./routes/user'),
    utils = require('./routes/utils'),
    message = require('./routes/message'),
    association = require('./routes/association'),
    route_passport = require('./configs/passport'),
    pages = require('./configs/pages'),
    ejs = require('ejs');

app.set('port', process.env.PORT || 3000)
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'app')))
app.set('views', path.join(__dirname, 'app/views'));
app.engine('html', ejs.renderFile);

app.configure(function() {
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'social' }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

Array.prototype.indexOfOld = Array.prototype.indexOf;
Array.prototype.indexOf = function(e,fn){
  if(!fn){
    return this.indexOfOld(e)
  }else{
    if(typeof fn ==='string'){
      var att = fn;
      fn = function(e){
        return e[att];
      }
    }
    return this.map(fn).indexOfOld(e);
  }
};

app.locals.statusButton = function(userme, user, users) {
  if(user == userme){
    return 0;
  }
  var cod = users.indexOf(user, 'userFollow');
  if(cod == -1){
    return 1;
  }else{
    return 2;
  }
}

function isAuthenticatedPage(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.send({ success: 2, message: 'Falha na autenticação!' });
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  route_passport.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      route_passport.findByEmail(username, password, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user == null) {
          return done(null, null);
        }
        return done(null, user);
      })
    });
  }
));

app.get('/', function(req, res, next){
  if(req.user){
    pages.home(req, res, next);
  }else{
    res.sendfile('app/views/index.html');
  }
});

app.get('/:user', isAuthenticated, function(req, res, next){
  if(req.param('user') == req.user.username){
    pages.me(req, res, next);
  }else{
    pages.user(req, res, next);
  }
});

app.get('/search/:data', isAuthenticated, function(req, res, next){
  utils.search(req, res, next);
});

app.get('/api/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

app.get('/api/error', function(req, res, next){
  res.json({ success: 0 });
});

app.get('/api/me', isAuthenticatedPage, function(req, res, next){
  res.json({ name: req.user.name });
});

app.post('/api/login',
  passport.authenticate('local', {
    failureRedirect: '/api/error',
    failureFlash: true
  }), function(req, res, next) {
    res.json({ success: 1})
});

app.get('/api/message', isAuthenticated, message.all)
app.get('/api/message/me', isAuthenticated, message.all)
app.get('/api/image/:id', isAuthenticatedPage, user.getImage)

app.post('/api/user', user.persist)
app.post('/api/update', isAuthenticatedPage, user.update)
app.post('/api/write', isAuthenticatedPage, message.persist)
app.post('/api/follow/:user', isAuthenticatedPage, association.follow)
app.post('/api/unfollow/:user', isAuthenticatedPage, association.unfollow)

db.sequelize.sync({ force: false }).complete(function(err) {
  if (err) {
    throw err
  } else {
    http.listen(app.get('port'), function(){
    });
  }
})