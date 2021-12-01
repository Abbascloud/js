import Settings from "./modules/Settings.js";
import Field from "./modules/Field.js";
import Snake from "./modules/Snake.js";
import Food from "./modules/Food.js";
import Game from "./modules/Game.js";


let settings = new Settings(20, ".field", 5);

function clickHandler(e) {
    if (e.target.classList.contains("submitButton")) {
        let food = new Food(settings);
        let field = new Field(settings);
        let snake = new Snake(settings, food);
        let game = new Game(settings, snake, food);
        document.querySelector(settings.settingsContainer).classList.add("hidden");
        document.querySelector(".score").classList.remove("hidden");
        document.querySelector(".start").classList.remove("hidden");

    }
}
document.querySelector(settings.settingsContainer).addEventListener("click", clickHandler);