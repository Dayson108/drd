var socket = io.connect();

socket.on('20DiceResult', function(msg){
	updateResultList(msg);
});

socket.on('sidedDiceResult', function(msg){
	updateResultList(msg);
});


socket.on('UpdateGM', function(GMInput){
	GMData.ID = GMInput.ID;
	GMData.PName = GMInput.PName;
	GMData.CName = GMInput.CName;
	updatePlayerList();
	updatePrivateMsgList();
});

socket.on('UpdatePlayerList', function(ServerPlayerList){
	LocalPlayerList = ServerPlayerList;
	updatePlayerList();
	updatePrivateMsgList();
});

socket.on('SendStartingData', function(msg, GMDataRecieved, ServerPlayerList){
	LocalPlayerList = ServerPlayerList;
	MyCharacter.playerID = msg;
	GMData = GMDataRecieved;
});

socket.on('ClearGM', function(GMDataRecieved){
	GMData = GMDataRecieved;
});

socket.on('PvtMsgRcv', function(msg){
		updateResultList(msg);
});

socket.on('UpdateInitList', function(msg){
		updateInitList(msg);
});


socket.on('ClearInitRecieved', function(){
	document.getElementById('initList').innerHTML = "";
	LocalInitList = [];
	document.getElementById("initbutton").disabled = false;
});
