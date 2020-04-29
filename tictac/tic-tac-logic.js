'use strict';

//считаем шаги и вычисляем активного юзера
class Steps {
    constructor(user) {
        this.step = 1;
        this.user = user;
    }

    /**
     * увеличиваем количество ходов
     */
    stepIncrement() {
        this.step++;
    }

    /**
     * вычисляем чей сейчас ход
     * @returns {string}
     */
    get checkUser() {
        return (this.step % 2 === 0) ? this.user[0] : this.user[1];
    }
}

// ведем лог шагов
class StepLog {
    constructor() {
        this.dataX = 0;
        this.dataY = 0;
        this.name = '';
        this.log = [];
    }

    /**
     * добавляем объект с текущими данными в массив
     */
    saveSteps() {
        this.log.push({
            name: this.name,
            x: this.dataX,
            y: this.dataY,
        });
    }

    /**
     * логика на основе функции checkDupleStep() либо заносим изменения, либо сообщение об ошибке
     * @param elem {Object} таргет клика
     */
    setValues(elem) {
        if (this.checkDupleStep(elem)) {

            // заносим данные в лог
            this.dataX = elem.target.dataset.x;
            this.dataY = elem.target.dataset.y;
            this.name = steps.checkUser;
            this.saveSteps();

            // добавляем маркер
            Marker.setMarker(this.dataX, this.dataY);

            // проверям был ли ход победным
            if (Winner.checkWin() === 1) {
                info.writeWin();
                return;
            }

            // если ничья
            if (Winner.checkWin() === 2) {
                info.writeDraw();
                return;
            }

            // увеличиваем количество ходов
            steps.stepIncrement();

            // изменяем информацию инфоблока
            info.writeUser();
            info.writeInfo('');
        } else {
            info.writeInfo('эта ячека уже отмечена');
        }
    }

    /**
     * проверяем, можно ли поставить отметку в этой ячейке
     * @param elem {Object} - элемент по которому был клик
     * @returns {boolean} - если индекс не найден в логе, значит ячейка свободна для отметки
     */
    checkDupleStep(elem) {
        let sortArr = this.log.findIndex(e => elem.target.dataset.x === e.x && elem.target.dataset.y === e.y);
        return (sortArr === -1);
    }
}

// работаем с макрером, вычисляем текущий и делаем запись.
class Marker {
    /**
     * возвращает нужный маркер на ход юзера
     * @returns {string} готовая строка иконки с fontawesome
     */
    static checkMarker() {
        return steps.checkUser === user[1] ? classMarker.cross : classMarker.circle;
    }

    /**
     * селектору с координатами x:y добавляем соответствующую иконку
     * @param x {string}
     * @param y {string}
     */
    static setMarker(x, y) {
        let elem = Board.board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        elem.insertAdjacentHTML('beforeend', this.checkMarker());
        elem.children[0].setAttribute('data-x', x);
        elem.children[0].setAttribute('data-y', y);
    }
}

// проверяем победителя
class Winner {
    static result = [];

    /**
     * проверяем победную комбинацию если есть - прекращаем игру...
     * если есть в результирующем массиве 3 элемента - значит какая-то строка или столбец выиграл
     */
    static checkWin() {

        // ищем строки
        this.checkLine(logger.name, 'x', logger.dataX);

        // ищем столбцы
        this.checkLine(logger.name, 'y', logger.dataY);

        // проверяем диагональ
        this.checkCross(logger.name);

        // и еще диагональ
        this.checkOver(logger.name);

        // выводим победу
        if (this.result.length === 3) {
            this.setWinColor();
            Board.board.removeEventListener('click', start, false);
            return 1;
        }

        // если все поля отмечены но нет победителя
        if (logger.log.length === 9) {
            Board.board.removeEventListener('click', start, false);
            return 2;
        }
    }

    /**
     * если есть победитель - подсветим цветом
     */
    static setWinColor() {
        this.result.forEach(elem => {
            Board.board.querySelector(`[data-x="${elem.x}"][data-y="${elem.y}"]`).style.backgroundColor = winColor;
        })
    }

    /**
     * ищем строки заполненные либо X либо О и пишем в this.result
     * @param user {string} текущий игрок
     * @param coordinate {string} координата либо x либо y
     * @param numStr {string} число в строковом виде, значение координаты
     */
    static checkLine(user, coordinate, numStr) {
        if (logger.log.length > 4 && this.result.length < 3) {
            this.result = logger.log.filter(elem => {
                if (elem.name === user && elem[coordinate] === numStr) {
                    return elem;
                }
            });
        }
    }

    /**
     * проверяем одну диагоняль
     * @param user {string} имя игрока
     */
    static checkCross(user) {
        if (logger.log.length > 4 && this.result.length < 3) {
            this.result = logger.log.filter(elem => {
                if (elem.name === user && elem.x === elem.y) {
                    return elem;
                }
            });
        }
    }

    /**
     * проверяем другую диагональ
     * @param user {string} имя игрока
     */
    static checkOver(user) {
        if (logger.log.length > 4 && this.result.length < 3) {
            this.result = logger.log.filter(elem => {
                if (elem.name === user && ((elem.x === '1' && elem.y === '3') || (elem.x === '2' && elem.y === '2') || (elem.x === '3' && elem.y === '1'))) {
                    return elem;
                }
            });
        }
    }
}