export default class Field {
    constructor(settings) {
        this.size = settings.fieldSize;
        this.container = settings.fieldContainer;
        this.init();

    }
    init() {
        this._renderField(this.size)
    }
    _renderString(y) {
        return `<tr data-id='${y}' class="string"></tr>`
    }
    _renderCell(x, y) {
        return `   <td class ='cell'data-y='${y}'  data-x='${x}'></td>`
    }
    _renderField(num) {
        for (let i = 0; i <= num; i++) {
            document.querySelector(this.container).insertAdjacentHTML('afterbegin', this._renderString(i))
        }
        document.querySelectorAll(".string").forEach(e => {
            for (let j = 0; j <= num; j++) {
                e.insertAdjacentHTML('beforeend', this._renderCell(j, e.dataset.id))
            }
        })
    }
}