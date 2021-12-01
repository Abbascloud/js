export default class Settings {
    constructor(fieldSize, fieldContainer = ".field", snakeSpeed, settingsContainer = '.settings') {
        this.fieldContainer = fieldContainer;
        this.fieldSize = fieldSize;
        this.snakeSpeed = snakeSpeed;
        this.settingsContainer = settingsContainer;
        this.init()

    }
    init() {
        this._render()
        document.querySelector(this.settingsContainer).addEventListener("input", e => {
            if (e.target.id == "speedInput") {
                this._changeSpeedLabelText(e.target.value)
            }
            if (e.target.id == "fieldSize") {
                this._changeFieldSizeLabelText(e.target.value)
            }
        })
        document.querySelector(this.settingsContainer).addEventListener("click", e => {
            if (e.target.classList.contains("changeSettingsButton")) {
                this._getNewFieldSize();
                this._getNewSnakeSpeed();
                console.log(this)
            }
        });


    }
    _makeHTML() {
        return `    <form class="settingsForm" action="#">
        <h1>Settings</h1>
        <input id="speedInput" name="speed" type="range" min="1" max="10" value="${this.snakeSpeed}">
        <label class="speedLabel" for="speedInput">speed ${this.snakeSpeed}</label>
        <input id="fieldSize" name="size" type="range" min="10" max="50" value="${this.fieldSize}" step="10">
        <label class="fieldSizeLabel" for="fieldSize">field size ${this.fieldSize}</label>
        <button class="changeSettingsButton" type="button">Change settgs</button>
        <button class="submitButton" type="button">Submit</button>
    </form>`;
    }
    _render() {
        document.querySelector(this.settingsContainer).insertAdjacentHTML("beforeend", this._makeHTML());
    }
    _showSettings() {
        document.querySelector(".settingsForm").classList.toggle("hidden");
    }
    _getNewFieldSize() {
        let newFieldSize = parseInt(document.querySelector("#fieldSize").value);
        this.fieldSize = newFieldSize;
    }
    _getNewSnakeSpeed() {
        let newSnakeSpeed = parseInt(document.querySelector("#speedInput").value);
        this.snakeSpeed = newSnakeSpeed;
    }
    _changeFieldSizeLabelText(content) {
        document.querySelector(".fieldSizeLabel").innerHTML = `field size ${content}`;
    }
    _changeSpeedLabelText(content) {
        document.querySelector(".speedLabel").innerHTML = `speed ${content}`;
    }
}