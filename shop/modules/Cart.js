import CartItem from "./CartItem.js";
import List from "./List.js";

export default class Cart extends List {
    constructor(container = ".cart", counterContainer = ".counter") {
        super(container);
        this.counterContainer = counterContainer;
        this._init();
        this.summ = 0;
    }
    getSumm() {
        this.summ = this.goods.reduce((accum, e) => accum + e.summ, 0);
    }

    _clearCart() {
        document.querySelectorAll(".goodInCart").forEach(e => {
            e.remove();
        });
    }
    _getCounter() {
        return this.goods.reduce((accum, e) => accum + e.quantity, 0);
    }
    showCart() {
        this._clearCart();
        this.render(CartItem);
        this._fillCounter();

    }
    _fillCounter() {
        document.querySelector(this.counterContainer).textContent = this._getCounter();
    }
    _removeEl(id) {
        this.goods.forEach(e => {
            if (e.id == parseInt(id)) {
                this.goods.splice(this.goods.indexOf(e), 1);
            }
        });
    }
    _increaseQuantity(id) {
        this.goods.forEach(e => {
            if (e.id == parseInt(id)) {
                e.quantity++;
                e.getSumm();
            }
        });
    }
    _decreaseQuantity(id) {
        this.goods.forEach(e => {
            if (e.id == parseInt(id)) {
                e.quantity--;
                e.getSumm();
            }
            if (e.quantity == 0) {
                this._removeEl(e.id);
            }
        });
    }
    _init() {
        let block = document.querySelector(this.container);
        document.querySelector(".basket").addEventListener('click', () => {
            block.classList.toggle('hidden');
        });
        block.addEventListener('click', e => {
            if (e.target.classList.contains("clearCart__Btn")) {
                this._clearCart();
                this.goods = [];
                this._fillCounter();

            }
            if (e.target.classList.contains("delete__good")) {
                this._removeEl(e.target.dataset.id);
                this.showCart();
            }
            if (e.target.classList.contains("decrease")) {
                this._decreaseQuantity(e.target.dataset.id);
                this.showCart();
            }
            if (e.target.classList.contains("increase")) {
                this._increaseQuantity(e.target.dataset.id);
                this.showCart();
            }
        });
    }
}