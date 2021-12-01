export default class Game {
    constructor(settings, snake, food) {
        this.food = food;
        this.snake = snake;
        this.score = 0;
        this.winResult = settings.winResult
        this._init()
        this.paused = false;

    }
    _init() {

        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
        document.querySelector('.start').addEventListener('click', e => {
            this.start();
            e.target.classList.add("hidden");
            document.querySelector('.pause').classList.remove("hidden");
        })
        document.querySelector('.pause').addEventListener('click', e => {
            this.paused = !this.paused;
            if (this.paused) {
                e.target.textContent = "resume"
            } else {
                e.target.textContent = "paused"
                this._gameTick();
            }


        })
    }
    _changeScore(scoreContainer) {
        this.score = this.snake.body.length;
        document.querySelector(scoreContainer).innerText = this.score;
    }
    _gameTick() {
        let inteval = setInterval(() => {
            if (this.paused) {
                clearInterval(inteval);
            }
            if (this.snake._checkSnakeOnBody()) {
                clearInterval(inteval);
                alert(`u loose((( ur score ${this.score}`);
                location.reload();
            }

            this.snake.moveTick();
            this.snake._removeSnake();
            this.snake.render();
            this._changeScore(".score");

        }, 1000 / this.snake.speed);
    }


    start() {
        this.snake.render();
        this.food.render();
        this._gameTick()
    }

    pressKeyHandler(event) {

        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection("Up");
                break;
            case "ArrowRight":
                this.snake.changeDirection("Right");
                break;
            case "ArrowDown":
                this.snake.changeDirection("Down");
                break;
            case "ArrowLeft":
                this.snake.changeDirection("Left");
                break;
        }
    }
}