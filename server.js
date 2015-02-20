'use strict';

process.title = 'TTT Server';

var express = require('express'),
		socketio = require('socket.io'),
		app = express(),
		httpServer = require('http').createServer(app),
		io = socketio.listen(httpServer);

app.use(express.static(__dirname + '/app'));
module.exports.socketServer = io;
module.exports.webServer = httpServer;