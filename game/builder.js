'use strict';

//задаем размер поля сколько клеток по высоте и сколько в ширину (нужно так же маенять размер сетки grid в стилях)
const field = {
    width: 10,
    height: 10
};

class Builder {
    constructor(obj) {
        this.width = (obj.width > 20 || obj.width < 5) ? 10 : obj.width;
        this.height = (obj.height > 20 || obj.height < 5) ? 10 : obj.height;
        this.userX = 1;
        this.userY = 1;
        this.active = 1;
        this.addClassName = document.getElementsByClassName('square');
    }

    //метод создает 100 блоков, нужен только в начале игры
    building () {
        let box = document.getElementById('squared-area');
        box.style.gridTemplateColumns = 'repeat(' + this.width + ', auto)';

        for(let i = 0; i < this.width * this.height; i++) {
                let squared = document.createElement('div');
                squared.className = 'square';
                box.append(squared);
        }

        this.setActive();
    }

    get changeUserX () {
        return this.userX;
    }

    set changeUserX (num) {
        if (num > 0 && num <= this.width) {
            this.userX = num;
        }
    }

    get changeUserY () {
        return this.userY;
    }

    set changeUserY (num) {
        if (num > 0 && num <= this.height) {
            this.userY = num;
        }
    }

    //дает специальный класс текущему блоку
    setActive() {
        this.active = this.userX + (this.userY * this.width - (this.width + 1));
        this.addClassName[this.active].className = 'square active';
    }

    //удаляет специальный класс у блока
    setDeactivate() {
        this.addClassName[this.active].className = 'square';
    }
}

const newGame = new Builder(field);
// строим игровое поле
newGame.building();


