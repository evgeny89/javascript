'use strict';

// СЛАЙДЕР
// получаем элемент с классом слайдер и задаем размеры из data атрибутов
const slider = document.querySelector('.slider');
let sliderWidth = slider.dataset.width;
let sliderHeight = slider.dataset.height
slider.style.width = sliderWidth + 'px';
slider.style.height = sliderHeight + 'px';

// загружаем картинки
const images = slider.querySelectorAll('.slider-img');
images.forEach((img, key) => {
    img.setAttribute('src', `https://unsplash.it/${sliderWidth}/${sliderHeight}?random${key + 1}`);
    if (key === 0) {
        img.parentElement.classList.add('slider_item-active');
    }
});

// выводим навигацию
const iconsList =
    {
        preloader: 'fa-circle-notch',
        prev: 'fa-angle-double-left',
        next: 'fa-angle-double-right',
    }

const icons = slider.querySelectorAll('.fas');

document.addEventListener('DOMContentLoaded', () => {
    icons.forEach(e => {
        let className = e.dataset.type;
        e.classList.add(iconsList[className]);
    });
});

// Прячем прелоадер когда картинки загружены
window.addEventListener('load', () => {
    document.querySelector('.fa-spin').style.display = 'none';
});

// прикручиваем навигацию
const controls = slider.querySelector('.slider_controls');
let sliding = true;

// закпускаем функцию при нажатии мыши по кнопкам навигации
controls.addEventListener('mousedown', (e) => {
    let btn = e.target.dataset.type;
    if ((btn === 'next' || btn === 'prev') && sliding === true) {
        sliding = false;
        slideImg(btn);
    }
});

// получаем список блоков с картинками
const sliderBlock = slider.querySelectorAll('.slider_item');

/**
 *  ищем активный класс и записываем индекс для навигации, удаляем класс у элемента
 * @param str {string} умя нажатой кнопки навигации
 */
function slideImg(str) {
    let index = null;
    sliderBlock.forEach((item, key) => {
        item.style.animation = '';
        if (item.classList.contains('slider_item-active')) {
            index = key;
            item.classList.remove('slider_item-active');
        }
    });

    if (str === 'prev') {
        slidePrev(index);
    }

    if (str === 'next') {
        slideNext(index);
    }
}

/**
 * перелистываем картинку назад
 * @param index {number} индекс прошлой картинки
 */
function slidePrev(index) {
    sliderBlock[index].style.animation = '2s slide-out-right';
    if (index === 0) {
        index = sliderBlock.length - 1;
    } else {
        index -= 1;
    }
    sliderBlock[index].style.animation = '1s slide-to-right';
    sliderBlock[index].classList.add('slider_item-active');
    setTimeout(setSlidingTrue, 1000);
}

/**
 * перелистываем каритнку вперед
 * @param index {number} индекс прошлой картинки
 */
function slideNext(index) {
    sliderBlock[index].style.animation = '2s slide-out-left';
    if (index === sliderBlock.length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    sliderBlock[index].style.animation = '1s slide-to-left';
    sliderBlock[index].classList.add('slider_item-active');
    setTimeout(setSlidingTrue, 1000);
}

function setSlidingTrue() {
    sliding = true;
}

//КОРЗИНА

// получаем блок продукта
let products = document.querySelector('.products');

// массив со объектами товаров
let product = [
    {
        id: 1,
        name: 'товар 1',
        img: '5',
        price: '360'
    },
    {
        id: 2,
        name: 'товар 2',
        img: '6',
        price: '540'
    },
    {
        id: 3,
        name: 'товар 3',
        img: '7',
        price: '250'
    },
    {
        id: 4,
        name: 'товар 4',
        img: '8',
        price: '400'
    },
    {
        id: 5,
        name: 'товар 5',
        img: '9',
        price: '725'
    }
];

// строка для вставки
let insertArr = [];

// перебираем массив товаров и создаем блок товаров
product.forEach(item => {

    let productBlock =
        `<div class="product">
            <div class="add-to-cart">
                <a href="#" class="add-cart" data-id="${item.id}">Добавить в корзину</a>
            </div>
            <h5 class="product-name">${item.name}</h5>
            <img src="https://unsplash.it/240/320?random${item.img}" alt="продукт" class="product-photo">
            <h6 class="product-price">${item.price}$</h6>
        </div>`;

    insertArr.push(productBlock);
});

products.insertAdjacentHTML('beforeEnd', insertArr.join(''));

// объект хранения товаров в корзине
let itemCart = {};

// по клику добавляем товар в объект itemCart
products.addEventListener('click', function (e) {
    e.preventDefault();
    let id = e.target.dataset.id;
    if (id !== undefined) {
        (itemCart.hasOwnProperty(id)) ? itemCart[id]++ : itemCart[id] = 1;
        setCounter();
        blockForCart.innerHTML = '';
        setBox(itemCart);
    }
});

// получаем элемент корзины
let counter = document.querySelector('.cart-icon');

// считаем количество товара в корзине
function setCounter() {
    counter.dataset.count = Object.values(itemCart).reduce((a, b) => {
        return a + b;
    })
}

// блок в который будем заносить разметку корзины
let blockForCart = document.querySelector('.item-list');

// перебираем все добавленные товары и создаем разметку
function setBox(obj) {

    // храним блоки товаров в массиве
    let itemList = [];

    let totalSum = 0;

    for (let key in obj) {

        if (itemCart[+key] < 1) {
            delete  itemCart[+key];
            continue;
        }

        let item = product.find(item => item.id === +key);

        let sum = +item.price * itemCart[+key];

        totalSum += sum;

        let itemBox = `<div class="item-box">
                   <img src="https://unsplash.it/240/320?random${item.img}" alt="photo" class="img-cart">
                   <div class="item-info">
                       <h5 class="product-name">${item.name}</h5>
                       <h6 class="product-price">${item.price}$</h6>
                       <p>количество:</p>
                       <input type="number" value="${itemCart[+key]}">
                       <div class="total-footer">
                           <p class="total">${sum}$</p>
                           <i class="far fa-trash-alt" data-del="${key + ''}"></i>
                       </div>
                   </div>
                </div>`;

        itemList.push(itemBox);
    }

    blockForCart.insertAdjacentHTML('beforeEnd', itemList.join(''));
    document.getElementById('totalSum').innerText = totalSum + '';
}

// по клику на корзину открываем и закрываем ее
counter.addEventListener('click', () => {
    if (blockForCart.parentNode.style.visibility === 'hidden') {
        blockForCart.innerHTML = '';
        setBox(itemCart);
        blockForCart.parentNode.style.visibility = 'inherit';
    } else {
        blockForCart.parentNode.style.visibility = 'hidden';
    }
});

// получаем кнопку очистки и вешаем событие
let clearBox = document.querySelector('.btn-clear');

clearBox.addEventListener('click', function () {
    blockForCart.innerHTML = '';
    document.getElementById('totalSum').innerText = '0';
    counter.dataset.count = '0';
});

// изменение инпута
blockForCart.addEventListener('change', function (e) {
    let getIdItem = e.target.nextElementSibling.children[1].dataset.del;
    let currentValue = e.target.value;
    itemCart[getIdItem] = currentValue;
    blockForCart.innerHTML = '';
    setBox(itemCart);
});

// удаление элемента по клику на иконку...
blockForCart.addEventListener('click', function (e) {
    if (e.target.dataset.del !== undefined) {
        let currentValue = +e.target.dataset.del;
        itemCart[currentValue] -= 1;
        blockForCart.innerHTML = '';
        setBox(itemCart);
    }
});