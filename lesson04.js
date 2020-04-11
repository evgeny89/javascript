'use strict';

//Задание №1
function NumObj() {
    let num = parseInt(prompt("Введите число"));
    if(this.isNumCorrect(num)) {
        this.parseNumber(num);
    }else {
        throw new Error('Is you number invalid');
    }
}

NumObj.numMax = 999;
NumObj.numMin = 0;
NumObj.prototype.isNumCorrect = function (num) {
    return num < NumObj.numMax && num > NumObj.numMin;
};
NumObj.prototype.parseNumber = function (num) {
    this.units = num % 10;
    this.tens = (num - this.units) % 100 / 10;
    this.hundreds = Math.trunc(num / 100);
};

try {
    const numUser = new NumObj();
    console.log(numUser);
} catch (e) {
    console.log(e.message);
}

// Задание №1.1
/**
 * Конструктор объекта товара ES5
 * @param name {string} наименование товара
 * @param price {number} цена товара
 * @constructor
 */
function Product(name, price) {
    this.name = name;
    this.price = price;
}

Product.prototype.make25PercentDiscount = function () {
    this.price = this.price - (this.price / 100 * 25);
};

const product1 = new Product('Поваренная книга', 368);
console.log(product1);

product1.make25PercentDiscount();
console.log(product1);

// Класс объекта товара ES6
class Products {
    /**
     * Конструктор объекта товара ES6
     * @param name {string} наименование товара
     * @param price {number} цена
     */
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    make25PercentDiscount() {
        this.price = this.price - (this.price / 100 * 25);
    }
}

const product2 = new Products('Приключения буратино', 400);
console.log(product2);

product2.make25PercentDiscount();
console.log(product2);

// Задание №1.2
// ES5
function Post(author, text, date) {
    this.author = author;
    this.text = text;
    this.date = date;
}

Post.prototype.edit = function (text) {
    this.text = text;
};

function AttachedPost(author, text, date) {
    Post.call(this, author, text, date);
    this.highlighted = false;
}

AttachedPost.prototype = Object.create(Post.prototype);

AttachedPost.prototype.makeTextHighlighted = function () {
    this.highlighted = true;
};

const post1 = new Post('Alex', 'hello world', '10.04.2020');
console.log(post1);

post1.edit('ПРивет всем');
console.log(post1);

const post2 = new AttachedPost('Mike', 'hi world', '10.04.2020');
console.log(post2);

post2.edit('hi javascript');
console.log(post2);

post2.makeTextHighlighted();
console.log(post2);

//ES6
class PostTwo {
    constructor(author, text, date) {
        this.author = author;
        this.text = text;
        this.date = date;
    }

    editTwo(text) {
        this.text = text;
    }
}

class AttachedPostTwo extends PostTwo {
    highlighted = false;

    editTwo(text) {
        super.editTwo(text);
    }

    makeTextHighlighted() {
        this.highlighted = true;
    }
}

const post3 = new PostTwo('Василий', 'Привет из Таганрога', '10,04,2020');
post3.editTwo('Привет из Москвы');
console.log(post3);

const post4 = new AttachedPostTwo('Евгений', 'Привет всем', '10.04.2020');
post4.editTwo('Привет, привет');
post4.makeTextHighlighted();
console.log(post4);

const post5 = new AttachedPostTwo('Niko', 'How are you?', '10.042020');
console.log(post5);