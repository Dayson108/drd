var express = require('express');
var app = express();
var server = require('http').createServer(app);
app.use('/', express.static(__dirname + '/'));
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 3000);

console.log("listening");
var Comments = [];
var PlayerList = [];
var InitList = [];
var GMData = {
	CName: "",
	PName: "",
	ID: ""
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	io.to(socket.id).emit('SendStartingData', socket.id, GMData, PlayerList, InitList);
	//Recieved by everyone EXCEPT sender 
	//socket.broadcast.emit('', msg);
	
	//Recieved by everyone
	//io.sockets.emit('', msg);
	
	//io.to(socketid).emit('message', 'for your eyes only');
		
	socket.on('disconnect', function(){
		//Removes from the player list*******
		if(socket.id == GMData.ID){
			GMData.CName = "";
			GMData.PName = "";
			GMData.ID = "";
			io.sockets.emit('ClearGM', GMData); 
		}
		else{
			var i = 0;
			var index = -1;
			for (i = 0; i < PlayerList.length; i++){
				if(PlayerList[i].playerID == socket.id){
					index = i;
				}
			}
			if(index >= 0){
				PlayerList.splice(index, 1);
			}
		}
 
		io.sockets.emit('UpdatePlayerList', PlayerList);		
		//***********************************
	});
	
	socket.on('sidedDiceRoll', function(msg){
		socket.broadcast.emit('sidedDiceResult', msg);
	});
	 
	socket.on('20DiceRoll', function(msg){
		socket.broadcast.emit('20DiceResult', msg);
	});
	
	socket.on('GMSubmitted', function(msg){
		GMData.CName = msg.CName;
		GMData.PName = msg.PName;
		GMData.ID = socket.id;
		io.sockets.emit('UpdateGM', GMData, PlayerList);
	});
	
	socket.on('playerSubmitted', function(msg){
		var newPlayer = {
			charName: msg.CName,
			playerName: msg.PName,
			playerID: socket.id
		};
		PlayerList.push(newPlayer);
				io.sockets.emit('UpdatePlayerList', PlayerList);
		
	});
	
	socket.on('Test', function(){
		//console.log("");
		//console.log('Testing...');
	});
	
	socket.on('SendPvtMsg', function(msg){
		io.to(msg.msgToId).emit('PvtMsgRcv', msg);
	});
	
	
	socket.on('Comment', function(iMsg, iPname){
		var input = {
			msg: iMsg,
			PName: iPname
		};
		console.log(input);
		Comments.push(input);
	});
	
	socket.on('GetComments', function(){
		io.to(socket.id).emit('rcvComments', Comments);
		
	});
	socket.on('ClearComments', function(){
		Comments = [];
	});
	
	socket.on('InitRoll', function(input){
		InitList.push(input);
		io.sockets.emit('ServerUpdateInitList', InitList);
	});

	socket.on('ClearInit', function(){
		InitList = [];
		io.sockets.emit('ClearInitRecieved');
	});



});

