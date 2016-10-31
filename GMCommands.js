function claimGMStatus(){
	MyCharacter.PName = document.getElementById('PlayerName').value;
	document.getElementById('GMScreenButton').style.visibility = 'visible';
	showScreen('GMScreen');
	document.getElementById('clearInitButton').style.visibility = 'visible';
	
	var msg = {
		CName: 'Dungeon Master',
		PName: MyCharacter.PName
	};
	socket.emit('GMSubmitted', msg);
}


function rollGMDice(sides, plus, diceNum){
	var tempName = MyCharacter.CName;
	MyCharacter.CName = document.getElementById('GMRollName').value;
	var skillNameTemp;
	if(sides == 20){
		var adv = GMAdvCheck();
		skillNameTemp = document.getElementById('GMRollType').value;
		rolld20Dice(plus, adv, skillNameTemp)
	
	}else{
		var diceNum =
		console.log('GM D' + sides + ' Rolled');
		skillNameTemp = 'd' + sides;
		rollSidedDice(sides, plus, diceNum, skillNameTemp);	
	}
	
	MyCharacter.CName = tempName;
}

function clearInit(){
	socket.emit('ClearInit');
}