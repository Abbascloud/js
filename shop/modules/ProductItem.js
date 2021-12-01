import Item from "./Item.js";

export default class ProductItem extends Item {
    constructor(data) {
        super(data);
        this.img = data.img;
        this.description = data.description;

    }
    render() {
        return `<div data-id=${this.id} class="card">
        <img class="card__img" src="cardsImg/${this.img}" alt="flower_Img">
        <h3 class="card__title">${this.title}</h3>
        <p class="card__desc">${this.description}</p>
        <p class="price">${this.price}<span>$</span></p>
        <button data-id=${this.id}  class = "add__button" type="button">Add</button>
    </div>`
    }
}