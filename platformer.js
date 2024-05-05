
window.onload = function() {
  createresources();
}


function jump(chary) {
    let upwardvelocity = -200;
    let updated = chary + upwardvelocity;
    return updated;
}

//add collision between platform later


let totalcoins = 2;



//collision detection for both coins
function collidecoin1() {
  let coin = document.getElementById("coin");
  let character = document.getElementById("character");
  let coinX = coin.offsetLeft;
  let coinY = coin.offsetTop;
  let characterX = character.offsetLeft;
  let characterY = character.offsetTop;
  let coinWidth = coin.offsetWidth;
  let coinHeight = coin.offsetHeight;
  let characterWidth = character.offsetWidth;
  let characterHeight = character.offsetHeight;
  if (characterX < coinX + coinWidth && characterX + characterWidth > coinX && characterY < coinY + coinHeight && characterY + characterHeight > coinY) {
    totalcoins -= 1;
    coin.style.display = "none";
  }
}



function collidecoin2() {
  let coin = document.getElementById("coin1");
  let character = document.getElementById("character");
  let coinX = coin.offsetLeft;
  let coinY = coin.offsetTop;
  let characterX = character.offsetLeft;
  let characterY = character.offsetTop;
  let coinWidth = coin.offsetWidth;
  let coinHeight = coin.offsetHeight;
  let characterWidth = character.offsetWidth;
  let characterHeight = character.offsetHeight;
  if (characterX < coinX + coinWidth && characterX + characterWidth > coinX && characterY < coinY + coinHeight && characterY + characterHeight > coinY) {
    totalcoins -= 1;
    coin.style.display = "none";
  }
}




function platformcollision1() {
  /*
    You can hit the platform from the floor to the top 
    or u can jump on top of the platform and you fall down
    query selector to get all of the platforms
  */
  firstplatform = document.getElementById("platform1");
  platrect = firstplatform.getBoundingClientRect();


  characterdim = document.getElementById("character");
  charrect = characterdim.getBoundingClientRect();
  if (charrect.bottom >= platrect.top && charrect.bottom <= platrect.bottom &&

     platrect.left <= charrect.left && charrect.left <= platrect.left + 400){
    return true;
  }
  return false;
}


//seperate functions for each one of the platforms 
//and when they collide 
function platformcollision2() {

    secondplatform = document.getElementById("platform2");
    platrect = secondplatform.getBoundingClientRect();

    charrect = characterdim.getBoundingClientRect();
    if (charrect.bottom >= platrect.top && charrect.bottom <= platrect.bottom &&

       platrect.left <= charrect.left && charrect.left <= platrect.left + 200){
      return true;
    }
    return false;

}


//what happens if we collide with an enemy
function EnemyCollision() {

  let enemy = document.getElementById("enemy");
  let character = document.getElementById("character");
  let enemyx = parseFloat(enemy.style.left);
  let charx = parseFloat(character.style.left);
  let enemyy = parseFloat(enemy.style.top);
  let chary = parseFloat(character.style.top);
  let enemywidth = parseFloat(enemy.style.width);
  let characterwidth = parseFloat(character.style.width);
  let vheight = document.documentElement.clientHeight;




 let convertenemyy = enemyy / 100;
  convertenemyy= convertenemyy * vheight;


  
  if (enemyx < charx + characterwidth && enemyx > charx
     && convertenemyy < chary + 50 && convertenemyy > chary) {
    console.log("collide");
    clearInterval(intervalid);
    clearInterval(enemyinterval);
    //stop all things from functioning, set hidden
    //header to be visible 
    let getlost = document.getElementById("lost");
    getlost.style.visibility = "visible";
  }
}



//velocity constantly downwrads
//this function gets called frequently useing set interval

function gravity() {
    let character = document.getElementById("character");
    let charactertopy = parseFloat(character.style.top, 10);
    let yvelocity = 10;
    charactertopy += yvelocity;


    if (charactertopy >= document.documentElement.clientHeight - (0.2 * vheight) - 50)     {
      charactertopy = document.documentElement.clientHeight - (0.2 * vheight) - 50
      //prevent left and right character from moving off screen
    }
  
  collidecoin1();
  collidecoin2();
  EnemyCollision();


  if (totalcoins == 0) {
      document.body.innerHTML = "You Win!";
      document.body.style.color = "white";
      document.body.style.textAlign = "center";
      document.body.style.fontSize = "48px";
  }


  //what happens if any of the platform collsiions are true
  if (platformcollision1()) {
    let firstplatform = document.getElementById("platform1");
    let platrect = firstplatform.getBoundingClientRect();


    let characterdim = document.getElementById("character");
    let charrect = characterdim.getBoundingClientRect();
    character.style.top = platrect.top - 48 + "px";



  } else if (platformcollision2()) {

    let secondplatform = document.getElementById("platform2");
    let platrect = secondplatform.getBoundingClientRect();


    let characterdim = document.getElementById("character");
    let charrect = characterdim.getBoundingClientRect();
    character.style.top = platrect.top - 48 + "px";


    
  } else  {
     character.style.top = charactertopy + "px";
  }
}


currentkpress = {};



document.addEventListener('keyup', (event) => {
    currentkpress[event.key] = false; 
})

document.addEventListener("keydown", checkmovementchar);
function checkmovementchar(event) {
  let character = document.getElementById("character");
  let charx = parseInt(character.style.left, 10);
  let chary = parseInt(character.style.top, 10);
  // Convert the left style to an integer
  let leftkeypress = 37;
  let rightkeypress = 39;
  let spacebar = 32;


  //velocity is constantly downwards, this checks if you 
  //press both 

  if (event.keyCode == leftkeypress || event.keyCode == rightkeypress || 
     event.keyCode == spacebar) {
        currentkpress[event.key] = true;
}


  if (event.keyCode == leftkeypress) {
    charx -= 40;
  } 
  if (event.keyCode == rightkeypress) {
    charx += 40;
  }

  if (event.keyCode == spacebar) {
    let result = jump(chary);
    character.style.top = result + 'px';
  }



  if (charx < 0) {
    charx = 0;
  }
  viewportwidth = document.documentElement.clientWidth;
  if (charx + 50 >= viewportwidth) {
    charx = viewportwidth - 50;
  }

  character.style.left = charx + 'px';
}

let intervalid = setInterval(gravity, 50);
let enemyinterval = setInterval(enemymovement, 50);



function placecoins1() {

  vheight = document.documentElement.clientHeight;
  let coin1 = document.createElement("div");
  coin1.id = "coin";
  coin1.style.position = "fixed";
  coin1.style.top = "44%";
  coin1.style.left = "65%";
  coin1.style.width = "50px";
  coin1.style.height = "50px";
  document.body.appendChild(coin1);
}

//place location of both coins on top of platforms
function placecoins2() {

  vheight = document.documentElement.clientHeight;
  let coin1 = document.createElement("div");
  coin1.id = "coin1";
  coin1.style.position = "fixed";
  coin1.style.top = "54%";
  coin1.style.left = "30%";
  coin1.style.width = "50px";
  coin1.style.height = "50px";
  document.body.appendChild(coin1);
}



//enemy location 
function addenemy() {
  let enemy = document.createElement("div");
  let vwidth = document.documentElement.clientWidth;
  enemy.id = "enemy";
  enemy.style.position = "fixed";
  enemy.style.top = "75%";
  enemy.style.left = (vwidth / 2) + 'px';
  enemy.style.width = "50px";
  enemy.style.height = "50px";
  document.body.appendChild(enemy);
}


let currentenemydir = "left";



function enemymovement() {
  let enemy = document.getElementById("enemy");
  let enemyx = parseFloat(enemy.style.left);

  let vwidth = document.documentElement.clientWidth;


  //deal  with collision later 

  let character = document.getElementById("character");
  let charx = parseFloat(character.style.left);
  /*
     check if you're in within 200px of sight to left
     if you're within 200px of sight to the right 
     move to direction of the player 
     move right once you hit boundary
     /move left once you hit boundary
      however if you're within 200 pixels of sight 

  */
  
 
    if ( enemyx <= 0  && currentenemydir == "left") {
      currentenemydir ="right";
       enemyx += 50;
    } else if (enemyx + 50 >= vwidth && currentenemydir == "right")     {
      currentenemydir = "left";
      enemyx -= 50;
    } else if (currentenemydir == "right") {
      enemyx += 20;
    } else if (currentenemydir =="left") {
      enemyx -= 20;
    }

     enemy.style.left = enemyx + "px";
  }





//intializing all game resources







function createresources() {

  let platform1 = document.createElement("div");
  platform1.id = "platform1";
  platform1.style.position = 'fixed';
  platform1.style.left = '50%';
  platform1.style.top = '50%';
  platform1.style.width = '400px';
  platform1.style.height = '50px';
  platform1.style.backgroundImage = "url('dblock.jpg')";
  platform1.style.backgroundSize = 'cover';
  platform1.style.backgroundRepeat = 'no-repeat';
  document.body.appendChild(platform1);




  // Styling for platform2


  let platform2 = document.createElement("div");
  platform2.id = "platform2";
  platform2.style.position = 'fixed';
  platform2.style.left = '25%';
  platform2.style.top = '60%';
  platform2.style.width = '200px';
  platform2.style.height = '50px';
  platform2.style.backgroundImage = "url('dblock.jpg')";
  platform2.style.backgroundSize = 'cover';
  platform2.style.backgroundRepeat = 'no-repeat';
  document.body.appendChild(platform2);



  // Styling for floor
  let floor = document.createElement("div");
  floor.id = "floor";
  floor.style.position = 'fixed';
  floor.style.left = '0px';
  floor.style.bottom = '0px';
  floor.style.width = '100%';
  floor.style.height = '20%';
  floor.style.backgroundImage = "url('dblock.jpg')";
  document.body.appendChild(floor);


  let character = document.createElement("div");
  character.id = "character";
  character.style.position = 'fixed';
  character.style.width = '50px';
  character.style.height = '50px';
  character.style.transition = 'top 0.2s ease-out';

  
  vheight = document.documentElement.clientHeight;
  ctop = document.documentElement.clientHeight - (0.2 * vheight) - 50;
  character.style.top = ctop + 'px';
  character.style.left = '0px';
  document.body.appendChild(character);


  placecoins1();
  placecoins2();
  addenemy();
}


