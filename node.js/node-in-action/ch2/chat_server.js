var socketIo = require('socket.io'),
	io,
	guestNumber = 1,
	nickNames = {},
	namesUsed = [],
	currentRoom = {};

exports.listen = function(server) {
	// 启动Socket.IO服务器，允许 它搭载在已有的HTTP服务器上
	io = socketIo.listen(server);
	io.set('log level', 1);

	io.sockets.on('connection', function(socket) {
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
		joinRoom(socket, 'Labby');

		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		handleRoomJoining(socket);

		socket.on('rooms', function() {
			socket.emit('rooms', io.sockets.manager.rooms);
		});

		handleClientDisconnection(socket, nickNames, namesUsed);
	})

}