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
    route_passport = require('./routes/passport'),
    socketio = require('socket.io'),
    io = socketio.listen(http),
    client = null;

app.set('port', process.env.PORT || 3000)
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'app')))

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

if ('development' === app.get('env')) {
  app.use(errorHandler())
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
    res.sendfile('app/views/home.html');
  }else{
    res.sendfile('app/views/index.html');
  }
});

app.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

app.get('/error', function(req, res, next){
  res.json({ success: 0 });
});

app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/error',
    failureFlash: true
  }), function(req, res, next) {
    res.json({ success: 1})
});

app.post('/user', user.persist)

db.sequelize.sync({ force: false }).complete(function(err) {
  if (err) {
    throw err
  } else {
    http.listen(app.get('port'), function(){

      io.on('connection', function (socket) {
        console.log(socket);
      });

    });
  }
})