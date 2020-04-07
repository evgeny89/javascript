'use strict';
// Пример №1
for (let i = 0; i <= 10; i++) {
    if (i === 0) {
        console.log(i + ' - это ноль');
    }

    if (i % 2 === 0) {
        console.log(i + ' - четное число');
    } else {
        console.log(i + ' - нечетное число');
    }
}

// Пример №2
const post = {
    author: "John", //вывести этот текст
    postId: 23,
    comments: [
        {
            userId: 10,
            userName: "Alex",
            text: "lorem ipsum",
            rating: {
                likes: 10,
                dislikes: 2 //вывести это число
            }
        },
        {
            userId: 5, //вывести это число
            userName: "Jane",
            text: "lorem ipsum 2", //вывести этот текст
            rating: {
                likes: 3,
                dislikes: 1
            }
        },
    ]
}

console.log(post.author);
console.log(post.comments[0].rating.dislikes);
console.log(post.comments[1].userId);
console.log(post.comments[1].text);

// Пример №3
const products = [
    {
        id: 3,
        price: 200,
    },
    {
        id: 4,
        price: 900,
    },
    {
        id: 1,
        price: 1000,
    },
];

products.forEach(function (product) {
    product.price = product.price - (product.price * 15 / 100);
})

console.log(products);

// Пример №4
const products2 = [
    {
        id: 3,
        price: 127,
        photos: [
            "1.jpg",
            "2.jpg",
        ]
    },
    {
        id: 5,
        price: 499,
        photos: []
    },
    {
        id: 10,
        price: 26,
        photos: [
            "3.jpg"
        ]
    },
    {
        id: 8,
        price: 78,
    },
];

/**
 * функция проверяет, есть ли у объекта свойство 'photos' и если есть, проверяет есть ли у свойства элементы.
 * @param elem {object} товар
 * @returns {boolean}
 */
const getImg = (elem) => {
    let res = ('photos' in elem) ? true : false;
    if (res === true && elem.photos.length > 0) {
        return true;
    } else {
        return false;
    }
};

let arrToImg = products2.filter(getImg);
console.log(arrToImg);

let sortToPrice = products2.sort(function (a, b) {
    return a.price - b.price;
});
console.log(sortToPrice);

// Пример №5
for (let i = 0; i < 10; console.log(i++)) {}

// Пример №6

let str = '';
for (let i = 0; i < 20; i++) {
    str += '*';
    console.log(str);
}
