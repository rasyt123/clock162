let currMoleTile;
let currPlantTile;
let currAlienTile;
let score = 0;
let gameOver = false;
let easydiff = false;
let mediumdiff = false;
let harddiff = false;
let startgame = false;

window.onload = function() {
    setGame();
}


function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    document.getElementById("easyb").onclick = function() {
        setInterval(setMole, 1000); 
    }


    document.getElementById("mediumb").onclick = function() {
        mediumdiff = true;
        startgame = true;
        setInterval(setMole, 500);  
        setInterval(SetAlien, 1000);
        setInterval(setPlant, 2000); 
    }



    document.getElementById("hardb").onclick = function() {
        harddiff = true;
        startgame = true;
      setInterval(setMole, 250); 
       setInterval(SetAlien, 500);
      setInterval(setPlant, 1000);
    }
}






function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

//Fist check if game is over, then set alien into appropriate cell on board
function SetAlien() {
  if (gameOver) {
    return;
  }
  if (currAlienTile) {
      currAlienTile.innerHTML = "";
  }
  let alien = document.createElement("img");
  alien.src = "./alien-magenta.png";

  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id == num || 
     currMoleTile && currMoleTile.id == num) {
    return;
  }
  currAlienTile = document.getElementById(num);
  currAlienTile.appendChild(alien);

  
}



//Fist check if game is over, then set mole into appropriate cell on board
function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if ( currPlantTile && currPlantTile.id == num || 
           currAlienTile && currAlienTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

//Fist check if game is over, then set plant into appropriate cell on board

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num || 
        currAlienTile && currAlienTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}
//If the tile is clicked, check if it is the correct tile

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score html
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
    } else if (this == currAlienTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
    }
}