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
        this.active = [];
        this.carrot = 0;
        this.snakeSize = 1;
        this.change = true;
        this.lastTouch = {X : '1', Y : '0'};
        this.addClassName = document.getElementsByClassName('square');
        this.building();
        this.addCarrot();
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

    set lastTouchX(str) {
        if (this.lastTouch.X !== "0" || this.change === false) {
            return;
        } else {
            this.lastTouch.X = str;
            this.lastTouch.Y = "0";
            this.chenge = false;
        }
    }

    set lastTouchY(str) {
        if (this.lastTouch.Y !== "0" || this.change === false) {
            return;
        } else {
            this.lastTouch.Y = str;
            this.lastTouch.X = "0";
            this.change = false;
        }
    }
    get changeUserX () {
        return this.userX;
    }

    set changeUserX (num) {
        if (num < 1) {
            this.userX = this.width;
        } else if (num > this.width) {
            this.userX = 1;
        } else {
            this.userX = num;
        }
    }

    get changeUserY () {
        return this.userY;
    }

    set changeUserY (num) {
        if (num < 1) {
            this.userY = this.height;
        } else if (num > this.height) {
            this.userY = 1;
        } else {
            this.userY = num;
        }
    }

    //дает специальный класс текущему блоку
    setActive () {
        this.active.unshift(this.userX + (this.userY * this.width - (this.width + 1)));
        this.addClassName[this.active[0]].classList.add('active');
    }

    //удаляет специальный класс у блока
    setDeactivate () {
        if (this.active.length >= this.snakeSize) {
            this.addClassName[this.active[this.active.length - 1]].className = 'square';
            this.active.pop();
        }
    }

    addCarrot () {
        let num = this.generate();
        let carrot = this.addClassName[num];
        carrot.innerHTML = '<i class="fas fa-carrot"></i>';
        this.carrot = num;
    }

    delCarrot () {
        this.addClassName[this.carrot].innerHTML = '';
    }

    checkCarrot () {
        if (this.active[0] === this.carrot) {
            this.snakeSize += 1;
            this.delCarrot();
            this.addCarrot();
        }
    }

    run () {
        this.setDeactivate();
        this.changeUserX += +this.lastTouch.X;
        this.changeUserY += +this.lastTouch.Y;
        this.setActive();
        this.change = true;
        this.checkCarrot();
    }

    generate () {
        let num = Math.round(Math.random() * this.addClassName.length) - 1;
        if (this.active.includes(num)) {
            this.generate();
        } else {
            return num;
        }
    }
}

const newGame = new Builder(field);
let start = setInterval(() => {
    newGame.run();
    let find = newGame.active.slice(1);
    if (find.includes(newGame.active[0])) {
        clearInterval(start);
        let textGame = document.createElement('h4');
        textGame.innerText = 'Game Over, вас счет: ' + (newGame.snakeSize - 1) * 100 + ' очков';
        let box = document.querySelector('.squared-area');
        document.querySelector('.container').insertBefore(textGame, box);
    }
}, 500);



