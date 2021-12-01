export default class Validator {
    constructor() {
        this.patterns = {
            name: /([a-zA-Zа-яёА-ЯЁ',.-]+( [a-zA-Zа-яёА-ЯЁ',.-]+)*){2,30}/,
            phoneNumber: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            mail: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
        };
        this.errors = {
            name: "name ERROR",
            phoneNumber: "num ERROR",
            mail: "mail ERROR",
        };
        this._init();
    }
    _addErrors(regexp, e) {
        if (!regexp.test(e.value)) {
            e.classList.add("redBorder");
            e.classList.remove("greenBorder");
            document.querySelector(`.error[data-name="${e.name}"]`).textContent = this.errors[e.name];
        } else {
            e.classList.remove("redBorder");
            e.classList.add("greenBorder");
            document.querySelector(`.error[data-name="${e.name}"]`).textContent = '';
        }

    }

    _restoreChanges() {
        document.querySelectorAll('.error').forEach(e => {
            this._validEl(e);
        });
    }

    _validEl(el) {
        el.textContent = "";
        el.classList.remove("greenBorder");
        el.classList.remove("redBorder");
    }

    _init() {

        document.querySelector('.userInfo').addEventListener('submit', e => {
            if (!this._checkValidation()) {
                e.preventDefault();
            }
            this._validForm();
            this._validInputs();
        })

    }

    _validForm() {

        let inputs = document.querySelectorAll(".inputInfo");
        inputs.forEach(e => {
            let regexp = this.patterns[e.name];
            this._addErrors(regexp, e)
        })

    }
    _validInputs() {
        document.querySelectorAll(".inputInfo").forEach(el => {
            el.addEventListener('input', event => {
                let regexp = this.patterns[event.target.name]
                this._addErrors(regexp, event.target)
            })

        })

    }


    _checkValidation() { //true or false
        let inputs = document.querySelectorAll(".inputInfo");
        for (let i = 0; i < inputs.length; i++) {
            let pattern = this.patterns[inputs[i].name]
            if (!pattern.test(inputs[i].value)) {
                return false;
            }

        }
        return true;

    }

}