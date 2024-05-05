
window.onload = function() {
  createresources();
}




function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


//setting velocities here
let wingame = false;
let gameover = false;
let left = -10;
let right = 10;
let balldir = getRandomInt(2);
let ballxvelocity = 0;
let ballyvelocity = 0;
if (balldir == 0) {
  ballxvelocity = -10;
  ballyvelocity = -5;
} else {
  ballxvelocity = 10;
  ballyvelocity = -5;
}





//basically if ur horizontal x value of ball is less than zero or greater than zero, rebound off of the wall 
function BallCollidesLeftRightWall(Ballx, vwidth) {
  if (Ballx < 0 || Ballx > vwidth) {
      ballxvelocity = -ballxvelocity;
  }
}


//if y positon is less than zero, then the ball has hit the top wall
function BallCollidesTopWall(Bally) {
  if (Bally < 0) {
      ballyvelocity = -ballyvelocity;
  }
}


//if y position of ball extends beyond viewport height
function BallCollidesOwnWall(Bally, vheight) {
  if (Bally > vheight) {
      gameover = true;
  }
}

function BallCollidesPaddle() {
  //Basically, we take bottom point of the ball and see
  //if it conflicts with the paddle.
      let Ball = document.getElementById("ballers");
      let Paddle = document.getElementById("paddle");
      constpaddlerect = Paddle.getBoundingClientRect();
      constballrect = Ball.getBoundingClientRect();

    let bottomy = constballrect.y + constballrect.height;
    let ballmiddlex = constballrect.x + constballrect.width / 2;


    if (ballmiddlex > constpaddlerect.x && ballmiddlex < constpaddlerect.x + constpaddlerect.width) {
        if (bottomy > constpaddlerect.y && bottomy < constpaddlerect.y + constpaddlerect.height) {
          //randomized velocity
            var ballrandom = getRandomInt(2);
            if (ballrandom == 0) {
              ballyvelocity *= 2;
            } else {
              ballyvelocity /= 2;
            }
            ballyvelocity = -ballyvelocity;
        }
    }

}




function BallCollidesBricks() {
      //You want the top of the circle 
      let listofbricks = document.querySelectorAll('.blockClass');
      let Ball = document.getElementById("ballers");
      for (let i = 0; i < listofbricks.length; i++) {
        let brick = listofbricks[i];
        if (listofbricks[i].style.visibility != "hidden") {
            const brickrect = brick.getBoundingClientRect();
            const ballrect = Ball.getBoundingClientRect();
            /*
              Two types
              Top of the circle touches a brick or 
              Bottom of the circle touches a brick 
              left of circle touches a brck
                  right pf circle touches a brick 

                    DOT
                DOT     DOT
                    DOT

            */
            let balltopcordx = ballrect.x + (ballrect.width / 2);
            let rightcordx = ballrect.x + ballrect.width;
            let rightcordbottomy = ballrect.y + (ballrect.height / 2);
            let bottomy = ballrect.y + ballrect.height;
          //Top 
          //Right
          //Left
          //bottom

            if (balltopcordx > brickrect.x && balltopcordx < 
               brickrect.x + 200) {
                if (ballrect.y > brickrect.y && ballrect.y < 
                    brickrect.y + 50 || bottomy > brickrect.y && bottomy < 
                     brickrect.y + 50) {
                     ballyvelocity = -ballyvelocity;
                 
                      listofbricks[i].style.visibility = 'hidden';
                
                }
            } else if ( rightcordx > brickrect.x && rightcordx < 
                         brickrect.x + 200) {
                  if (rightcordbottomy > brickrect.y && rightcordbottomy < 
                    brickrect.y + 50) {
                    ballxvelocity = -ballxvelocity;
                    listofbricks[i].style.visibility = 'hidden';
                  }
            } else if (ballrect.x > brickrect.x && ballrect.x  < 
                         brickrect.x + 200) {
                    if (rightcordbottomy > brickrect.y && rightcordbottomy < 
                      brickrect.y + 50) {
                      ballxvelocity = -ballxvelocity;
                      listofbricks[i].style.visibility = 'hidden';
                    }
            } 
        }
      }

}



//we convert percentage into px for ballx and bally, 
//we call interval on ballmovement 

function BallMovement() {
  //Collsion Comes later 
  let Ball = document.getElementById("ballers");
  let Ballx = parseFloat(Ball.style.left);
  let Bally = parseFloat(Ball.style.top);





  let decimalBallx = Ballx / 100;
  let decimalBally = Bally / 100;


  vwidth = document.documentElement.clientWidth;
  vheight = document.documentElement.clientHeight;


  Ballx = vwidth * decimalBallx;
  Bally = vheight * decimalBally;



  //Left and Right Wall Collisions First from ball
  //Ballcolision 
  BallCollidesPaddle();
  BallCollidesOwnWall(Bally, vheight);
  BallCollidesLeftRightWall(Ballx, vwidth);
  BallCollidesTopWall(Bally, vheight);
  BallCollidesBricks();




  if (gameover) {


    var thegameover = document.getElementById("gameover");
    thegameover.style.visibility = "visible";

    clearInterval(intervalid);


    return;
  } 

  Ballx = Ballx + ballxvelocity;
  let Ballxperc = (Ballx / vwidth) * 100;

  Bally = Bally + ballyvelocity;
  let Ballyperc = (Bally / vheight) * 100;


  Ball.style.left = Ballxperc + "%";
  Ball.style.top = Ballyperc + "%";


}

//game loop
let intervalid = setInterval(BallMovement, 25);

//add all the blocks for the breakout game here
function createresources() {
  for (let i = 0; i < 10; i++) {
    let block = document.createElement("div");
    block.style.width = "100px";
    block.style.height = "100px";
    block.style.backgroundColor = "red";
    block.style.margin = "10px";
    block.className = "blockClass";
    block.style.visibility = "visible";
    document.getElementById("firstrow").appendChild(block);

  }


  for (let i = 0; i < 10; i++) {
    let block = document.createElement("div");
    block.style.width = "100px";
    block.style.height = "100px";
    block.style.backgroundColor = "#0096FF";
    block.style.margin = "10px";
    block.className = "blockClass";
    block.style.visibility = "visible";
    document.getElementById("secondrow").appendChild(block);
  }


  for (let i = 0; i < 10; i++) {
    let block = document.createElement("div");
    block.style.width = "100px";
    block.style.height = "100px";
    block.style.backgroundColor = "green";
    block.style.margin = "10px";
    block.className = "blockClass";
    block.style.visibility = "visible";
    document.getElementById("thirdrow").appendChild(block);
  }



}





//horizontal movement if you press left or right keys
document.addEventListener("keydown", checkmovementpaddle);
function checkmovementpaddle(event) {
  let Paddle = document.getElementById("paddle");
  let Paddlex = parseInt(Paddle.style.left, 10); // Convert the left style to an integer
  let leftkeypress = 37;
  let rightkeypress = 39;

  if (event.keyCode == leftkeypress) {
    Paddlex -= 60;
  } else if (event.keyCode == rightkeypress) {
    Paddlex += 60;
  }

  if (Paddlex < 0) {
    Paddlex = 0;
  }
  viewportwidth = document.documentElement.clientWidth;
  if (Paddlex + 200 >= viewportwidth) {
    Paddlex = viewportwidth - 200;
  }

  Paddle.style.left = Paddlex + 'px';
}


