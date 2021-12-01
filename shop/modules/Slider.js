import List from "./List.js";
import SliderItem from "./SliderItem.js"


export default class Slider extends List {
    constructor(container = ".slider", API = 'https://raw.githubusercontent.com/Abbascloud/API/master', ) {
        super(container);
        this.API = API;
        this.itemLeftValue = 0;
        this.items = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render(SliderItem);
                this._init();

            })
    }

    _init() {
        document.querySelector(".arrow__left__holder").addEventListener("click", this._leftSlide.bind(this));
        document.querySelector(".arrow__right__holder").addEventListener("click", this._rightSlide.bind(this));
        this.items = [...document.querySelectorAll(".slider__item")];
        this._getMidleOfSlider();

    }

    _getProducts() {
        return fetch(`${this.API}/GoodsFlowers.json`)
            .then(result => result.json())
            .catch(error => console.log(error))
    }

    _leftSlide() {
        if (this._getItemLeftStyle(this.items[0]) > 0) {
            this._getMidleOfSlider();
        } else {
            this.itemLeftValue = this.itemLeftValue + 250;
        }
        this.items.forEach(item => {
            item.style = `left: ${this.itemLeftValue}px`;
        })
    }

    _rightSlide() {
        if (this._getItemLeftStyle(this.items[0]) < -(this._getItemsWhidht() / 2 + this.items[0].clientWidth)) {
            this._getMidleOfSlider();
        } else {
            this.itemLeftValue = this.itemLeftValue + (-250);
        }
        this.items.forEach(item => {
            item.style = `left: ${this.itemLeftValue}px`;
        })

    }

    _getItemsWhidht() {
        return (this.items.reduce((summ, item) => summ + parseInt(item.clientWidth), 0));

    }
    _getItemLeftStyle(element) {
        return parseInt(window.getComputedStyle(element).left);
    }

    _getItemRightStyle(element) {
        return parseInt(window.getComputedStyle(element).right);
    }

    _getMidleOfSlider() {
        let sliderWidht = this._getItemsWhidht()
        this.itemLeftValue = -(sliderWidht / 2) / 2;
        this.items.forEach(item => {
            item.style = `left: ${this.itemLeftValue}px`
        });
    }

}