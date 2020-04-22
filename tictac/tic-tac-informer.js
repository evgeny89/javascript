'use strict';

// пишем инвормацию в блок
class Informer {
    constructor() {
        this.informer = document.querySelector('.game-info').children;
        this.writeUser();

    }

    /**
     * выводим информацию о том, чей сайчас ход
     */
    writeUser(stop = false) {
        if (stop) {
            this.informer[0].textContent = '';
        } else {
            this.informer[0].textContent = steps.checkUser;
        }
    }

    /**
     * блок для вывода уведомлений: ошибки, победитель...
     * @param text {string} строка уведомления
     */
    writeInfo(text) {
        this.informer[1].textContent = text;
    }

    /**
     * если есть победитель - выводим и стилизуем сообщение
     */
    writeWin() {
        this.writeInfo(`Победил ${logger.name} !`);
        this.informer[1].style.color = winColor;
        this.informer[1].style.fontSize = 32 + 'px';
        this.writeUser(true);
    }

    /**
     * если ничья выводим уведомление
     */
    writeDraw() {
        this.writeInfo('НИЧЬЯ');
        this.informer[1].style.color = winColor;
        this.informer[1].style.fontSize = 32 + 'px';
        this.writeUser(true);
    }
}


