let reqAnimationInitial;
let reqAnimationRecords;

/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
// função que move um objeto em circulos calculando x e y
const canvas = new Canvas();

let fx = function (incremento) {
  return (140 + 55 * -Math.cos(incremento / 11));
};

let fy = function (incremento) {
  return (370 + 55 * -Math.sin(incremento / 11));
};

let fxSecond = function (incremento) {
  return (140 + 55 * Math.cos(incremento / 11));
};

let fySecond = function (incremento) {
  return (370 + 55 * Math.sin(incremento / 11));
};

let frames = 0;

// O incremento é o que faz o objeto girar;
// se você calcular fx() com 0
// e depois calcular fx() com 1, 2, 3... etc
// a funcao retornará uma posição de X em forma de círculo
// e a mesma coisa com fy();
let incremento = 1;

let xFirst = 85.22711624646905;
let yFirst = 365.00688420701215;

let xSecond = 194.77288375353095;
let ySecond = 374.99311579298785;


function text(text, size, color, x, y) {
  canvas.ctx.font = size + " 'Major Mono Display', monospace";
  canvas.ctx.fillStyle = color;
  canvas.ctx.fillText(text, x, y);
}

function textGameOver() {
  canvas.ctx.font = "35px 'Major Mono Display', monospace";
  canvas.ctx.fillStyle = "white";
  canvas.ctx.fillText("Game over", 25, 160);
}

function textSpaceBar() {
  canvas.ctx.font = "14px 'Major Mono Display', monospace";
  canvas.ctx.fillStyle = "white";
  canvas.ctx.fillText("press the spacebar", 50, 190);
}

function textToPlayAgain() {
  canvas.ctx.font = "14px 'Major Mono Display', monospace";
  canvas.ctx.fillStyle = "white";
  canvas.ctx.fillText("to play again", 75, 210);
}

function textScore() {
  canvas.ctx.font = "18px 'Major Mono Display', monospace";
  canvas.ctx.fillStyle = "white";
  canvas.ctx.fillText("Score: " + frames, 20, 30);
}

function circleShape(x, y) {
  canvas.ctx.beginPath();
  canvas.ctx.arc(x, y, 10, 0, Math.PI * 2, true);
  canvas.ctx.fill();
  canvas.ctx.closePath();
}

function Circle(x, y) {
  this.x = x;
  this.y = y;
}

Circle.prototype.drawCircle = function () {
  circleShape(this.x, this.y);
}

function rotationCircle(side) {
  // acionando o incremento
  if (side === 'left') {
    incremento += 1;
  } else {
    incremento -= 1;
  }

  // CALCULANDO X E Y DO OBJETO
  canvas.circle[0].x = fx(incremento);
  canvas.circle[0].y = fy(incremento);

  // CALCULANDO X E Y DO OBJETO
  canvas.circle[1].x = fxSecond(incremento);
  canvas.circle[1].y = fySecond(incremento);

  if (incremento === Math.PI * 2 * 20) incremento = .5;
}

function rectangle(x, y, wh, hh) {
  canvas.ctx.beginPath();
  canvas.ctx.rect(x, y, wh, hh);
  canvas.ctx.fill();
  canvas.ctx.closePath();
}

function Obstacle(x, width, height) {
  this.x = x;
  this.y = 0;
  this.width = width;
  this.height = height;
}

Obstacle.prototype.drawObstacle = function () {
  canvas.ctx.fillStyle = 'white';
  rectangle(this.x, this.y, this.width, this.height);
};

function pickObstacle() {
  switch (Math.floor(Math.random() * 6)) {
    case 0:
      canvas.arrayObstacle.push(new Obstacle(20, 130, 28));
      break;
    case 1:
      canvas.arrayObstacle.push(new Obstacle(140, 120, 28));
      break;
    case 2:
      canvas.arrayObstacle.push(new Obstacle(30, 80, 28));
      break;
    case 3:
      canvas.arrayObstacle.push(new Obstacle(170, 80, 28));
      break;
    case 4:
      canvas.arrayObstacle.push(new Obstacle(100, 80, 28));
      break;
    case 5:
      canvas.arrayObstacle.push(new Obstacle(120, 50, 50));
      break;
    default:
      'error!';
  }
}

function Canvas() {
  this.canvas = document.getElementById('my-canvas');
  this.ctx = this.canvas.getContext('2d');
  this.arrayObstacle = [];
  this.circle = [];
  this.restart = false;
  this.records = [];
  this.booleanRecords = false;
}

Canvas.prototype.createObstacle = function () {
  pickObstacle();
};

Canvas.prototype.createCircle = function () {
  this.circle = [new Circle(xFirst, yFirst), new Circle(xSecond, ySecond)];
};

canvas.createCircle();

function animateInitial() {

  rotationCircle('right');
  canvas.ctx.clearRect(0, 0, 280, 450);
  text("duet", "50px", "white", 70, 140);
  text("press the spacebar", "14px", "white", 50, 170);
  text("to start", "10px", "white", 105, 190);

  text("use the left and right", "12px", "white", 50, 220);
  text("arrows to play", "12px", "white", 90, 240);


  canvas.ctx.fillStyle = 'blue';
  canvas.circle[0].drawCircle();
  canvas.ctx.fillStyle = 'red';
  canvas.circle[1].drawCircle();
  reqAnimationInitial = window.requestAnimationFrame(animateInitial);
}

function animate() {
  let reqAnimation = window.requestAnimationFrame(animate);
  gameLoop();

  frames += 1;
  if (frames < 400) {
    if (frames % 55 === 0) {
      canvas.createObstacle();
    }
  } else if (frames > 590 && frames < 1000) {
    if (frames % 40 === 0) {
      canvas.createObstacle();
    }
  } else if (frames > 1190) {
    if (frames % 35 === 0) {
      canvas.createObstacle();
    }
  }

  canvas.ctx.clearRect(0, 0, 280, 450);

  canvas.ctx.fillStyle = 'blue';
  canvas.circle[0].drawCircle();
  canvas.ctx.fillStyle = 'red';
  canvas.circle[1].drawCircle();

  for (let i = 0; i < canvas.arrayObstacle.length; i += 1) {
    if (((canvas.circle[0].x < canvas.arrayObstacle[i].x + canvas.arrayObstacle[i].width + 8) && (canvas.circle[0].x + 8 > canvas.arrayObstacle[i].x) && (canvas.circle[0].y < canvas.arrayObstacle[i].y + 8 + canvas.arrayObstacle[i].height) && (canvas.circle[0].y + 8 > canvas.arrayObstacle[i].y))
      || ((canvas.circle[1].x < canvas.arrayObstacle[i].x + canvas.arrayObstacle[i].width + 8) && (canvas.circle[1].x + 8 > canvas.arrayObstacle[i].x) && (canvas.circle[1].y < canvas.arrayObstacle[i].y + 8 + canvas.arrayObstacle[i].height) && (canvas.circle[1].y + 8 > canvas.arrayObstacle[i].y))) {

      canvas.arrayObstacle = [];
      if (canvas.records.length === 10) {
        canvas.records.shift();
      }
      canvas.records.push(frames);
      frames = 0;

      canvas.restart = false;
      window.cancelAnimationFrame(reqAnimation);
      animateGameOver();
      canvas.booleanRecords = true;

    } else {
      if (canvas.arrayObstacle[i].y > 450) {
        canvas.arrayObstacle.splice(canvas.arrayObstacle[i], 1);
        canvas.arrayObstacle[i].drawObstacle();
      } else {

        canvas.arrayObstacle[i].y += 2;
        if (frames > 500) {
          canvas.arrayObstacle[i].y += 1;
        }

        if (frames > 1100) {
          canvas.arrayObstacle[i].y += 1;
        }
        textScore();
        canvas.arrayObstacle[i].drawObstacle();
      }
    }
  }
}

function animateGameOver() {

  rotationCircle('right');
  canvas.ctx.clearRect(0, 0, 280, 450);
  textGameOver();
  textSpaceBar();
  textToPlayAgain();
  text("or", "10px", "white", 132, 230);
  text("[r] to see the records", "12px", "white", 50, 250);


  canvas.ctx.fillStyle = 'blue';
  canvas.circle[0].drawCircle();
  canvas.ctx.fillStyle = 'red';
  canvas.circle[1].drawCircle();
  reqAnimationInitial = window.requestAnimationFrame(animateGameOver);
}

function animateRecords() {
  let y = 130
  canvas.ctx.clearRect(0, 0, 280, 450);
  text("records", "35px", "white", 55, 100);

  for (let i = 0; i < canvas.records.length; i += 1) {
    y += 20;
    text(canvas.records[i].toString(), "14px", "white", 130, y);
  }
  text("press the spacebar", "12px", "white", 60, 370);
  text("to play again", "10px", "white", 95, 390);

  reqAnimationRecords = window.requestAnimationFrame(animateRecords);
}

window.onload = function () {
  animateInitial();

  document.onkeypress = function (e) {
    switch (e.keyCode) {
      case 32:
        if (!canvas.restart) {
          window.cancelAnimationFrame(reqAnimationInitial);
          canvas.restart = true;
          canvas.booleanRecords = false;
          animate();

        }
        break;
      case 82:
      case 114:
        if (canvas.booleanRecords) {
          animateRecords();
        }
        break;
      case 68:
      case 100:
        canvas.records = [];
        break;
    }
  }
};

var keyState = {};
window.addEventListener('keydown', function (e) {
  keyState[e.keyCode] = true;
}, true);

window.addEventListener('keyup', function (e) {
  keyState[e.keyCode] = false;
}, true);

function gameLoop() {
  if (keyState[37]) {
    rotationCircle('right');
  }
  if (keyState[39]) {
    rotationCircle('left');
  }
}
