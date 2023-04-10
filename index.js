let score = document.getElementById("game__score--player");
let highScore = document.getElementById("game__score--highscore");
let gameField = document.getElementById("game__field");
let highOniSama = 0;
gameField.innerHTML = ``;

let snake = {
  score: 0,
  updateScore: function () {
    score.innerHTML = this.score;
    if (this.score > highOniSama) {
      highOniSama = this.score;
    }
    highScore.innerHTML = highOniSama;
  },
  dir: "right",
  position: { x: 1, y: 1 },
  body: [this.position],
};

let food = {
  position: { x: 3, y: 5 },
  updatePosition: function () {
    this.position.x = Math.floor(Math.random() * 30) + 1;
    this.position.y = Math.floor(Math.random() * 30) + 1;
  },
  checkFood: function () {
    if (
      snake.position.x == this.position.x &&
      snake.position.y == this.position.y
    ) {
      this.updatePosition();
      snake.score++;
      snake.updateScore();
      snake.body.push({ x: food.position.x, y: food.position.y });
    }
  },
};

const changeDir = (e) => {
  let key = e.key;
  if (key == "a" && snake.dir != "right") {
    snake.dir = "left";
  } else if (key == "w" && snake.dir != "down") {
    snake.dir = "up";
  } else if (key == "d" && snake.dir != "left") {
    snake.dir = "right";
  } else if (key == "s" && snake.dir != "up") {
    snake.dir = "down";
  }
  console.log(snake.dir);
};

const moveSnake = () => {
  let x = snake.position.x;
  let y = snake.position.y;
  if (snake.dir == "right") {
    y++;
  } else if (snake.dir == "left") {
    y--;
  } else if (snake.dir == "up") {
    x--;
  } else if (snake.dir == "down") {
    x++;
  }
  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i] = snake.body[i - 1];
  }

  snake.position = { x: x, y: y };
  snake.body[0] = snake.position;
};

// check game over
const checkGameOver = () => {
  let x = snake.position.x;
  let y = snake.position.y;
  if (x < 0 || x > 30 || y < 0 || y > 30) {
    return true;
  }
  for (let i = 1; i < snake.body.length; i++) {
    if (snake.body[i].x == x && snake.body[i].y == y) {
      return true;
    }
  }
  return false;
};

const game = () => {
  food.checkFood();
  let html = `<div class="food" style="grid-area: ${food.position.x}/${food.position.y}"></div>`;
  moveSnake();
  if (checkGameOver()) {
    clearInterval(intervalID);
    snake.score = 0;
    location.reload();
  }
  for (let i = 0; i < snake.body.length; i++) {
    html += `<div class="snake" style="grid-area: ${snake.body[i].x}/${snake.body[i].y};"></div>`;
  }
  gameField.innerHTML = html;
};

//add listener
let intervalID = setInterval(game, 80);
document.addEventListener("keydown", changeDir);
