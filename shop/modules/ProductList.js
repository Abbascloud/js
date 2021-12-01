import List from "./List.js";
import ProductItem from "./ProductItem.js";
import CartItem from "./CartItem.js";
import Cart from "./Cart.js";


export default class ProductList extends List {
    constructor(container = ".cards__holder", API = 'https://raw.githubusercontent.com/Abbascloud/API/master') {
        super(container);
        this.API = API;
        this.filtered = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render(ProductItem);
                this._init();

            })

    }
    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.goods.filter(good => regexp.test(good.title));
        this.goods.forEach(el => {
            const block = document.querySelector(`.card[data-id="${el.id}"]`);
            if (!this.filtered.includes(el)) {
                block.classList.add('hidden');
            } else {
                block.classList.remove('hidden');
            }
        })
    }
    _getProducts() {
        return fetch(`${this.API}/GoodsFlowers.json`)
            .then(result => result.json())
            .catch(error => console.log(error))
    }
    _init() {

        const cart = new Cart(); //создаем корзину
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains("add__button")) {
                this.goods.forEach(el => {
                    if (parseInt(e.target.dataset.id) == el.id) {
                        if (cart.goods.find(item => item.id == el.id)) {
                            let cartItem = cart.goods.find(item => item.id == el.id);
                            cartItem.quantity++;
                            cartItem.getSumm();
                        } else {
                            let productInCart = new CartItem(el);
                            cart.goods.push(productInCart);
                        }
                    }

                })

            }
            cart.showCart();
        });
        document.querySelector('.search').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector(".input").value);
        })
        document.querySelector('.input').addEventListener('input', e => {
            this.filter(document.querySelector(".input").value);
        })
    }


}