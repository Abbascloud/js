export default class List {
    constructor(container) {
        this.container = container;
        this.goods = [];

    }
    render(Obj) {
        const block = document.querySelector(this.container);
        this.goods.forEach(e => {
            let product = new Obj(e);
            block.insertAdjacentHTML("beforeend", product.render());
        })
    }
}