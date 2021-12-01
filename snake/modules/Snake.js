import Field from "./Field.js";

export default class Snake {
    constructor(settings, food) {
        this.possibleDirections = ["Up", "Right", "Down", "Left"]
        this.speed = settings.snakeSpeed;
        this.direction = "Up";
        this.food = food;
        this.fieldSize = settings.fieldSize;
        this.body = [{
            x: 0,
            y: 2,
        }, {
            x: 0,
            y: 1,
        }, {
            x: 0,
            y: 0,
        }];
    }
    _checkSnakeOnBody() {
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
                return true
            }
        }
    }
    _checkSnakeOnFood() {
        if (this.body[0].x == this.food.x && this.body[0].y == this.food.y) {
            return true
        }
    }
    _renderBodyEl(x, y) {
        document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`).classList.add("snake");
    }

    _removeSnake() {
        document.querySelectorAll(".snake").forEach(e => {
            e.classList.remove("snake");
        })

    }
    render() {
        this.body.forEach(e => {
            this._renderBodyEl(e.x, e.y)
        })
    }

    moveTick() {

        let currentHeadCoords = this.body[0];
        let newHeadCoords = {
            x: currentHeadCoords.x,
            y: currentHeadCoords.y,
        }

        switch (this.direction) {
            case "Up":
                newHeadCoords.y++;
                if (newHeadCoords.y > this.fieldSize) {
                    newHeadCoords.y = 0;
                }
                break;
            case "Right":
                newHeadCoords.x++;
                if (newHeadCoords.x > this.fieldSize) {
                    newHeadCoords.x = 0;
                }
                break;
            case "Down":
                newHeadCoords.y--;
                if (newHeadCoords.y < 0) {
                    newHeadCoords.y = this.fieldSize;
                }
                break;
            case "Left":
                newHeadCoords.x--;
                if (newHeadCoords.x < 0) {
                    newHeadCoords.x = this.fieldSize;
                }
                break;
        }
        this.body.unshift(newHeadCoords);
        if (!this._checkSnakeOnFood()) {
            this.body.pop();
        } else {
            this.food.removeFood()
            this.food.render()

        }


    }



    changeDirection(newDirection) {
        if (this._isPasseOppositeDirection(newDirection)) {
            return;
        }
        this.direction = newDirection;
    }
    _isPasseOppositeDirection(newDirection) {
        if (this.direction == 'Up' && newDirection == 'Down') {
            return true;
        }
        if (this.direction == 'Right' && newDirection == 'Left') {
            return true;
        }
        if (this.direction == 'Down' && newDirection == 'Up') {
            return true;
        }
        if (this.direction == 'Left' && newDirection == 'Right') {
            return true;
        }
        return false;
    }
}