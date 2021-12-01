export default class Food {
    constructor(settings) {
        this.x = 0;
        this.y = 0;
        this.fieldSize = settings.fieldSize;
    }
    _getRandomСoordinate() {
        return parseInt(Math.random() * (this.fieldSize + 1));
    }
    render() {
        this.x = this._getRandomСoordinate();
        this.y = this._getRandomСoordinate();
        let foodCell = document.querySelector(`.cell[data-x="${this.x}"][data-y="${this.y}"]`);
        if (foodCell.classList.contains("snake")) {
            this.render()
        } else {
            foodCell.classList.add("food");
        }
    }
    removeFood() {
        let foodCell = document.querySelector(`.cell[data-x="${this.x}"][data-y="${this.y}"]`);
        foodCell.classList.remove("food");
    }
}