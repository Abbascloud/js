import Item from "./Item.js";

export default class ProductItem extends Item {
    constructor(data) {
        super(data);
        this.img = data.img;
        this.title = data.title;


    }
    render() {
        return `<div class="slider__item">
        <img src="https://placebear.com/500/500" alt="image">
        <p class="slider__desc">${this.title}</p>
        <button data-id=${this.id}  type="button" class="slider__button add__button">add</button>
    </div>`
    }
}