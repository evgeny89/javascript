'use strict';

// статический клас для создания игрового опля
class Board {
    static #xMarks = 3;
    static #yMarks = 3;
    static board = document.querySelector('.game-box');

    /**
     * создаем игровое поле
     * @param elem {object} объект с параметрами одной ячейки
     */
    static createStr(elem) {

        // проходим циклом и создаем игровое поле
        for (let i = 1; i <= this.#xMarks; i++) {
            for (let j = 1; j <= this.#yMarks; j++) {
                let box = new CreateElem(elem).element;
                this.setDataTrr(box, 'x', i);
                this.setDataTrr(box, 'y', j);
                this.setGridPosition(box, box.dataset.x, box.dataset.y);
                this.building(box, this.board);
            }
        }
    }

    /**
     * метод добавляет строку {str} в конец указанного селектора {selector}
     * @param elem {Element}
     * @param selector {Element}
     */
    static building(elem, selector) {
        selector.insertAdjacentElement('beforeend', elem);
    }

    /**
     * метод создает дата атрибут элементу {elem} с именем data-{name} и значением {value}
     * @param elem {Object}
     * @param name {string}
     * @param value {number}
     */
    static setDataTrr(elem, name, value) {
        elem.setAttribute('data-' + name, value);
    }

    /**
     * метод задает элементу {elem} grid позицию column = {x} и row = {y}
     * @param elem {Object}
     * @param x {string}
     * @param y {string}
     */
    static setGridPosition(elem, x, y) {
        elem.style.gridColumn = elem.dataset.x;
        elem.style.gridRow = elem.dataset.y;
    }
}

// создает заданный элемент
class CreateElem {
    constructor(param) {
        this.height = param.height;
        this.width = param.width;
        this.type = param.type;
        this.class = param.class;
        this.element = this.create();
        this.setStyle();
    }

    /**
     * создает указанный элемент
     */
    create() {
        return document.createElement(this.type);
    }

    /**
     * задем стили созданному элементу
     */
    setStyle() {
        this.element.style.height = this.height;
        this.element.style.width = this.width;
        this.element.classList.add(this.class);
    }
}