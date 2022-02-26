function getRandomInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let actualTrue=0;
let empty=0;
let wrong=0;

const board = [['','','','','','','','',''],
	      ['','','','','','','','',''],
	      ['','','','','','','','',''],
	      ['','','','','','','','',''],
  	      ['','','','','','','','',''],
	      ['','','','','','','','',''],
	      ['','','','','','','','',''],
	      ['','','','','','','','',''],
	      ['','','','','','','','','']];

function getPossibleValue(i,j){
	for(let value=1;value<=9;value+=1){
		if(isPossibleRow(i,j,value) && isPossibleCol(i,j,value) && isPossibleBlock(i,j,value)){
			board[i][j] = value;
			return value;
		}
	}
}

function isPossibleRow(i,j,value){
	for(let loop=0;loop<9;loop+=1){
		if(board[i][loop] === value){
			return false;
		}
	}
	return true;
}

function isPossibleCol(i,j,value){
	for(let loop=0;loop<9;loop+=1){
		if(board[loop][j] === value){
			return false;
		}
	}
	return true;
}

function isPossibleBlock(i,j,value){
	let row = Math.floor(i/3)*3;
	let col = Math.floor(j/3)*3;
	for(let loop=0;loop<3;loop+=1){
		if(board[row+loop][col] === value || board[row+loop][col+1] === value || board[row+loop][col+2] === value){
			return false;
		}
	}
	return true;
}


function onInputHandler(obj){
	const number = obj.id;
	const i = (number%9 === 0) ? Math.floor(number/9)-1 : Math.floor(number/9);
	const j = (number%9 === 0) ? 8 : (number%9) - 1;
	const value = parseInt(obj.value,10);
	//console.log(value);
	if(!isNaN(value)){
		if((value <= 0) || (value >= 10) || !isPossibleRow(i,j,value) || !isPossibleCol(i,j,value) || !isPossibleBlock(i,j,value)){
			board[i][j] = value;
			obj.style.backgroundColor = "red";
		}
		else{
			board[i][j] = value;
			obj.style.backgroundColor = "white";
		}
	}
	else{
		board[i][j] = '';
		obj.style.backgroundColor = "white";
	}
	//console.log(board);
	//console.log(actualTrue,wrong,empty);
}


function onNewGameClickHandler(){
	if(window.confirm("If you start a New Game current progress will be lost.")){
		window.location.href = "sudoku.html";
	}
}

function isInRow(i,j){
	for(let loop=0;loop<9;loop+=1){
		if(loop !== j && board[i][loop] === board[i][j]){
			return true;
		}
	}
	return false;
}

function isInCol(i,j){
	for(let loop=0;loop<9;loop+=1){
		if(loop !== i && board[loop][j] === board[i][j]){
			return true;
		}
	}
	return false;
}

function isInBlock(i,j){
	let row = Math.floor(i/3)*3;
	let col = Math.floor(j/3)*3;
	for(let loop=0;loop<3;loop+=1){
		if((row+loop !== i && col !== j && board[row+loop][col] === board[i][j]) || (row+loop !== i && col+1 !== j && board[row+loop][col+1] === board[i][j]) || (row+loop !== i && col+2 !== j && board[row+loop][col+2] === board[i][j])){
			return true;
		}
	}
	return false;
}

function checkSudokuHandler(){
	let done=true;
	for(let row=0;row<9;row+=1){
		for(let col=0;col<9;col+=1){
			if(board[row][col] === '' || board[row][col] <= 0 || board[row][col] >= 10 || isInRow(row,col) || isInCol(row,col) || isInBlock(row,col)){
				done = false;
				break;
			}
		}
	}
	if(done){
		alert("Congratulations, You Won the Game!");
		window.location.href = "sudoku.html";
	}
	else{
		alert("Sorry their is some error please check! \nHint: Cell with Red background Color indicated value placed violates Sudoku rule! Try Solving IT!");
	}
}

const min=1;
const max=9;

let row=1;
for(let upper=0;upper<3;upper+=1){
	for(let loop=0;loop<3;loop+=1){
		const value1 = getRandomInclusive(min,max);
		const value2 = getRandomInclusive(min,max);
		const value3 = getRandomInclusive(min,max);
		const value4 = getRandomInclusive(min,max);
		const values = [row,row+1,row+2,row+9,row+10,row+11,row+18,row+19,row+20];
		//console.log(values);
		let ele = document.getElementById(values[value1 - 1]);
		if(ele.value === ''){
			const i = (values[value1 - 1]%9 === 0) ? Math.floor(values[value1-1]/9)-1 : Math.floor(values[value1-1]/9);
			const j = (values[value1 - 1]%9 === 0) ? 8 : (values[value1-1]%9) - 1;
			const ans = getPossibleValue(i,j);
			if(ans !== undefined){
				actualTrue += 1;
				ele.value = ans;
				ele.disabled = true;
			}
		}
		ele = document.getElementById(values[value2 - 1]);
		if(ele.value === ''){
			const i = (values[value2 - 1]%9 === 0) ? Math.floor(values[value2-1]/9)-1 : Math.floor(values[value2-1]/9);
			const j = (values[value2 - 1]%9 === 0) ? 8 : (values[value2-1]%9) - 1;
			const ans = getPossibleValue(i,j);
			if(ans !== undefined){
				actualTrue += 1;
				ele.value = ans;
				ele.disabled = true;
			}
		}
		ele = document.getElementById(values[value3 - 1]);
		if(ele.value === ''){
			const i = (values[value3 - 1]%9 === 0) ? Math.floor(values[value3-1]/9)-1 : Math.floor(values[value3-1]/9);
			const j = (values[value3 - 1]%9 === 0) ? 8 : (values[value3-1]%9) - 1;
			const ans = getPossibleValue(i,j);
			if(ans !== undefined){
				actualTrue += 1;
				ele.value = ans;
				ele.disabled = true;
			}
		}
		ele = document.getElementById(values[value4 - 1]);
		if(ele.value === ''){
			const i = (values[value4 - 1]%9 === 0) ? Math.floor(values[value4-1]/9)-1 : Math.floor(values[value4-1]/9);
			const j = (values[value4 - 1]%9 === 0) ? 8 : (values[value4-1]%9) - 1;
			const ans = getPossibleValue(i,j);
			if(ans !== undefined){
				actualTrue += 1;
				ele.value = ans;
				ele.disabled = true;
			}
		}
		row += 3;
	}
	row += 18;
}

empty = (81 - actualTrue);
//console.log(actualTrue,wrong,empty);
//console.log(board);