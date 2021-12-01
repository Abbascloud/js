import Item from "./Item.js";

export default class CartItem extends Item {
    constructor(data) {
        super(data);
        this.quantity = data.quantity
        this.summ = 0;
        this._init();
    }
    _init() {
        if (!this.quantity) {
            this.quantity = 1;
        }
        this.getSumm();
    }
    getSumm() {
        this.summ = this.quantity * this.price;
    }
    render() {
        return ` <div class="cart__item goodInCart">
        <p class="title">${this.title}</p>
        <div class="quantityContainer"> <img data-id="${this.id}" class="decrease" src="icons/arrow__left.svg" alt="arrow left">
        <p class="quantity">${this.quantity}</p>
        <img data-id=${this.id} class="increase" src="icons/arrow__right.svg" alt="arrow right"></div>
        <p class="price">${this.price}</p>
        <p class="summ">${this.summ}</p>
        <img data-id="${this.id}" class="delete__good" src="icons/cross.svg" alt="esc">
        </div>`
    }
}