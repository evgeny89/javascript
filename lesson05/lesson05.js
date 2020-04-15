'use strict';

// задание №3
let modal = document.querySelector('.modal');
let btnShow = document.querySelector('.show-modal');
let btnHide = modal.querySelector('.modal-btn');

btnShow.addEventListener('click', function () {
    modal.classList.remove('modal-hide');
    modal.classList.add('slide-in-blurred-top');
    modal.style.display = 'block';
});

btnHide.addEventListener('click', function () {
    modal.classList.remove('slide-in-blurred-top');
    modal.classList.add('modal-hide');
});

// задание №4
let btnList = document.querySelectorAll('.product-cell');
btnList.forEach(function (e) {
    e.addEventListener('click', function () {
        let img = e.parentNode.querySelector('img');
        let text = e.parentNode.querySelector('.less4-title');
        console.log(text.style);
        if (text.style.display === 'none' || text.style.display === '') {
            img.style.display = 'none';
            text.style.display = 'block';
            e.textContent = 'скрыть';
        } else {
            text.style.display = 'none';
            img.style.display = 'block';
            e.textContent = 'подробно';
        }
    })
});

// задание №5
class ChessBoard {
    constructor() {
        this.parent = document.querySelector('.chess');
        this.row = ['1', '2', '3', '4', '5', '6', '7', '8'];
        this.column = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        this.setMark(this.row, 'row');
        this.setMark(this.column, 'column');
        this.buildBoard();
    }

    /**
     * делаем маркировку доски, передаем массив с маркерами и направление маркирования
     * @param arr {Array} массив с данными
     * @param direction {string} строка направления маркировки (row/column)
     */
    setMark(arr, direction) {
        for (let i = 0; i <= 8; i++) {
            let elem = document.createElement('div');
            if (i !== 0) elem.textContent = arr[i - 1];
            this.parent.appendChild(elem);
            if (direction === 'row') elem.style.gridRow = i + 1 + '';
            if (direction === 'column') {
                elem.style.gridRow = '1';
                elem.style.gridColumn = i + 1 + '';
            }
            elem.classList.add('chess-mark');
        }
    }

    /**
     * метод создает шахматную доску
     */
    buildBoard() {
        for (let i = 2; i <= 9; i++) {
            for (let j = 2; j <= 9; j++) {
                this.setStyle(i, j);
            }
        }
    }

    /**
     * метод создает ячейку и задает ей аттрибуты и стили
     * @param a {number} позиция по вертикали
     * @param b {number} позиция по горизонтали
     */
    setStyle(a, b) {
        let elem = document.createElement('div');
        elem.style.gridRow = a + '';
        elem.style.gridColumn = b + '';
        elem.setAttribute('data-y', a - 1 + '');
        elem.setAttribute('data-x', b - 1 + '');
        if ((a % 2 === 0 && b % 2 === 0) || (a % 2 !== 0 && b % 2 !== 0)) elem.classList.add('chess-white');
        if ((a % 2 === 0 && b % 2 !== 0) || (a % 2 !== 0 && b % 2 === 0)) elem.classList.add('chess-black');
        this.parent.appendChild(elem);
    }
}

class Figure {
        // шахматные фигуры
        static pawn = {
            name: 'pawn',
            link: '<i class="fas fa-chess-pawn"></i>',
            position: [
                {
                    color: 'white',
                    x: '1',
                    y: '2'
                },
                {
                    color: 'white',
                    x: '2',
                    y: '2'
                },
                {
                    color: 'white',
                    x: '3',
                    y: '2'
                },
                {
                    color: 'white',
                    x: '4',
                    y: '2'
                },
                {
                    color: 'white',
                    x: '5',
                    y: '2'
                },
                {
                    color: 'white',
                    x: '6',
                    y: '2'
                },
                {
                    color: 'white',
                    x: '7',
                    y: '2'
                },
                {
                    color: 'white',
                    x: '8',
                    y: '2'
                },
                {
                    color: 'black',
                    x: '1',
                    y: '7'
                },
                {
                    color: 'black',
                    x: '2',
                    y: '7'
                },
                {
                    color: 'black',
                    x: '3',
                    y: '7'
                },
                {
                    color: 'black',
                    x: '4',
                    y: '7'
                },
                {
                    color: 'black',
                    x: '5',
                    y: '7'
                },
                {
                    color: 'black',
                    x: '6',
                    y: '7'
                },
                {
                    color: 'black',
                    x: '7',
                    y: '7'
                },
                {
                    color: 'black',
                    x: '8',
                    y: '7'
                }
            ]
        }
        static rook = {
            name: 'rook',
            link: '<i class="fas fa-chess-rook"></i>',
            position: [
                {
                    color: 'white',
                    x: '1',
                    y: '1'
                },
                {
                    color: 'white',
                    x: '8',
                    y: '1'
                },
                {
                    color: 'black',
                    x: '1',
                    y: '8'
                },
                {
                    color: 'black',
                    x: '8',
                    y: '8'
                }
            ]
        }
        static knight = {
            name: 'knight',
            link: '<i class="fas fa-chess-knight"></i>',
            position: [
                {
                    color: 'white',
                    x: '2',
                    y: '1'
                },
                {
                    color: 'white',
                    x: '7',
                    y: '1'
                },
                {
                    color: 'black',
                    x: '2',
                    y: '8'
                },
                {
                    color: 'black',
                    x: '7',
                    y: '8'
                }
            ]
        }
        static bishop = {
            name: 'bishop',
            link: '<i class="fas fa-chess-bishop"></i>',
            position: [
                {
                    color: 'white',
                    x: '3',
                    y: '1'
                },
                {
                    color: 'white',
                    x: '6',
                    y: '1'
                },
                {
                    color: 'black',
                    x: '3',
                    y: '8'
                },
                {
                    color: 'black',
                    x: '6',
                    y: '8'
                }
            ]
        }
        static queen = {
            name: 'queen',
            link: '<i class="fas fa-chess-queen"></i>',
            position: [
                {
                    color: 'white',
                    x: '4',
                    y: '1'
                },
                {
                    color: 'black',
                    x: '4',
                    y: '8'
                }
            ]
        }
        static king = {
            name: 'king',
            link: '<i class="fas fa-chess-king"></i>',
            position: [
                {
                    color: 'white',
                    x: '5',
                    y: '1'
                },
                {
                    color: 'black',
                    x: '5',
                    y: '8'
                }
            ]
        }

    /**
     * метод принимает объект шахматных фигур и расставляет их на свои позиции
     * @param obj {Object}
     */
    static lineUp (obj) {
        obj.position.forEach(function (e) {
            let chess = document.querySelector(`[data-y="${e.y}"][data-x="${e.x}"]`);
            chess.style.color = e.color;
            chess.style.fontSize = '28px';
            chess.insertAdjacentHTML('afterbegin', obj.link);
        });
    }
}

// создаем доску
new ChessBoard;
// размещаем фигуры
for (let key in Figure) {
    Figure.lineUp(Figure[key]);
}

