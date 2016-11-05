
function submitComment(){
	if(document.getElementById('rcvComments').innerHTML != ""){
		socket.emit('Comment', document.getElementById("inputComment").value, MyCharacter.PName);
		document.getElementById('rcvComments').innerHTML = "";
	}

}

function getComments(){
	socket.emit('GetComments');
}

function clearComments(){
	socket.emit('ClearComments');

}		
socket.on('rcvComments', function(msg){
	document.getElementById('rcvComments').innerHTML = JSON.stringify(msg);
});		

