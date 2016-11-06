
function submitComment(){

	if(document.getElementById('inputComment').value != ""){
		console.log('woof');
		socket.emit('Comment', document.getElementById("inputComment").value, MyCharacter.PName);
		document.getElementById('inputComment').value = "";
		
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

