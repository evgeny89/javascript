'use strict';

// создаем игровое поле
Board.createStr(divElem);

// вычисляем ходы
let steps = new Steps(user);

// логируем действия игроков
let logger = new StepLog();

// выводим корректную информацию о игре в отдельном блоке
let info = new Informer();

// обработка нажатия кнопки мыши
function start (e) {
    logger.setValues(e);
}

// прослушиваем событие клика по игровому полю
Board.board.addEventListener('click', start, false);
