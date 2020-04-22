'use strict';

// объект с параметрами одной ячейки игры
const divElem = {
    height: '100px',
    width: '100px',
    type: 'div',
    class: 'solo-box',
};

// классы крестиков и ноликов
const classMarker = {
    cross: '<i class="fas fa-times"></i>',
    circle: '<i class="far fa-circle"></i>',
};

// игроки
const user = [
    'user2',
    'user1'
];

// color
let winColor = '#ffabab';
