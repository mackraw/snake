'use strict';

const playBtn = document.querySelector('.playBtn');
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const unit = 10;
const rows = canvas.height / unit;
const columns = canvas.width / unit;
let highScore = 0;

let snake;
let fruit;

class Snake {
  constructor() {
    this.x = Math.floor(canvas.width / 3);
    this.y = Math.floor(canvas.height / 2);
    this.xSpeed = unit * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function () {
      ctx.fillStyle = '#4a8848';
      for (let i = 0; i < this.tail.length; i++) {
        ctx.fillRect(this.tail[i].x, this.tail[i].y, unit, unit);
      }

      ctx.fillRect(this.x, this.y, unit, unit);
    };

    this.update = function () {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }

      this.tail[this.total - 1] = { x: this.x, y: this.y };

      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if (this.x > canvas.width - unit) {
        this.x = 0;
      }

      if (this.y > canvas.height - unit) {
        this.y = 0;
      }

      if (this.x < 0) {
        this.x = canvas.width - unit;
      }

      if (this.y < 0) {
        this.y = canvas.height - unit;
      }
      this.changeDirection = function (direction) {
        switch (direction) {
          case 'Up':
            this.xSpeed = 0;
            this.ySpeed = -unit * 1;
            break;
          case 'Down':
            this.xSpeed = 0;
            this.ySpeed = unit * 1;
            break;
          case 'Left':
            this.xSpeed = -unit * 1;
            this.ySpeed = 0;
            break;
          case 'Right':
            this.xSpeed = unit * 1;
            this.ySpeed = 0;
            break;
        }
      };

      this.eat = function (fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
          this.total++;
          if (this.total > highScore) {
            highScore = this.total;
          }
          console.log(highScore);

          return true;
        }

        return false;
      };

      this.checkCollision = function () {
        for (var i = 0; i < this.tail.length; i++) {
          if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
            document.querySelector('.highScore').innerText = highScore;
            this.total = 0;
            this.tail = [];
          }
        }
      };
    };
  }
}

class Fruit {
  constructor() {
    this.x;
    this.y;

    this.dropNewFruit = function () {
      this.x = (Math.floor(Math.random() * columns - 1) + 1) * unit;
      this.y = (Math.floor(Math.random() * rows - 1) + 1) * unit;
    };

    this.draw = function () {
      ctx.fillStyle = '#8b2525';
      ctx.fillRect(this.x, this.y, unit, unit);
    };
  }
}

playBtn.addEventListener('click', playSnake);

function playSnake() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.dropNewFruit();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.dropNewFruit();
    }

    snake.checkCollision();
    document.querySelector('.currentScore').innerText = snake.total;
  }, 150);
}

window.addEventListener('keydown', (e) => {
  const direction = e.key.replace('Arrow', '');
  snake.changeDirection(direction);
});
