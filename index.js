'use strict';

var Server = require('./server'),
		socketServer = Server.socketServer,
		webServer = Server.webServer,
		UserHandling = require('./userhandling'),
		userHandling = new UserHandling(socketServer);
		webServer.listen(9000);